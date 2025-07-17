#!/bin/bash

# 715 Framework Build Script
echo "🏗️  Building 715 Framework..."

# Minify the main file
echo "📦 Minifying 715.js..."
uglifyjs 715.js -o 715.min.js -c -m

# Show file sizes
echo "📊 File sizes:"
echo "Original: $(ls -lh 715.js | awk '{print $5}')"
echo "Minified: $(ls -lh 715.min.js | awk '{print $5}')"
echo "Gzipped:  $(gzip -c 715.min.js | wc -c | awk '{print $1}') bytes"

echo "✅ Build complete!"
