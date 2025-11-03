#!/bin/bash
set -e

echo "Building DearFuture application..."

# Build client
echo "==> Building client..."
cd client

# Aggressively remove any cached installations
echo "Cleaning all caches..."
rm -rf node_modules package-lock.json
npm cache clean --force

# Fresh install without optional dependencies
echo "Installing dependencies..."
npm install --no-optional --legacy-peer-deps

# Build the app
echo "Building..."
npm run build

# Install server dependencies
echo "==> Installing server dependencies..."
cd ../server
npm install --legacy-peer-deps

echo "==> Build completed successfully!"
