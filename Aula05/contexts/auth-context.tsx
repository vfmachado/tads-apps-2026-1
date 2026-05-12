import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type AvatarId = "resistance" | "jedi" | "rebel" | "droid";

export type AvatarOption = {
  id: AvatarId;
  label: string;
  initials: string;
  backgroundColor: string;
  textColor: string;
};

export const avatarOptions: AvatarOption[] = [
  {
    id: "resistance",
    label: "Resistance pilot",
    initials: "RP",
    backgroundColor: "#DBEAFE",
    textColor: "#1D4ED8",
  },
  {
    id: "jedi",
    label: "Jedi archivist",
    initials: "JA",
    backgroundColor: "#DCFCE7",
    textColor: "#15803D",
  },
  {
    id: "rebel",
    label: "Rebel scout",
    initials: "RS",
    backgroundColor: "#FCE7F3",
    textColor: "#BE185D",
  },
  {
    id: "droid",
    label: "Droid operator",
    initials: "DO",
    backgroundColor: "#FEF3C7",
    textColor: "#B45309",
  },
];

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  squad: string;
  clearanceLevel: string;
  favoriteCharacter: string;
  lastLoginAt: string;
  avatarId: AvatarId;
};

type LoginCredentials = {
  name: string;
  email: string;
};

type AuthContextData = {
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateAvatar: (avatarId: AvatarId) => void;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function getAvatarOption(avatarId?: string) {
  return (
    avatarOptions.find((avatar) => avatar.id === avatarId) ?? avatarOptions[0]
  );
}

function formatDisplayName(name: string, email: string) {
  const trimmedName = name.trim();

  if (trimmedName.length > 0) {
    return trimmedName;
  }

  return email.split("@")[0] || "Guest pilot";
}

function wait(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function AuthProvider({ children }: PropsWithChildren) {
  // ESTADOS QUE QUERO GUARDAR (GLOBALMENTE)
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // AS ACOES QUE QUERO CHAMAR
  const login = useCallback(async ({ name, email }: LoginCredentials) => {
    setIsLoggingIn(true);

    await wait(900);

    setUser({
      id: "u-2026-05",
      name: formatDisplayName(name, email),
      email,
      role: "Resistance Analyst",
      squad: "Rogue Context",
      clearanceLevel: "Level 7",
      favoriteCharacter: "Leia Organa",
      lastLoginAt: new Date().toLocaleString("en-US"),
      avatarId: "resistance",
    });

    setIsLoggingIn(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateAvatar = useCallback((avatarId: AvatarId) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return {
        ...currentUser,
        avatarId,
      };
    });
  }, []);

  
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoggingIn,
      login,
      logout,
      updateAvatar,
    }),
    [isLoggingIn, login, logout, updateAvatar, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
