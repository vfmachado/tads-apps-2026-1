import { Tabs } from "expo-router";

import { AuthProvider, useAuth } from "../contexts/auth-context";
import { PostStorageProvider } from "../contexts/post-storage";
import { tabScreenOptions } from "../styles/shared-styles";

function AppTabs() {
  const { isAuthenticated } = useAuth();

  return (
    <Tabs
      screenOptions={tabScreenOptions}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          href: isAuthenticated ? "/profile" : null,
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PostStorageProvider>
        <AppTabs />
      </PostStorageProvider>
    </AuthProvider>
  );
}
