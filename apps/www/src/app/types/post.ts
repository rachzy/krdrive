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
  author: User;
  createdAt: string;
  updatedAt: string;
};
