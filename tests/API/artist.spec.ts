import { test, expect } from '@playwright/test';
import { DezzerClient } from '../../utils/api-client';

test.describe('Dezzer API - Artist', () => {

    let client: DezzerClient;

    test.beforeEach(async ({ request }) => {
        client = new DezzerClient(request);
    });

    // getArtist(27) => validar que tiene name, nb_album, nb_fan
    test('should return artist details with correct schema', async () => {
        const response = await client.getArtist(27);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('nb_album');
        expect(body).toHaveProperty('nb_fan');
    });

    // Edge case => getArtist(999999999) => investigar que devuelva Dezzer y cubrirlo con un test
    test('should return error in body for non-existent artist', async () => {
        const response = await client.getArtist(999999999);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toHaveProperty('code');
        expect(body.error).toHaveProperty('message');
        expect(body.error).toHaveProperty('type');
    });
});





