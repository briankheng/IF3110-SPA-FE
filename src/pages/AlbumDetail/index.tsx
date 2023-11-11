import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AlbumApi } from "../../api";
import { AlbumResponse } from "../../types";
import {
  AlbumDetailHeader,
  AlbumDetailBody,
  AlbumDetailFooter,
} from "../../components";

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

  return (
    <>
      <AlbumDetailHeader
        title={album?.title}
        thumbnail={album?.thumbnail}
        ratings={album?.ratings}
        categories={album?.categories}
      />
      <AlbumDetailBody videos={album?.videos} />
      <AlbumDetailFooter description={album?.description} />
    </>
  );
};

export default AlbumDetail;
