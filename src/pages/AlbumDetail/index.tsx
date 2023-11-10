import { Album, Category, Rating, Video } from "../../types";
import AlbumDetailHeader from "../../components/AlbumDetailHeader/AlbumDetailHeader";

type AlbumDetailProps = Album & {
  ratings: Rating[];
  videos: Video[];
  categories: Category[];
};

const dummyAlbum: AlbumDetailProps = {
  id: 1,
  title: "Album Title",
  description: "Album Description",
  thumbnail: "https://picsum.photos/200",
  ratings: [],
  videos: [],
  categories: [],
};

const AlbumDetail = (props: AlbumDetailProps) => {
  const { title, description, thumbnail, ratings, videos, categories } = props;

  return (
    <>
      <AlbumDetailHeader
        title={title}
        thumbnail={thumbnail}
        ratings={ratings}
        categories={categories}
      />
    </>
  );
};

export default AlbumDetail;
