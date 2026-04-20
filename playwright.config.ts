import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [['html'], ['list']],

  projects: [
    // Setup de auth — corre primero
    {
      name: 'setup',
      testMatch: '**/setup/*.setup.ts',
    },
    // Tests de API — apuntan a Deezer
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: 'https://api.deezer.com',
        extraHTTPHeaders: {
          'Accept': 'application/json',
        },
      },
    },
    // Tests E2E — apuntan a Spotify
    {
      name: 'e2e',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://open.spotify.com',
      },
    },
  ],
});