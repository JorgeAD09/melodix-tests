import { Page } from '@playwright/test';

export class SearchPage {
    private page: Page;

    private searchInput = '[data-testid="search-input"]';
    private artistCard = '[data-testid="herocard-click-handler"]';

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        // Usamos intl-es porque Spotify detecta México y redirige aquí
        await this.page.goto('/intl-es/search');
    }

    async search(query: string) {
        await this.page.locator(this.searchInput).click();
        await this.page.locator(this.searchInput).fill(query);
        // Esperamos a que aparezcan los resultados
        await this.page.locator(this.artistCard).first().waitFor({ state: 'visible', timeout: 10000 });
    }

    async clickFirstArtist() {
        // click normal — codegen confirmó que no necesita doble click
        await this.page.locator(this.artistCard).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}