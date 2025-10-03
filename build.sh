#!/bin/bash
# Build script for Render deployment

echo "Starting frontend build process..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the application
echo "Building the application..."
npx vite build

echo "Build completed successfully!"