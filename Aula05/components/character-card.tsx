import { Text, View } from "react-native";

import { useAuth } from "../contexts/auth-context";
import { characterCardStyles as styles } from "../styles/shared-styles";
import { StarWarsCharacter } from "../types/star-wars";

type Props = {
  character: StarWarsCharacter;
};

export function CharacterCard({ character }: Props) {
  const { user } = useAuth();

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

      <View style={styles.contextAccess}>
        <Text style={styles.contextLabel}>Context access</Text>
        <Text style={styles.contextText}>
          {user
            ? `${user.name} can review this file with ${user.clearanceLevel} clearance.`
            : "Login to unlock reviewer data from context."}
        </Text>
      </View>
    </View>
  );
}
