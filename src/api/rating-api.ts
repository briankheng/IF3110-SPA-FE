import axios from "axios";
import Cookies from "js-cookie";

import { Rating, RatingRequest } from "../types";
import { API_URL } from "../constant";

class RatingApi {
    private static token = Cookies.get("token") || "";
    private static axios = axios.create({
        baseURL: API_URL,
        headers: {
        Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        },
    });

    static async getRating(userId: string, albumId: string): Promise<Rating> {
        try {
            const response = await this.axios.get<Rating>(`/rating?albumId=${albumId}&userId=${userId}`);

            return response.data;
        } catch (error) {
            throw (error as any)?.response?.data;
        }
    }

    static async createRating(payload: RatingRequest): Promise<Rating> {
        try {
            const response = await this.axios.post<Rating>("/rating", payload);
        
            return response.data;
        } catch (error) {
            throw (error as any)?.response?.data;
        }
    }

    static async updateRating(payload: RatingRequest): Promise<Rating> {
        try {
            const response = await this.axios.put<Rating>("/rating", payload);
        
            return response.data;
        } catch (error) {
            throw (error as any)?.response?.data;
        }
    }
}

export default RatingApi;
