import axios from "axios";
import Cookies from "js-cookie";

import { AuthRequest, AuthResponse, UserRequest, UserResponse } from "../types";
import { API_URL } from "../constant";

class UserApi {
  private static token = Cookies.get("token") || "";
  private static axios = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    },
  });

  static async getSelf(): Promise<UserResponse> {
    try {
      const response = await this.axios.get<UserResponse>("/user/me");

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async login(payload: AuthRequest): Promise<AuthResponse> {
    try {
      const response = await this.axios.post<AuthResponse>("/login", payload);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async register(payload: UserRequest): Promise<UserResponse> {
    try {
      const response = await this.axios.post<UserResponse>(
        "/register",
        payload
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default UserApi;
