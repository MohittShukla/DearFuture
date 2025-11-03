#!/bin/bash
set -e

echo "Building DearFuture application..."

# Set environment variable to disable Rollup native bindings
export ROLLUP_NATIVE=false

# Build client
echo "==> Building client..."
cd client
rm -rf node_modules package-lock.json
npm install
npm run build

# Install server dependencies
echo "==> Installing server dependencies..."
cd ../server
npm install --legacy-peer-deps

echo "==> Build completed successfully!"
