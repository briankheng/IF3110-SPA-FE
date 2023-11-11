export type Album = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};

export type Video = {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  views: number;
  is_premium: boolean;
  album_id: number;
};

export type Rating = {
  id: number;
  score: number;
  user_id: number;
  album_id: number;
};

export type Category = {
  id: number;
  name: string;
};

export type Comment = {
  id: number;
  text: string;
  user_id: number;
  video_id: number;
};

export type AlbumRequest = Omit<Album, "id">;

export type AlbumResponse = Album & {
  videos: Video[];
  ratings: Rating[];
  categories: Category[];
};
