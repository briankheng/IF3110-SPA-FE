import axios from "axios";
import Cookies from "js-cookie";

import { AlbumRequest, AlbumResponse } from "../types";
import { API_URL } from "../constant";

class AlbumApi {
  private static token = Cookies.get("token");

  static async getAlbums(): Promise<AlbumResponse[]> {
    try {
      const response = await axios.get<AlbumResponse[]>(`${API_URL}/album`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAlbum(id: number): Promise<AlbumResponse> {
    try {
      const response = await axios.get<AlbumResponse>(
        `${API_URL}/album/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createAlbum(payload: AlbumRequest): Promise<AlbumResponse> {
    try {
      const response = await axios.post<AlbumResponse>(
        `${API_URL}/album`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateAlbum(
    id: number,
    payload: AlbumRequest
  ): Promise<AlbumResponse> {
    try {
      const response = await axios.put<AlbumResponse>(
        `${API_URL}/album/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAlbum(id: number): Promise<void> {
    try {
      await axios.delete<void>(`${API_URL}/album/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default AlbumApi;
