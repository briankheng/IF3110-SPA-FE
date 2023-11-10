import { Category, Rating } from "../../types";

export type AlbumDetailHeaderProps = {
  title: string;
  thumbnail: string;
  ratings: Rating[];
  categories: Category[];
};
