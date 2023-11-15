export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  name: string;
  coins: number;
};

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
  isPremium: boolean;
  albumId: number;
};

export type Rating = {
  id: number;
  score: number;
  userId: number;
  albumId: number;
};

export type Category = {
  id: number;
  name: string;
};

export type Comment = {
  id: number;
  text: string;
  userId: number;
  videoId: number;
};

export type Token = {
  id: number;
  value: string;
  coinValue: number;
};

export type AlbumRequest = Omit<Album, "id">;

export type AlbumResponse = Album & {
  videos: Video[];
  ratings: Rating[];
  categories: Category[];
};

export type VideoRequest = Omit<Video, "id">;

export type VideoResponse = Video & {
  comments: Comment[];
};

export type CommentRequest = Omit<Comment, "id">;

export type CommentResponse = Comment;

export type AuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type UserRequest = Omit<User, "id" | "isAdmin" | "coins">;

export type UserResponse = User & {
  comments: Comment[];
  ratings: Rating[];
  videos: Video[];
};

export type SearchResponse = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videos: Video[];
}
