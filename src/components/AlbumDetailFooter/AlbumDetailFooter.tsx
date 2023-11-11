import { AlbumDetailFooterProps } from "./AlbumDetailFooter.props";

const AlbumDetailFooter = (props: AlbumDetailFooterProps) => {
  const { description } = props;

  return (
    <>
      <h1>Synopsis</h1>
      <p>{description}</p>
    </>
  );
};

export default AlbumDetailFooter;
