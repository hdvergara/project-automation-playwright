import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './src/tests',
  workers: 2,
  timeout: 50000,
  reporter: [['allure-playwright', {
    outputFolder: 'allure-results', environmentInfo: {
      'Browser': 'Chrome',
      'Environment': process.env.TEST_ENV || 'local',
    },
  }]],
  fullyParallel: true,
  use: {
    browserName: 'chromium',
    locale: 'es-ES',
    launchOptions: {
      args: ['--start-maximized', '--lang=es-ES'],
    },
    contextOptions: {
      viewport: null,
    },
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    headless: true,
  },
});