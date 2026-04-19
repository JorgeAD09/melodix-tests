import { APIRequestContext, APIResponse } from '@playwright/test';

export class DezzerClient {
    constructor(private request: APIRequestContext) {}

    async searchTrack(query:string) {
        const response = await this.request.get(`/search`, {
            params: {
                q: query
            }
        });
        return response;
    }

    async getArtist(id: string | number): Promise<APIResponse> {
        const response = await this.request.get(`/artist/${id}`);
        return response;
    }

    async getAlbum(id: string | number): Promise<APIResponse> {
        const response = await this.request.get(`/album/${id}`);
        return response;
    }

    async getTrack(id: string | number): Promise<APIResponse> {
        const response = await this.request.get(`/track/${id}`);
        return response;
    }
}

