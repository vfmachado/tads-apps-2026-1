import { StyleSheet, Text, View } from "react-native";

import { StarWarsCharacter } from "../types/star-wars";

type Props = {
  character: StarWarsCharacter;
};

export function CharacterCard({ character }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Rebel Files</Text>
        <Text style={styles.name}>{character.name}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Birth year</Text>
          <Text style={styles.statValue}>{character.birth_year}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Gender</Text>
          <Text style={styles.statValue}>{character.gender}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailText}>Height: {character.height} cm</Text>
        <Text style={styles.detailText}>Mass: {character.mass} kg</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
    gap: 16,
  },
  header: {
    gap: 4,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#D97706",
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 14,
    gap: 6,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },
  details: {
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: "#334155",
  },
});
