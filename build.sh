#!/bin/bash
set -e

echo "Building DearFuture application..."

# Build client
echo "==> Building client..."
cd client
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps --no-optional
npm run build

# Install server dependencies
echo "==> Installing server dependencies..."
cd ../server
npm install --legacy-peer-deps

echo "==> Build completed successfully!"
