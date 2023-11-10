import { AlbumDetailHeaderProps } from "./AlbumDetailHeader.props";

const AlbumDetailHeader = (props: AlbumDetailHeaderProps) => {
  const { title, thumbnail, ratings, categories } = props;

  return <>{title}</>;
};

export default AlbumDetailHeader;
