import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://api.deezer.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },
  reporter: [['html'], ['list']],
});