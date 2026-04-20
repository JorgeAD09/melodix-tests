import { Page } from '@playwright/test';

export class ArtistPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getArtistName(name: string): Promise<string> {
        // Primero esperamos a que la URL contenga /artist/ — confirmamos que navegamos
        await this.page.waitForURL('**/artist/**', { timeout: 10000 });
        // Luego buscamos el heading
        await this.page.getByRole('heading', { name }).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.getByRole('heading', { name }).innerText();
    }

    async isLoaded(name: string): Promise<boolean> {
        await this.page.waitForURL('**/artist/**', { timeout: 10000 });
        await this.page.getByRole('heading', { name }).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.getByRole('heading', { name }).isVisible();
    }
}