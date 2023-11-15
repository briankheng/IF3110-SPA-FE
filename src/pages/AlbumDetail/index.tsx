import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AlbumApi } from "../../api";
import { AlbumResponse } from "../../types";

const AlbumDetail = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState<AlbumResponse>({} as AlbumResponse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const album = await AlbumApi.getAlbum(id as string);
        setAlbum(album);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return <></>;
};

export default AlbumDetail;
