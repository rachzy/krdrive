export type RawPost = {
  content: string;
  media: File[];
};

export type Post = RawPost & {
  id: string;
  createdAt: Date;
  userId: string;
};
