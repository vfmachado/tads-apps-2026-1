import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "../contexts/auth-context";
import { loginPanelStyles as styles } from "../styles/shared-styles";

export function LoginPanel() {
  const router = useRouter();
  const { isAuthenticated, isLoggingIn, login, logout, user } = useAuth();
  const [name, setName] = useState("Rey Skywalker");
  const [email, setEmail] = useState("rey@resistance.dev");

  async function handleLogin() {
    await login({ name, email });
    //  router.replace("/profile");
  }

  if (isAuthenticated && user) {
    return (
      <View style={styles.panel}>
        <Text style={styles.title}>Session active</Text>
        <Text style={styles.description}>
          {user.name} is signed in as {user.role}.
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Squad</Text>
          <Text style={styles.metaValue}>{user.squad}</Text>
        </View>

        <Pressable style={styles.secondaryButton} onPress={logout}>
          <Text style={styles.secondaryButtonText}>Logout</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.description}>
        Fill the fields and start a fake request. The user will be saved in
        context after the delay.
      </Text>

      <TextInput
        autoCapitalize="words"
        editable={!isLoggingIn}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
        value={name}
      />

      <TextInput
        autoCapitalize="none"
        editable={!isLoggingIn}
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        value={email}
      />

      <Pressable
        disabled={isLoggingIn}
        onPress={handleLogin}
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.pressedButton,
          isLoggingIn && styles.disabledButton,
        ]}
      >
        {isLoggingIn ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.primaryButtonText}>Login</Text>
        )}
      </Pressable>
    </View>
  );
}
