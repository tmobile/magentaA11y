---
name: webm-reencode-for-chrome-seek
description: Re-encode webm videos so Chrome can decode them when the <source> uses a URL fragment like #t=0.1. Fixes PIPELINE_ERROR_DECODE failures caused by VP9 files whose first keyframe is after the seek offset. Triggers on requests like "video won't play in Chrome", "PIPELINE_ERROR_DECODE", "fix iOS VoiceOver webm", "re-encode webm with keyframe at start", or "video works in Safari but not Chrome". Works on any webm, not just the iOS videos that originally surfaced the bug.
---

# webm-reencode-for-chrome-seek

A reusable utility for fixing webm videos that fail to decode in Chrome when a URL fragment (e.g. `#t=0.1`) triggers a seek-on-load before the first keyframe.

## When to use

Apply this skill when **all** of the following are true for a file:

- A `<video>` element fails to play in Chrome/Chromium.
- `video.error.code === 3` with message `PipelineStatus::PIPELINE_ERROR_DECODE: video decode error!`.
- The same file plays fine in Safari.
- The same file plays in Chrome with no URL fragment, but fails with `#t=0.1` (or any `#t=...`).

Root cause: VP9 can only begin decoding at a keyframe. If the file's first keyframe is not at t=0, a seek to 0.1s before playback lands mid-GOP and Chrome's pipeline errors out. Safari's decoder is more forgiving.

The magentaA11y repo appends `#t=0.1` in `src/components/content-display/markdown-content/elements/markdown-source/markdown-source.tsx` so Safari preloads the first frame as a pseudo-poster. This skill preserves that behavior and fixes the video files instead.

**Not iOS-specific.** The bug surfaced on iOS VoiceOver videos because of how they were originally captured, but the fix applies to any webm with a late first keyframe. Run this skill on any new webm that shows the decode symptoms above.

## Prerequisites

- `ffmpeg` and `ffprobe` on `PATH`. `brew install ffmpeg` on macOS.
- Clean working tree on the target branch so originals are recoverable via `git checkout --`.
- For Chrome verification: a local server serving the files (e.g. `npm start` for magentaA11y) and Playwright MCP.

## Workflow

### 1. Discover candidate files

Two ways to pick targets:

**(a) Discovery by failure** — run the Playwright decode test in Step 4 against the whole `public/content/assets/media/video/web/**/*.webm` tree and re-encode only files that fail. Slowest but surgical.

**(b) Discovery by pattern** — re-encode any webm that matches a naming pattern known to be affected. For the magentaA11y repo, iOS VoiceOver files have been the common culprit due to the source capture pipeline:

```bash
# Find every iOS VoiceOver webm under the web content tree
find /Users/JWatkin70/Sites/magentaA11y/public/content/assets/media/video/web \
  -type f -name "*.webm" \
  \( -iname "*voiceover*" -o -iname "*ios*" \) \
  | sort
```

Naming is inconsistent — the `-iname` match above covers `*Voiceover*`, `*VoiceOver*`, `*iOSVoiceover*`, `*IosVoiceOver*`, `*iOS*`, `*ios*`, etc. Drop the iOS filter to scan all webms.

Write the resulting paths to a file for the batch runner below:

```bash
find /Users/JWatkin70/Sites/magentaA11y/public/content/assets/media/video/web \
  -type f -name "*.webm" \
  \( -iname "*voiceover*" -o -iname "*ios*" \) \
  | sort > /tmp/webm-targets.txt
```

### 2. Re-encode recipe

Use **2-pass VBR with alt-ref frames**. Single-pass libvpx-vp9 (with `-crf` or `-maxrate`) produces massive size bloat on high-fps screen-capture content in ffmpeg 8.x. 2-pass with alt-ref frames is the only mode that both enforces the bitrate target *and* lands a clean keyframe at t=0.

Save this as `/tmp/reencode-one.sh`:

