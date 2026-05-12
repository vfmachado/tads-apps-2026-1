import { StyleSheet } from "react-native";

export const tabScreenOptions = {
  headerShown: true,
  tabBarActiveTintColor: "#2563EB",
  tabBarInactiveTintColor: "#64748B",
  tabBarStyle: {
    borderTopColor: "#E2E8F0",
  },
};

export const avatarViewStyles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
  },
  initials: {
    fontWeight: "900",
  },
});

export const characterCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
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
    borderRadius: 8,
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
  contextAccess: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    padding: 12,
  },
  contextLabel: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  contextText: {
    color: "#1E3A8A",
    fontSize: 14,
    lineHeight: 20,
  },
});

export const homeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF7ED",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  header: {
    paddingVertical: 24,
    gap: 14,
  },
  intro: {
    gap: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#78716C",
    lineHeight: 20,
  },
  separator: {
    height: 14,
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 12,
  },
  stateTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  stateText: {
    fontSize: 14,
    color: "#57534E",
    textAlign: "center",
    lineHeight: 20,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
    gap: 10,
  },
  footerText: {
    fontSize: 13,
    color: "#78716C",
  },
  footerSpace: {
    height: 8,
  },
  profileSummary: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    padding: 12,
  },
  profileLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  profileValue: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "800",
  },
  profileText: {
    color: "#475569",
    fontSize: 13,
  },
});

export const loginPanelStyles = StyleSheet.create({
  panel: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  title: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "800",
  },
  description: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderColor: "#CBD5E1",
    borderRadius: 8,
    borderWidth: 1,
    color: "#0F172A",
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#2563EB",
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  pressedButton: {
    opacity: 0.85,
  },
  disabledButton: {
    backgroundColor: "#94A3B8",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: "#2563EB",
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "700",
  },
  metaRow: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    gap: 4,
    padding: 12,
  },
  metaLabel: {
    color: "#64748B",
    fontSize: 12,
  },
  metaValue: {
    color: "#1E293B",
    fontSize: 15,
    fontWeight: "700",
  },
});

export const profileStyles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F8FAFC",
    flex: 1,
  },
  content: {
    gap: 20,
    padding: 20,
    paddingBottom: 36,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 16,
    padding: 16,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  eyebrow: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "900",
  },
  subtitle: {
    color: "#475569",
    fontSize: 14,
  },
  infoGrid: {
    gap: 10,
  },
  infoItem: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    padding: 14,
  },
  infoLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  infoValue: {
    color: "#1E293B",
    fontSize: 16,
    fontWeight: "800",
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "900",
  },
  sectionText: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },
  avatarList: {
    gap: 10,
  },
  avatarOption: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    minHeight: 78,
    padding: 12,
  },
  selectedAvatarOption: {
    borderColor: "#2563EB",
    borderWidth: 2,
  },
  pressedAvatarOption: {
    opacity: 0.85,
  },
  avatarText: {
    flex: 1,
    gap: 4,
  },
  avatarLabel: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "800",
  },
  avatarStatus: {
    color: "#64748B",
    fontSize: 13,
  },
  logoutButton: {
    alignItems: "center",
    backgroundColor: "#DC2626",
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});

export const userBadgeStyles = StyleSheet.create({
  badge: {
    backgroundColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    padding: 12,
  },
  loggedBadge: {
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 12,
  },
  loggedContent: {
    flex: 1,
    gap: 4,
  },
  label: {
    color: "#047857",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  value: {
    color: "#064E3B",
    fontSize: 16,
    fontWeight: "800",
  },
  detail: {
    color: "#047857",
    fontSize: 13,
  },
});

export const postComposerStyles = StyleSheet.create({
  blockedPanel: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  panel: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DBEAFE",
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  title: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "800",
  },
  description: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderColor: "#CBD5E1",
    borderRadius: 8,
    borderWidth: 1,
    color: "#0F172A",
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textArea: {
    minHeight: 110,
  },
  previewCard: {
    gap: 10,
  },
  previewImage: {
    borderRadius: 8,
    height: 220,
    width: "100%",
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    minWidth: 140,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#2563EB",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 16,
  },
  submitButton: {
    flex: 1,
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: "#2563EB",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButtonText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "700",
  },
  pressedButton: {
    opacity: 0.85,
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export const postCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 8,
    borderWidth: 1,
    gap: 14,
    padding: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: "#DBEAFE",
    borderRadius: 999,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  avatarText: {
    color: "#1D4ED8",
    fontSize: 14,
    fontWeight: "800",
  },
  headerContent: {
    flex: 1,
    gap: 2,
  },
  author: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "800",
  },
  meta: {
    color: "#64748B",
    fontSize: 12,
  },
  body: {
    gap: 8,
  },
  title: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "800",
  },
  content: {
    color: "#334155",
    fontSize: 15,
    lineHeight: 22,
  },
  photo: {
    borderRadius: 8,
    height: 240,
    width: "100%",
  },
});
