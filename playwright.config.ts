import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [['html'], ['list']],

  projects: [
    // Primero corre el setup de auth
    {
      name: 'setup',
      testMatch: '**/setup/*.setup.ts',
    },
    // Luego los tests de API
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
    // Luego los tests E2E — dependen del setup
    {
      name: 'e2e',
      testDir: './tests/e2e',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.deezer.com',
        storageState: '.auth/session.json',
      },
    },
  ],
});