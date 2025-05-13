#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Install dev dependencies
echo "Installing dev dependencies..."
npm install -D @types/node @types/react @types/react-dom @types/jest @testing-library/jest-dom @testing-library/react jest jest-environment-jsdom typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-next eslint-config-prettier eslint-plugin-prettier prettier prettier-plugin-tailwindcss postcss postcss-preset-env autoprefixer tailwindcss tailwindcss-animate

# Install additional dependencies
echo "Installing additional dependencies..."
npm install @upstash/redis @vercel/analytics posthog-js nodemailer @react-email/render

# Create necessary directories
echo "Creating directories..."
mkdir -p src/{app,components,lib,hooks,types,styles}
mkdir -p src/app/{api,auth,dashboard,settings}
mkdir -p src/components/{ui,layout,forms}
mkdir -p src/lib/{utils,supabase,stripe}
mkdir -p src/types/{supabase,api}
mkdir -p public/{images,icons}

# Copy environment variables
echo "Setting up environment variables..."
cp .env.example .env.local

# Initialize git repository
echo "Initializing git repository..."
git init
git add .
git commit -m "Initial commit"

echo "Setup complete! Please update your .env.local file with your credentials." 