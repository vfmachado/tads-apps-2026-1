import axios from "axios";

import { AppPost, CreatePostPayload, PostsPage } from "../types/post";

type RemotePost = {
  userId: number;
  id: number;
  title: string;
  body: string;
  authorName?: string;
  authorEmail?: string;
  photoUri?: string | null;
  createdAt?: string;
};

export const POSTS_PER_PAGE = 8;

const postsApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

function mapRemotePost(post: RemotePost): AppPost {
  return {
    id: `remote-${post.id}`,
    remoteId: post.id,
    title: post.title,
    body: post.body,
    authorName: post.authorName?.trim() || `Usuario ${post.userId}`,
    authorEmail: post.authorEmail,
    createdAt: post.createdAt || `API post #${post.id}`,
    photoUri: post.photoUri ?? null,
  };
}

export async function getPostsPage(page = 1): Promise<PostsPage> {
  const response = await postsApi.get<RemotePost[]>("/posts", {
    params: {
      _page: page,
      _limit: POSTS_PER_PAGE,
    },
  });

  const totalCount = Number(response.headers["x-total-count"] ?? 0);
  const hasNextPage = totalCount
    ? page * POSTS_PER_PAGE < totalCount
    : response.data.length === POSTS_PER_PAGE;

  return {
    posts: response.data.map(mapRemotePost),
    hasNextPage,
    page,
  };
}

export async function createPost(payload: CreatePostPayload): Promise<AppPost> {
  const createdAt = new Date().toLocaleString("pt-BR");
  const response = await postsApi.post<RemotePost>("/posts", {
    title: payload.title,
    body: payload.body,
    userId: payload.userId,
    authorName: payload.authorName,
    authorEmail: payload.authorEmail,
    photoUri: payload.photoUri ?? null,
    createdAt,
  });

  return {
    id: `created-${response.data.id}-${Date.now()}`,
    remoteId: response.data.id,
    title: response.data.title,
    body: response.data.body,
    authorName: response.data.authorName?.trim() || payload.authorName,
    authorEmail: response.data.authorEmail || payload.authorEmail,
    createdAt: response.data.createdAt || createdAt,
    photoUri: response.data.photoUri ?? payload.photoUri ?? null,
  };
}
