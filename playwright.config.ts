import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from '@playwright/test';

// Read from default .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });



export default defineConfig({
  testDir: './tests',
  use: {
    headless: false,
    launchOptions: {
      slowMo: 1000,
    },
  },
});
