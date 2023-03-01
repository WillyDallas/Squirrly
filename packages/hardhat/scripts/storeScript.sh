#!/bin/zsh

# Set the directory containing the files
directory="../assets"

# Loop over every file in the directory
for file in "$directory"/*; do
  # Check if the file is a regular file
  if [[ -f "$file" ]]; then
    filename=$(basename "$file")
    # Output the filename to the console
    echo "$filename"
    # Call the Node.js function with the file as an argument
    node store-assets.mjs "$file" "$filename"
  fi
done