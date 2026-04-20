import { test, expect } from '../../fixtures/pages';

test.describe('Spotify Search E2E', () => {

    test('should find an artist and navigate to their page', async ({ searchPage, artistPage }) => {

        const artistName = 'Coldplay';

        // Paso 1 - abrimos Spotify en la pagina de busqueda
        await searchPage.goto();

        // Paso 2 - escribimos "Coldplay" en la barra de busqueda
        await searchPage.search(artistName);

        // Paso 3 - clickamos el primer resultado que aparece
        await searchPage.clickFirstArtist();

        // Paso 4 - validamos que la pagina del artista cargo
        expect(await artistPage.isLoaded(artistName)).toBeTruthy();

        // Paso 5 - validamos que el nombre del artista es "Coldplay"
        expect(await artistPage.getArtistName(artistName)).toContain(artistName);

    });
});