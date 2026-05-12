import { Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "@/types/product";

type Props = {
  product: Product;
  onPress: (id: string) => void;
};

export function ProductCard({ product, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(product.id)}
    >
      <View style={styles.imageBox}>
        <Text style={styles.emoji}>{product.image}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  imageBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 32,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  category: {
    fontSize: 11,
    color: "#6366F1",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
    color: "#16A34A",
    marginTop: 2,
  },
});
