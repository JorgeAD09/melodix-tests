import { test, expect } from '@playwright/test';
import { DezzerClient } from '../../utils/api-client';

test.describe('Dezzer API - Track', () => {

    let client: DezzerClient;

    test.beforeEach(async ({ request }) => {
        client = new DezzerClient(request);
    });

    // getTrack(3135556) => validar que preview es URL y rank es número
    test('should return track details with correct schema', async () => {
        const response = await client.getTrack(3135556);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(() => new URL(body.preview)).not.toThrow();
        expect(typeof body.rank).toBe('number');
    });

    // Edge case => getTrack(999999999) => investigar que devuelva Dezzer y cubrirlo con un test
    test('should return error for non-existent track', async () => {
        const response = await client.getTrack(999999999);
        expect(response.status()).toBe(200);
    
        const body = await response.json();        
        expect(body).toHaveProperty('error');
        expect(body.error).toHaveProperty('code');
        expect(body.error).toHaveProperty('message');
        expect(body.error).toHaveProperty('type');
    });
});

