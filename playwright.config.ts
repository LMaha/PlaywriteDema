import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from '@playwright/test';

// Read from default .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  use: {
    // 1. Link the Base URL from your .env file
    baseURL: process.env.BASE_URL || 'https://example.com',
    
    // 2. Read headless status from .env, fallback to false if not set
    headless: process.env.HEADLESS === 'true' ? true : false,
    
    launchOptions: {
      slowMo: 1000,
    },
  },
});
