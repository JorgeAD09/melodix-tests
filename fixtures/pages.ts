import { test as base } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { ArtistPage } from '../pages/ArtistPage';

// Le decimos a TS que fixtures vamos a agregar y que tipo tiene cada uno
type Pages = {
    searchPage: SearchPage;
    artistPage: ArtistPage;     
};

// base.extend es como decirle a Playwright: "agrega estos objetos a cada test"
export const test = base.extend<Pages>({

    // Playwright llama esto antes de cada test y le inyecta el searchPage listo
    searchPage: async ({ page }, use) => {
        // 'use' es la función que le dice a Playwright "ya tengo el searchPage listo, úsalo en el test"
        await use(new SearchPage(page));
    },

    // Igual con artistPage - Playwright se encarga de crear el page y pasarlo a este fixture
    artistPage: async ({ page }, use ) => {
        await use(new ArtistPage(page));
    },
});

// Exportamos expect para usarlo en los tests sin tener que importarlo
export { expect } from '@playwright/test';




