export type AppPost = {
  id: string;
  remoteId?: number;
  title: string;
  body: string;
  authorName: string;
  authorEmail?: string;
  createdAt: string;
  photoUri?: string | null;
};

export type CreatePostPayload = {
  title: string;
  body: string;
  userId: number;
  authorName: string;
  authorEmail?: string;
  photoUri?: string | null;
};

export type PostsPage = {
  posts: AppPost[];
  hasNextPage: boolean;
  page: number;
};
