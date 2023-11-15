import axios from "axios";
import Cookies from "js-cookie";

import { SubscriptionResponse } from "../types";
import { API_URL } from "../constant";

class SubscriptionApi {
    private static token = Cookies.get("token") || "";
    private static axios = axios.create({
        baseURL: API_URL,
        headers: {
        Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        },
    });

    static async getStatus(userId: number, albumId: number): Promise<boolean> {
        try {
            const response = await this.axios.get<boolean>(`/subscribe?albumId=${albumId}&userId=${userId}`);

            return response.data;
        } catch (error) {
            throw (error as any)?.response?.data;
        }
    }

    static async request(userId: string, albumId: string): Promise<SubscriptionResponse> {
        try {
          const response = await this.axios.post<SubscriptionResponse>(`/subscribe/request?albumId=${albumId}&userId=${userId}`);
    
          return response.data;
        } catch (error) {
          throw (error as any)?.response?.data;
        }
    }

    static async unsubscribe(userId: string, albumId: string): Promise<SubscriptionResponse> {
        try {
          const response = await this.axios.post<SubscriptionResponse>(`/subscribe/unsubscribe?albumId=${albumId}&userId=${userId}`);
    
          return response.data;
        } catch (error) {
          throw (error as any)?.response?.data;
        }
    }
}

export default SubscriptionApi;