```bash
#!/usr/bin/env bash
# Re-encode a single webm in place with a guaranteed keyframe at t=0.
# Usage: bash reencode-one.sh /absolute/path/to/video.webm
set -u
IN="$1"
[[ -f "$IN" ]] || { echo "MISSING: $IN"; exit 2; }

base=$(basename "$IN")
TMP="${IN}.reencode.webm"
PASSLOG="/tmp/vp9pass-$(echo "$IN" | shasum | cut -c1-8)"
rm -f "${PASSLOG}"-*.log 2>/dev/null || true

before=$(stat -f%z "$IN")
# Probe source total bitrate; reserve 80 kbps for audio; floor video at 250 kbps.
orig_br=$(ffprobe -v error -show_entries format=bit_rate -of default=nw=1:nk=1 "$IN")
[[ -z "$orig_br" || "$orig_br" == "N/A" ]] && orig_br=900000
vid_br=$(( orig_br - 80000 ))
(( vid_br < 250000 )) && vid_br=250000

echo "START $base  before=${before}B  target_v=${vid_br}bps"

# Pass 1 (fast — just measurement)
ffmpeg -y -hide_banner -loglevel error -i "$IN" \
  -map 0:v:0 -map '0:a?' \
  -c:v libvpx-vp9 -b:v "${vid_br}" \
  -quality good -speed 2 \
  -lag-in-frames 25 -auto-alt-ref 1 -arnr-maxframes 7 -arnr-strength 4 \
  -force_key_frames 'expr:gte(t,0)' -g 240 \
  -pix_fmt yuv420p \
  -pass 1 -passlogfile "$PASSLOG" -an -f null /dev/null || {
    echo "FAIL_PASS1 $base"; rm -f "${PASSLOG}"-*.log; exit 3;
  }

# Pass 2 (slow — the real encode)
ffmpeg -y -hide_banner -loglevel error -i "$IN" \
  -map 0:v:0 -map '0:a?' \
  -c:v libvpx-vp9 -b:v "${vid_br}" \
  -quality good -speed 2 \
  -lag-in-frames 25 -auto-alt-ref 1 -arnr-maxframes 7 -arnr-strength 4 \
  -force_key_frames 'expr:gte(t,0)' -g 240 \
  -pix_fmt yuv420p \
  -c:a libopus -b:a 64k \
  -pass 2 -passlogfile "$PASSLOG" "$TMP" || {
    echo "FAIL_PASS2 $base"; rm -f "$TMP" "${PASSLOG}"-*.log; exit 4;
  }

rm -f "${PASSLOG}"-*.log 2>/dev/null || true
mv -f "$TMP" "$IN"
after=$(stat -f%z "$IN")
ratio=$(awk -v a="$after" -v b="$before" 'BEGIN{printf "%.2fx", a/b}')
echo "DONE  $base  before=${before}B  after=${after}B  ratio=${ratio}"
```

Flag rationale:

| Flag | Why |
|---|---|
| 2-pass VBR | Only mode where libvpx-vp9 actually hits the `-b:v` target. Single-pass overshoots 5–20× on high-fps content. |
| `-b:v <source_bitrate - 80k>` | Matches source size. 80k reserved for the Opus audio track. |
| `-lag-in-frames 25 -auto-alt-ref 1 -arnr-maxframes 7 -arnr-strength 4` | Enables VP9's alt-ref / lookahead compression. **This is what makes 2-pass actually hit the target** — without these it still overshoots. |
| `-quality good -speed 2` | Balanced quality / speed. `-speed 4` is faster with slightly lower quality if you're impatient. |
| `-force_key_frames 'expr:gte(t,0)'` | **The fix.** Forces a keyframe at t=0 so Chrome can seek to 0.1s without landing mid-GOP. |
| `-g 240` | Max GOP 240 frames (8s @30fps, 4s @60fps). Longer GOP → smaller files. |
| `-pix_fmt yuv420p` | Broadest decoder compatibility. |
| `-c:a libopus -b:a 64k` | 64k Opus is transparent for screen-reader narration and leaves budget for video. |
| `-map 0:v:0 -map '0:a?'` | Explicit stream selection, tolerates files with no audio. Quote `0:a?` in zsh. |

Originals are recoverable via `git checkout -- <path>` if anything goes wrong.

### 3. Batch runner

Run the files from Step 1 one at a time. **Sequential, not parallel** — each encode already uses multiple threads internally, and macOS ships bash 3.2 which doesn't support the `wait -n` idiom needed for a proper job queue. Parallelism on a laptop risks pegging CPU and thermal throttling; on a workstation with many cores, replace this loop with GNU `parallel` or `xargs -P`.

Save this as `/tmp/reencode-batch.sh`:

```bash
#!/usr/bin/env bash
set -u
# Usage: bash reencode-batch.sh /tmp/webm-targets.txt
LIST="$1"
mapfile -t FILES < "$LIST" 2>/dev/null || readarray -t FILES < "$LIST" 2>/dev/null || {
  # bash 3.2 fallback
  FILES=()
  while IFS= read -r line; do FILES+=("$line"); done < "$LIST"
}

total=${#FILES[@]}
i=0
for f in "${FILES[@]}"; do
  i=$((i+1))
  bash /tmp/reencode-one.sh "$f"
  echo "PROGRESS $i/$total"
done
echo "ALL_DONE"
```

Run it:
```bash
nohup bash /tmp/reencode-batch.sh /tmp/webm-targets.txt > /tmp/reencode.log 2>&1 &
disown
# watch progress:
tail -f /tmp/reencode.log | grep -E "^(START|DONE|FAIL|PROGRESS|ALL_DONE)"
```

Expect ~2–6 min per file depending on source length.

### 4. Verify keyframe at t=0 (offline)

