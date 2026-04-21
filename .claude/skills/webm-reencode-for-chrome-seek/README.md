# webm-reencode-for-chrome-seek

Used for when iOS videos are not playing in video section due to encoding issue and our trick to get the first frame to display.

Fixes webm videos that fail in Chrome with `PIPELINE_ERROR_DECODE` when the
`<source>` URL has a `#t=` fragment. Root cause: VP9 can only start decoding
at a keyframe, and some captured files have their first keyframe after t=0.

## Symptoms

- `video.error.code === 3`, message `PipelineStatus::PIPELINE_ERROR_DECODE`
- File plays in Safari, fails in Chrome
- File plays in Chrome without a URL fragment, fails with `#t=0.1`

## Fix (summary)

Re-encode with a forced keyframe at t=0 using 2-pass VBR + VP9 alt-ref frames,
which preserves the `#t=0.1` Safari poster trick and keeps file sizes in line
with the originals.

## Files

- `SKILL.md` — full workflow: discovery, encode recipe, batch runner, ffprobe
  check, Playwright Chrome decode test, rollback, troubleshooting.

## When to invoke

Any time a new webm is added to `public/content/assets/media/video/web/` and
shows the symptoms above, or as a preventative pass on newly-captured iOS
VoiceOver content. See `SKILL.md` for the runbook.
