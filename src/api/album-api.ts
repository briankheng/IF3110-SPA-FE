import axios from "axios";
import Cookies from "js-cookie";

import { AlbumRequest, AlbumResponse } from "../types";
import { API_URL } from "../constant";

class AlbumApi {
  private static token = Cookies.get("token") || "";
  private static axios = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    },
  });

  static async getAlbums(): Promise<AlbumResponse[]> {
    try {
      const response = await this.axios.get<AlbumResponse[]>("/album");

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async getAlbum(id: string): Promise<AlbumResponse> {
    try {
      const response = await this.axios.get<AlbumResponse>(`/album/${id}`);

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async createAlbum(payload: AlbumRequest): Promise<AlbumResponse> {
    try {
      const response = await this.axios.post<AlbumResponse>("/album", payload);

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async updateAlbum(
    id: string,
    payload: AlbumRequest
  ): Promise<AlbumResponse> {
    try {
      const response = await this.axios.put<AlbumResponse>(
        `/album/${id}`,
        payload
      );

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async deleteAlbum(id: string): Promise<void> {
    try {
      await this.axios.delete<void>(`/album/${id}`);
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }
}

export default AlbumApi;
