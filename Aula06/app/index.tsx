import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";

import { LoginPanel } from "../components/login-panel";
import { PostCard } from "../components/post-card";
import { PostComposer } from "../components/post-composer";
import { UserBadge } from "../components/user-badge";
import { useAuth } from "../contexts/auth-context";
import { usePostStorage } from "../contexts/post-storage";
import { homeStyles as styles, loginPanelStyles } from "../styles/shared-styles";

function ListHeader() {
  const { user } = useAuth();
  const { hasNextPage, posts } = usePostStorage();

  return (
    <View style={styles.header}>
      <UserBadge />

      <View style={styles.intro}>
        <Text style={styles.title}>Community Feed</Text>
        <Text style={styles.subtitle}>
          {user
            ? `${user.name}, publique no contexto global e deslize para paginar os posts da API externa.`
            : "Entre com um usuario para criar posts, anexar uma foto e acompanhar a paginacao do feed."}
        </Text>
      </View>

      <LoginPanel />
      <PostComposer />

      <View style={styles.profileSummary}>
        <Text style={styles.profileLabel}>Feed status</Text>
        <Text style={styles.profileValue}>{posts.length} posts em memoria</Text>
        <Text style={styles.profileText}>
          {hasNextPage
            ? "A lista continua carregando novas paginas sob demanda."
            : "Todas as paginas disponiveis ja foram carregadas."}
        </Text>
      </View>

      {user ? (
        <View style={styles.profileSummary}>
          <Text style={styles.profileLabel}>Autor atual</Text>
          <Text style={styles.profileValue}>{user.name}</Text>
          <Text style={styles.profileText}>Ultimo login: {user.lastLoginAt}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default function Index() {
  const {
    error,
    hasNextPage,
    isLoading,
    isLoadingMore,
    loadInitialPosts,
    loadMorePosts,
    posts,
  } = usePostStorage();

  useEffect(() => {
    if (posts.length === 0) {
      void loadInitialPosts();
    }
  }, [loadInitialPosts, posts.length]);

  const renderFooter = () => {
    if (isLoadingMore) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.footerText}>Carregando mais posts...</Text>
        </View>
      );
    }

    if (posts.length === 0) {
      return <View style={styles.footerSpace} />;
    }

    if (hasNextPage) {
      return <View style={styles.footerSpace} />;
    }

    return (
      <View style={styles.footerLoader}>
        <Text style={styles.footerText}>Voce chegou ao fim da lista.</Text>
      </View>
    );
  };

  if (isLoading && posts.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.stateTitle}>Conectando ao feed...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && posts.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Falha ao carregar posts</Text>
          <Text style={styles.stateText}>{error}</Text>

          <Pressable
            onPress={() => void loadInitialPosts()}
            style={({ pressed }) => [
              loginPanelStyles.secondaryButton,
              pressed && loginPanelStyles.pressedButton,
            ]}
          >
            <Text style={loginPanelStyles.secondaryButtonText}>Tentar novamente</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={() => void loadMorePosts()}
        onEndReachedThreshold={0.4}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}
