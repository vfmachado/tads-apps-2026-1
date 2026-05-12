import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { products } from "@/data/products";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.notFound}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageBox}>
          <Text style={styles.emoji}>{product.image}</Text>
        </View>

        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>About this product</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>← Back to Shop</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  imageBox: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emoji: {
    fontSize: 64,
  },
  category: {
    fontSize: 12,
    color: "#6366F1",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "#16A34A",
    marginBottom: 24,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E2E8F0",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 24,
    alignSelf: "flex-start",
    marginBottom: 36,
  },
  button: {
    backgroundColor: "#6366F1",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  notFound: {
    padding: 24,
    fontSize: 16,
    color: "#64748B",
  },
});
