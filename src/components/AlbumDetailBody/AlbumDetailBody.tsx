import { AlbumDetailBodyProps } from "./AlbumDetailBody.props";

const AlbumDetailBody = (props: AlbumDetailBodyProps) => {
  const { videos } = props;

  // const { user_id } = useContext(AuthContext);
  // unlock video if user has bought the video
  // handle premium video (price: 10 koin)

  return (
    <>
      {videos?.map((video) => (
        <div key={video.id}>
          <img src={video.thumbnail} alt={video.title} />
          <h2>{video.title}</h2>
        </div>
      ))}
    </>
  );
};

export default AlbumDetailBody;
