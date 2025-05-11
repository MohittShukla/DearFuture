#!/bin/bash

# Install dependencies and build client
echo "Building client..."
cd client
npm install
npm run build

# Install server dependencies
echo "Setting up server..."
cd ../server
npm install

# Create production env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please update the .env file with your production credentials"
fi

echo "Build complete! Before deploying:"
echo "1. Update server/.env with your production credentials"
echo "2. Set up a MongoDB Atlas database"
echo "3. Configure your email service credentials"
echo "4. Deploy to your hosting provider"