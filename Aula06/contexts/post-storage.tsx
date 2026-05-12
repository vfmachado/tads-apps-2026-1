import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { useAuth } from "./auth-context";
import { createPost as createRemotePost, getPostsPage } from "../services/posts-api";
import { AppPost } from "../types/post";

type CreatePostInput = {
  title: string;
  body: string;
  photoUri?: string | null;
};

type PostStorageContextData = {
  posts: AppPost[];
  error: string | null;
  hasNextPage: boolean;
  isCreating: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  createPost: (input: CreatePostInput) => Promise<void>;
  loadInitialPosts: () => Promise<void>;
  loadMorePosts: () => Promise<void>;
};

const PostStorage = createContext<PostStorageContextData | undefined>(undefined);

function buildUserNumericId(userId: string) {
  const numericId = Number.parseInt(userId.replace(/\D/g, ""), 10);

  if (Number.isFinite(numericId) && numericId > 0) {
    return numericId;
  }

  return 1;
}

export function PostStorageProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<AppPost[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInitialPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getPostsPage(1);
      setPosts(response.posts);
      setPage(response.page);
      setHasNextPage(response.hasNextPage);
    } catch {
      setError("Nao foi possivel carregar os posts agora.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMorePosts = useCallback(async () => {
    if (isLoading || isLoadingMore || !hasNextPage) {
      return;
    }

    const nextPage = page + 1;
    setIsLoadingMore(true);
    setError(null);

    try {
      const response = await getPostsPage(nextPage);

      setPosts((currentPosts) => [...currentPosts, ...response.posts]);
      setPage(response.page);
      setHasNextPage(response.hasNextPage);
    } catch {
      setError("Nao foi possivel carregar mais posts.");
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasNextPage, isLoading, isLoadingMore, page]);

  const createPost = useCallback(
    async ({ title, body, photoUri }: CreatePostInput) => {
      if (!user) {
        throw new Error("Voce precisa estar logado para publicar.");
      }

      const trimmedTitle = title.trim();
      const trimmedBody = body.trim();

      if (!trimmedTitle || !trimmedBody) {
        throw new Error("Titulo e conteudo sao obrigatorios.");
      }

      setIsCreating(true);
      setError(null);

      try {
        const createdPost = await createRemotePost({
          title: trimmedTitle,
          body: trimmedBody,
          photoUri: photoUri ?? null,
          userId: buildUserNumericId(user.id),
          authorName: user.name,
          authorEmail: user.email,
        });

        setPosts((currentPosts) => [createdPost, ...currentPosts]);
      } catch {
        setError("Nao foi possivel publicar o post agora.");
        throw new Error("Nao foi possivel publicar o post agora.");
      } finally {
        setIsCreating(false);
      }
    },
    [user]
  );

  const value = useMemo(
    () => ({
      posts,
      error,
      hasNextPage,
      isCreating,
      isLoading,
      isLoadingMore,
      createPost,
      loadInitialPosts,
      loadMorePosts,
    }),
    [
      createPost,
      error,
      hasNextPage,
      isCreating,
      isLoading,
      isLoadingMore,
      loadInitialPosts,
      loadMorePosts,
      posts,
    ]
  );

  return <PostStorage.Provider value={value}>{children}</PostStorage.Provider>;
}

export function usePostStorage() {
  const context = useContext(PostStorage);

  if (!context) {
    throw new Error("usePostStorage must be used inside PostStorageProvider.");
  }

  return context;
}
