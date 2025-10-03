#!/bin/bash
# Build script for Render deployment

echo "Starting frontend build process..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application using npx to avoid permission issues
echo "Building the application..."
npx vite build

echo "Build completed successfully!"