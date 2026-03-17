import { Pressable, StyleSheet, Text, View } from "react-native";

import { Todo } from "@/types/todo";
import { useEffect } from "react";

type TodoCardProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoCard({ todo, onToggle, onDelete }: TodoCardProps) {

  useEffect(() => {
      console.log("Montei card " + todo.id);
      return () => {
        console.log("desmontei ")
      }
    }, []);
  
  return (
    <View style={[styles.card, todo.completed && styles.cardCompleted]}>
      <View style={styles.content}>
        <View
          style={[styles.statusDot, todo.completed && styles.statusDotCompleted]}
        />
        <View style={styles.textBlock}>
          <Text style={[styles.title, todo.completed && styles.textCompleted]}>
            {todo.title}
          </Text>
          <Text
            style={[
              styles.description,
              todo.completed && styles.descriptionCompleted,
            ]}
          >
            {todo.description}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.actionButton, styles.primaryAction]}
          onPress={() => onToggle(todo.id)}
        >
          <Text style={styles.primaryActionText}>
            {todo.completed ? "Undo" : "Done"}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, styles.secondaryAction]}
          onPress={() => onDelete(todo.id)}
        >
          <Text style={styles.secondaryActionText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    gap: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardCompleted: {
    backgroundColor: "#F0FDFA",
    borderColor: "#99F6E4",
  },
  content: {
    flexDirection: "row",
    gap: 12,
  },
  statusDot: {
    width: 14,
    height: 14,
    marginTop: 4,
    borderRadius: 999,
    backgroundColor: "#CBD5E1",
  },
  statusDotCompleted: {
    backgroundColor: "#14B8A6",
  },
  textBlock: {
    flex: 1,
    gap: 6,
  },
  title: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "700",
  },
  textCompleted: {
    textDecorationLine: "line-through",
    color: "#134E4A",
  },
  description: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },
  descriptionCompleted: {
    color: "#0F766E",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 12,
  },
  primaryAction: {
    backgroundColor: "#0F172A",
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  secondaryAction: {
    backgroundColor: "#FEE2E2",
  },
  secondaryActionText: {
    color: "#B91C1C",
    fontWeight: "700",
    fontSize: 14,
  },
});
