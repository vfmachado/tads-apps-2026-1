import { Redirect, useRouter } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

import { AvatarView } from "../components/avatar-view";
import { avatarOptions, useAuth } from "../contexts/auth-context";
import { profileStyles as styles } from "../styles/shared-styles";

export default function Profile() {
  const router = useRouter();
  const { logout, updateAvatar, user } = useAuth();

  if (!user) {
    console.log("OOPSSS .. ")
    return <Redirect href="/" />;
  }

  function handleLogout() {
    logout();
    router.replace("/");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <AvatarView avatarId={user.avatarId} size={84} />

          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>Protected page</Text>
            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.subtitle}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{user.role}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Clearance</Text>
            <Text style={styles.infoValue}>{user.clearanceLevel}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Squad</Text>
            <Text style={styles.infoValue}>{user.squad}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose avatar</Text>
          <Text style={styles.sectionText}>
            The selected avatar stays in context and appears on Home.
          </Text>

          <View style={styles.avatarList}>
            {avatarOptions.map((avatar) => {
              const isSelected = avatar.id === user.avatarId;

              return (
                <Pressable
                  key={avatar.id}
                  onPress={() => updateAvatar(avatar.id)}
                  style={({ pressed }) => [
                    styles.avatarOption,
                    isSelected && styles.selectedAvatarOption,
                    pressed && styles.pressedAvatarOption,
                  ]}
                >
                  <AvatarView option={avatar} />

                  <View style={styles.avatarText}>
                    <Text style={styles.avatarLabel}>{avatar.label}</Text>
                    <Text style={styles.avatarStatus}>
                      {isSelected ? "Selected" : "Tap to select"}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
