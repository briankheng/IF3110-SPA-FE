import axios from "axios";
import Cookies from "js-cookie";

import { Category } from "../types";
import { API_URL } from "../constant";

class CategoryApi {
    private static token = Cookies.get("token") || "";
    private static axios = axios.create({
        baseURL: API_URL,
        headers: {
        Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        },
    });

    static async getCategories(): Promise<Category[]> {
        try {
            const response = await this.axios.get<Category[]>("/category");

            return response.data;
        } catch (error) {
            throw (error as any)?.response?.data;
        }
    }
}

export default CategoryApi;
