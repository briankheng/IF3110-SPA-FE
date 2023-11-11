import { useEffect } from "react";
import { useParams } from "react-router-dom";

import AlbumDetailHeader from "../../components/AlbumDetailHeader/AlbumDetailHeader";
import { AlbumApi } from "../../api";

const AlbumDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const album = await AlbumApi.getAlbum(id as string);
        console.log(album);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return <></>;
};

export default AlbumDetail;
