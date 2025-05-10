export interface User {
  _id: string;
  username: string;
}

export type RawPost = {
  content: string;
  media: File[];
};

export type Post = {
  _id: string;
  content: string;
  mediaUrls: string[];
  user: User;
  createdAt: string;
  updatedAt: string;
};
