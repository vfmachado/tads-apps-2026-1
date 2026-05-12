import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";

export default function Index() {
  const router = useRouter();

  const handleProductPress = (id: string) => {
    router.push({ pathname: "/product/[id]", params: { id } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Shop</Text>
            <Text style={styles.subtitle}>{products.length} products available</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  header: {
    paddingVertical: 24,
    gap: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  separator: {
    height: 12,
  },
});
