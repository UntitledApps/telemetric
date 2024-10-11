#!/bin/bash

# Build the Next.js application
echo "Building the Next.js application..."
npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Build completed successfully."
else
    echo "Build failed. Exiting."
    exit 1
fi

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

# Check if the deployment was successful
if [ $? -eq 0 ]; then
    echo "Deployment completed successfully."
else
    echo "Deployment failed. Please check your Vercel configuration and try again."
    exit 1
fi

echo "Build and deployment process completed."
