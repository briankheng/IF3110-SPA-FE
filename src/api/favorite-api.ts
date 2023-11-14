import axios from "axios";
import Cookies from "js-cookie";

import { AlbumResponse } from "../types";
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
}

export default FavoriteApi;
