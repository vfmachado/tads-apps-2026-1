import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";

import { CharacterCard } from "../components/character-card";
import { LoginPanel } from "../components/login-panel";
import { UserBadge } from "../components/user-badge";
import { useAuth } from "../contexts/auth-context";
import { getPeople } from "../services/swapi";
import { homeStyles as styles } from "../styles/shared-styles";
import { StarWarsCharacter } from "../types/star-wars";

function ListHeader() {
  // user é um valor que no context
  // useAuth é o nome que demos para expor esse context/provider
  const { user } = useAuth();

  return (
    <View style={styles.header}>
      <UserBadge />

      <View style={styles.intro}>
        <Text style={styles.title}>Star Wars Characters</Text>
        <Text style={styles.subtitle}>
          {user
            ? `${user.name}, scroll to keep loading more people from SWAPI.`
            : "Login to share the same user data with the header and each character card."}
        </Text>
      </View>

      <LoginPanel />

      {user ? (
        <View style={styles.profileSummary}>
          <Text style={styles.profileLabel}>Favorite character</Text>
          <Text style={styles.profileValue}>{user.favoriteCharacter}</Text>
          <Text style={styles.profileText}>Last login: {user.lastLoginAt}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default function Index() {

  console.log("INDEX")

  // MIGRAR O FETCH E O ESTADO PARA O TANSTACK https://tanstack.com/query/latest
  const [characters, setCharacters] = useState<StarWarsCharacter[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCharacters = useCallback(async (nextPage: number, append = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    setError(null);

    try {
      const data = await getPeople(nextPage);

      setCharacters((current) =>
        append ? [...current, ...data.results] : data.results
      );
      setPage(nextPage);
      setHasNextPage(Boolean(data.next));
    } catch {
      setError("Unable to load Star Wars characters right now.");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadCharacters(1);
  }, [loadCharacters]);

  const handleLoadMore = () => {
    if (isLoading || isLoadingMore || !hasNextPage) {
      return;
    }

    loadCharacters(page + 1, true);
  };

  const renderFooter = () => {
    if (!isLoadingMore) {
      return <View style={styles.footerSpace} />;
    }

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#D97706" />
        <Text style={styles.footerText}>Loading more characters...</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color="#D97706" />
          <Text style={styles.stateTitle}>Connecting to the galaxy...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Transmission failed</Text>
          <Text style={styles.stateText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        // array de dados
        data={characters}
        // indexa o elemento do html => key é uma referencia unica para cada elemento da lista, nesse caso usamos a url que é unica para cada personagem
        keyExtractor={(item) => item.url}
        // como renderiza cada item do array
        renderItem={({ item }) => <CharacterCard character={item} />}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        
        // separador
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}

        // header
        ListHeaderComponent={ListHeader}
        // nao é comum no caso de scroll infinito, mas pode ser usado para mostrar um loader ou uma mensagem de fim de lista
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}
