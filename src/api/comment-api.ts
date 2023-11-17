import axios from "axios";
import Cookies from "js-cookie";

import { CommentRequest, CommentResponse } from "../types";
import { API_URL } from "../constant";

class CommentApi {
  private static token = Cookies.get("token") || "";
  private static axios = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    },
  });

  static async getComments(id: string): Promise<CommentResponse[]> {
    try {
      const response = await this.axios.get<CommentResponse[]>(
        `/comment/?videoId=${id}`
      );

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async createComment(
    payload: CommentRequest
  ): Promise<CommentResponse> {
    try {
      const response = await this.axios.post<CommentResponse>(
        "/comment",
        payload
      );

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async updateComment(
    id: string,
    payload: CommentRequest
  ): Promise<CommentResponse> {
    try {
      const response = await this.axios.put<CommentResponse>(
        `/comment/${id}`,
        payload
      );

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async patchComment(
    id: string,
    payload: Partial<CommentRequest>
  ): Promise<CommentResponse> {
    try {
      const response = await this.axios.patch<CommentResponse>(
        `/comment/${id}`,
        payload
      );

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async deleteComment(id: string): Promise<CommentResponse> {
    try {
      const response = await this.axios.delete<CommentResponse>(
        `/comment/${id}`
      );

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }
}

export default CommentApi;
