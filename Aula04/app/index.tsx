import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { CharacterCard } from "../components/character-card";
import { getPeople } from "../services/swapi";
import { StarWarsCharacter } from "../types/star-wars";

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
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Star Wars Characters</Text>
            <Text style={styles.subtitle}>
              Scroll to keep loading more people from SWAPI.
            </Text>
          </View>
        }
        // nao é comum no caso de scroll infinito, mas pode ser usado para mostrar um loader ou uma mensagem de fim de lista
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF7ED",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  header: {
    paddingVertical: 24,
    gap: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#78716C",
    lineHeight: 20,
  },
  separator: {
    height: 14,
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 12,
  },
  stateTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  stateText: {
    fontSize: 14,
    color: "#57534E",
    textAlign: "center",
    lineHeight: 20,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
    gap: 10,
  },
  footerText: {
    fontSize: 13,
    color: "#78716C",
  },
  footerSpace: {
    height: 8,
  },
});
