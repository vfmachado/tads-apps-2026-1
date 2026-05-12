import { Text, View } from "react-native";

import { AvatarView } from "./avatar-view";
import { useAuth } from "../contexts/auth-context";
import { userBadgeStyles as styles } from "../styles/shared-styles";

export function UserBadge() {
  const { user } = useAuth();

  if (!user) {
    return (
      <View style={styles.badge}>
        <Text style={styles.label}>Visitor mode</Text>
        <Text style={styles.value}>No user in context yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.loggedBadge}>
      <AvatarView avatarId={user.avatarId} />

      <View style={styles.loggedContent}>
        <Text style={styles.label}>Logged user</Text>
        <Text style={styles.value}>{user.name}</Text>
        <Text style={styles.detail}>{user.email}</Text>
      </View>
    </View>
  );
}