```bash
while IFS= read -r f; do
  line=$(ffprobe -v error -select_streams v:0 \
    -show_entries frame=pict_type,pts_time \
    -read_intervals "%+#1" -of csv=p=0 "$f" | head -1)
  # ffprobe emits fields as pts_time,pict_type regardless of -show_entries order
  pts=${line%,*}; pic=${line##*,}
  if [[ "$pic" == "I" ]] && awk -v t="$pts" 'BEGIN{exit !(t+0<=0.05)}'; then
    printf "PASS  %s  (first=%s,%s)\n" "$(basename "$f")" "$pic" "$pts"
  else
    printf "FAIL  %s  (first=%s,%s)\n" "$(basename "$f")" "$pic" "$pts"
  fi
done < /tmp/webm-targets.txt
```

Every file must print `PASS`. First frame must be `pict_type=I` with `pts_time ≤ 0.05`.

### 5. Verify Chrome decode (end-to-end)

Start the dev server:
```bash
BROWSER=none PORT=3000 nohup npm start > /tmp/magenta-dev.log 2>&1 & disown
# wait for curl -s http://localhost:3000/ to return 200
```

Then drive a Playwright decode test through the MCP. Build the `files` list from `/tmp/webm-targets.txt` (strip the `public/` prefix so it becomes a URL path) and run:

```javascript
async function testFile(path) {
  const v = document.createElement('video');
  v.preload = 'metadata';
  v.muted = true;
  const s = document.createElement('source');
  s.src = `http://localhost:3000${path}#t=0.1`;
  s.type = 'video/webm';
  v.appendChild(s);
  document.body.appendChild(v);
  const result = await new Promise((resolve) => {
    const t = setTimeout(() => resolve({ outcome: 'timeout', error: v.error }), 10000);
    v.addEventListener('canplaythrough', () => { clearTimeout(t); resolve({ outcome: 'canplaythrough' }); }, { once: true });
    v.addEventListener('error', () => { clearTimeout(t); resolve({ outcome: 'error', error: v.error ? { code: v.error.code, message: v.error.message } : null }); }, { once: true });
    v.load(); v.play().catch(() => {});
  });
  v.remove();
  return { path, ...result };
}

const results = [];
for (const p of files) results.push(await testFile(p));
return results;
```

**Important:** Chrome caches decode failures per-resource for the tab's lifetime. If you re-run the test in the same tab after a failure, you'll see a phantom failure even on a now-fixed file. Open a fresh Playwright tab (`browser_navigate`) before each batch.

All targets must reach `outcome: 'canplaythrough'`.

Also navigate to a real page that consumes one of the files (for magentaA11y: `http://localhost:3000/#/web-criteria/component/button?tab=3`) and confirm `video.error === null` and `video.readyState === 4` on the iOS video — this verifies the actual production markup path works, not just a synthetic element.

### 6. Commit

```
fix: re-encode webm(s) with keyframe at t=0 for Chrome seek

Chrome's VP9 pipeline errors with PIPELINE_ERROR_DECODE when the <source>
URL has a #t= fragment and the file's first keyframe is after the seek
offset. Re-encoded N file(s) under <path> with a forced keyframe at t=0.
```

## Rollback

- Per-file: `git checkout -- <path>`
- Entire batch: `git checkout -- public/content/assets/media/video/web/`

## Troubleshooting

**Still getting `PIPELINE_ERROR_DECODE` after re-encode:**
- Run the Step 4 ffprobe check. If `pict_type != I` on the first frame, the encode didn't honor `-force_key_frames` — tighten with `-g 60` for a shorter GOP.
- Chrome may have cached the prior failure. Close the *entire tab* (not just refresh) and retry. Playwright: call `browser_close` then `browser_navigate`.

**Output file is much larger than source:**
- Single-pass mode overshoots dramatically — make sure you're running **both** Pass 1 and Pass 2.
- Check the `-lag-in-frames 25 -auto-alt-ref 1 -arnr-maxframes 7 -arnr-strength 4` flags are present. Without them 2-pass still overshoots.
- If size still grows, lower `-b:v` by 20–30% or bump to `-speed 4` and accept slightly lower quality.

**Encode is slow:**
- `-speed 4` (or `-cpu-used 4`) trades quality for speed. For screen-capture content the quality loss is usually imperceptible.

**macOS bash lacks `wait -n`:**
- Default macOS bash is 3.2. Either run encodes serially (recommended — each already uses multiple threads) or install bash 5 via `brew install bash` and use it with `/opt/homebrew/bin/bash`.

## Related files in this repo

- `src/components/content-display/markdown-content/elements/markdown-source/markdown-source.tsx` — where the `#t=0.1` append is applied.
- `src/components/content-display/markdown-content/elements/markdown-video/markdown-video.tsx` — where `preload="metadata"` is set.
- `README.md` — short summary of when to use this skill.

## Historical note

This skill was created after PR #399 (April 2026) added the `#t=0.1` Safari poster trick. The initial rollout re-encoded the 12 iOS VoiceOver webms under `public/content/assets/media/video/web/`, which was the full set of affected files at that time. Use the discovery step in Section 1 when running again — new files may have been added, and the original 12 may have been replaced.
