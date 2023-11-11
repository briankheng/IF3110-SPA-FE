import { AlbumDetailHeaderProps } from "./AlbumDetailHeader.props";

const AlbumDetailHeader = (props: AlbumDetailHeaderProps) => {
  const { title, thumbnail, ratings, categories } = props;

  // const { user_id } = useContext(AuthContext);

  const ratingsAverage =
    ratings?.reduce((acc, rating) => acc + rating.score, 0) / ratings?.length;
  // const yourRating = ratings?.find((rating) => rating.user_id === user_id)?.score;

  return (
    <>
      <div>
        <img src={thumbnail} alt={title} />
      </div>
      <div>
        <h1>{title}</h1>
        <p>{ratingsAverage}</p>
        <p>{ratings?.length}</p>
        <p>{/* yourRating */}</p>
        {categories?.map((category) => (
          <span key={category.id}>{category.name}</span>
        ))}
      </div>
    </>
  );
};

export default AlbumDetailHeader;
