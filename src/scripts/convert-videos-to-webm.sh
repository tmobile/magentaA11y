#!/bin/bash

# Define the root directory of the project
DIRECTORY=$(pwd)

echo "Listing all video files in $DIRECTORY, excluding node_modules..."
echo "----------------------------------------------------"

# Initialize an array to store the video file paths
video_files=()

# Find all video files and exclude node_modules
while IFS= read -r file; do
    video_files+=("$file")
done < <(find "$DIRECTORY" \
    ! -path "*/node_modules/*" \
    -type f \( \
        -iname "*.mp4" -o -iname "*.mkv" -o -iname "*.mov" -o -iname "*.avi" -o \
        -iname "*.flv" -o -iname "*.wmv" -o -iname "*.webm" \
    \))

# Check if all files are already WebM
all_webm=true
for file in "${video_files[@]}"; do
    if [[ "${file##*.}" != "webm" ]]; then
        all_webm=false
        break
    fi
done

if $all_webm; then
    echo "All videos are already in WebM format. No further action needed."
    exit 0
fi

# Process each video file
echo "Processing video files..."
for file in "${video_files[@]}"; do
    # Get the base name of the video file
    base=$(basename "$file")
    original_size=$(du -h "$file" | awk '{print $1}')
    
    # Define the WebM file path
    dir=$(dirname "$file")
    name="${base%.*}"
    webm_file="$dir/$name.webm"
    
    # Check if the WebM file already exists
    if [[ -f "$webm_file" ]]; then
        echo "$base: Already converted to WebM. Skipping..."
        continue
    fi
    
    # Convert the video to WebM
    echo "Converting $base to WebM format..."
    ffmpeg -i "$file" -c:v libvpx-vp9 -b:v 1M -c:a libopus "$webm_file" -y &> /tmp/ffmpeg_error.log
    
    # Check if conversion succeeded
    if [[ -f "$webm_file" ]]; then
        webm_size=$(du -h "$webm_file" | awk '{print $1}')
        echo "$base: Original Size = $original_size, WebM Size = $webm_size"
    else
        echo "$base: Failed to convert to WebM."
        echo "Error details:"
        cat /tmp/ffmpeg_error.log
    fi
done

echo "----------------------------------------------------"
echo "Replacing references to original video files with .webm and updating type attributes..."
echo "----------------------------------------------------"

# Traverse the project to replace references to original video formats with .webm and update type attributes
find "$DIRECTORY" \
    ! -path "*/node_modules/*" \
    -type f \( -iname "*.html" -o -iname "*.js" -o -iname "*.ts" -o -iname "*.tsx" -o -iname "*.css" -o -iname "*.scss" -o -iname "*.json" -o -iname "*.md" \) | while read -r file; do
    for video_file in "${video_files[@]}"; do
        # Get the original file name and WebM name
        base=$(basename "$video_file")
        name="${base%.*}"
        original_ext="${base##*.}"
        webm_name="$name.webm"

        # Replace occurrences of the file name
        if grep -q "$base" "$file"; then
            echo "Updating references in $(basename "$file")..."
            sed -i.bak "s/$base/$webm_name/g" "$file"
        fi

        # Replace occurrences of `type="video/mp4"` with `type="video/webm"`
        if grep -q 'type="video/mp4"' "$file"; then
            echo "Updating type attribute in $(basename "$file")..."
            sed -i.bak 's/type="video\/mp4"/type="video\/webm"/g' "$file"
        fi
    done
done

echo "----------------------------------------------------"
echo "All references updated to .webm format and type attributes adjusted."
echo "----------------------------------------------------"
echo "Deleting original video files that have been converted to WebM..."
echo "----------------------------------------------------"

# Delete original video files if a corresponding .webm file exists
for file in "${video_files[@]}"; do
    # Get the directory and base name of the video file
    dir=$(dirname "$file")
    base=$(basename "$file")
    name="${base%.*}"
    webm_file="$dir/$name.webm"

    # If the .webm file exists, delete the original
    if [[ -f "$webm_file" && "$file" != "$webm_file" ]]; then
        echo "Deleting $file..."
        rm "$file"
    fi
done

echo "----------------------------------------------------"
echo "Original video files deleted where WebM versions exist."
