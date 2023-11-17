import axios from "axios";
import Cookies from "js-cookie";

import { VideoRequest, VideoResponse } from "../types";
import { API_URL } from "../constant";

class VideoApi {
  private static token = Cookies.get("token") || "";
  private static axios = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    },
  });

  static async getVideo(id: string): Promise<VideoResponse> {
    try {
      const response = await this.axios.get<VideoResponse>(`/video/${id}`);

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async createVideo(payload: VideoRequest): Promise<VideoResponse> {
    try {
      const response = await this.axios.post<VideoResponse>("/video", payload);

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async updateVideo(
    id: string,
    payload: VideoRequest
  ): Promise<VideoResponse> {
    try {
      const response = await this.axios.put<VideoResponse>(
        `/video/${id}`,
        payload
      );

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async deleteVideo(id: string): Promise<VideoResponse> {
    try {
      const response = await this.axios.delete<VideoResponse>(`/video/${id}`);

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }
}

export default VideoApi;
