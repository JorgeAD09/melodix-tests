import { test, expect } from '@playwright/test';
import { DezzerClient } from '../../utils/api-client';

test.describe('Dezzer Search API', () => {

    // Cada test recibe su propio "request" de Playwright
    let client: DezzerClient;

    test.beforeEach(async ({ request }) => {
        client = new DezzerClient(request);
    });

    test('should return 200 when searching a valid artist', async () => {
        const response = await client.searchTrack('Beyonce');

        // 1. Validamos status code
        expect(response.status()).toBe(200);
    });

    test('should return results with correct schema', async () => {
        const response = await client.searchTrack('Coldplay');
        const body = await response.json();

        // 2. Validamos schema - ¿tiene los campos que esperamos?
        expect(body).toHaveProperty('data');
        expect(body).toHaveProperty('total');
        expect(Array.isArray(body.data)).toBeTruthy();
    });

    test('should return tracks with required fields', async () => {
        const response = await client.searchTrack('Daft Punk');
        const body = await response.json();

        const firstTrack = body.data[0];

        // 3. Validamos data - campos individuales dentro de cada track
        expect(firstTrack).toHaveProperty('id');
        expect(firstTrack).toHaveProperty('title');
        expect(firstTrack).toHaveProperty('duration');
        expect(typeof firstTrack.id).toBe('number');
        expect(typeof firstTrack.title).toBe('string');
        expect(firstTrack.title.length).toBeGreaterThan(0);
    });

    test('should return empty results for gibberish query', async () => {
        const response = await client.searchTrack('asldkfjalskdfj123456');
        const body = await response.json();

        // 4. Validamos edge case - consulta sin resultados
        expect(response.status()).toBe(200); // Sigue siendo 200, solo sin data
        expect(body.total).toBe(0);
        expect(body.data).toHaveLength(0);
    });
});
