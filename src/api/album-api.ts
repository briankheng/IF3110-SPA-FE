import axios from "axios";

import { AlbumResponse } from "../types";
import { API_URL } from "../constant";

class AlbumApi {
  static async getAlbums(): Promise<AlbumResponse[]> {
    try {
      // const { token } = useAuthContext();

      const response = await axios.get<AlbumResponse[]>(`${API_URL}/albums`, {
        headers: {
          //   Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // CRUD...
}

export default AlbumApi;
