import { test as setup } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const SESSION_FILE = '.auth/session.json';

setup('authenticate with Deezer', async ({ page }) => {
    await page.goto('https://www.deezer.com/en/login');

    // Acepta cookies
    const cookieButton = page.getByTestId('gdpr-btn-accept-all');
    await cookieButton.waitFor({ state: 'visible', timeout: 10000 });
    await cookieButton.click();

    // Login
    await page.getByTestId('email-field').fill(process.env.DEEZER_EMAIL!);
    await page.getByTestId('password-field').fill(process.env.DEEZER_PASSWORD!);
    await page.getByTestId('login-button').click();

    // Esperamos cualquier navegación
    await page.waitForLoadState('domcontentloaded', { timeout: 40000 });

    // Guardamos la sesión aunque estemos en el security check
    await page.context().storageState({ path: SESSION_FILE });
});