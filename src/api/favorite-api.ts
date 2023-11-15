import axios from "axios";
import Cookies from "js-cookie";

import { AlbumResponse, Favorite } from "../types";
import { API_URL } from "../constant";

class FavoriteApi {
    private static token = Cookies.get("token") || "";
    private static axios = axios.create({
        baseURL: API_URL,
        headers: {
        Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        },
    });

    static async getFavorite(id: number): Promise<AlbumResponse[]> {
        try {
            const response = await this.axios.get<AlbumResponse[]>(`/favorite?userId=${id}`);

            return response.data;
        } catch (error) {
            throw (error as any)?.response?.data;
        }
    }

    static async verifyFavorite(userId: string, albumId: string): Promise<boolean> {
        try {
            const response = await this.axios.get<boolean>(`/favorite/verify?userId=${userId}&albumId=${albumId}`);

            return response.data;
        } catch (error) {
            throw (error as any)?.response?.data;
        }
    }

    static async add(payload: Favorite): Promise<Favorite> {
        try {
            const response = await this.axios.post<Favorite>("/favorite", payload);
    
            return response.data;
        } catch (error) {
            throw (error as any)?.response?.data;
        }
    }

    static async remove(payload: Favorite): Promise<void> {
        try {
            const response = await this.axios.delete<void>("/favorite", { data: payload });
    
            return response.data;
        } catch (error) {
            throw (error as any)?.response?.data;
        }
    }
}

export default FavoriteApi;
