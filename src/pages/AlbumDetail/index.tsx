import { Album, Category, Rating, Video } from "../../types";
import AlbumDetailHeader from "../../components/AlbumDetailHeader/AlbumDetailHeader";

type AlbumDetailProps = Album & {
  ratings: Rating[];
  videos: Video[];
  categories: Category[];
};

const AlbumDetail = (props: AlbumDetailProps) => {
  // const { title, description, thumbnail, ratings, videos, categories } = props;

  return (
    <>
      <AlbumDetailHeader {...props} />
    </>
  );
};

export default AlbumDetail;
