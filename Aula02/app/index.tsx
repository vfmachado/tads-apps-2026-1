import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { TodoCard } from "@/components/todo-card";
import { TodoForm } from "@/components/todo-form";
import { initialTodos } from "@/data/todos";
import { Todo } from "@/types/todo";

export default function Index() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
    
  useEffect(() => {
    console.log("Montei")
  }, []);

  const handleAddTodo = () => {
    if (!title.trim()) {
      Alert.alert("Missing title", "Type a task title before adding it.");
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || "No extra details for this task.",
      completed: false,
    };

    setTodos((currentTodos) => [newTodo, ...currentTodos]);
    setTitle("");
    setDescription("");
  };

  const handleToggleTodo = (id: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <TodoForm
                title={title}
                description={description}
                onChangeTitle={setTitle}
                onChangeDescription={setDescription}
                onSubmit={handleAddTodo}
              />

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your tasks</Text>
                <Text style={styles.sectionSubtitle}>
                  {todos.length} item{todos.length === 1 ? "" : "s"} in the list
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <TodoCard
              todo={item}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No tasks yet</Text>
              <Text style={styles.emptyText}>
                Add your first task using the form above.
              </Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E6FFFB",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  header: {
    gap: 22,
    marginBottom: 18,
  },
  sectionHeader: {
    gap: 4,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: "#475569",
    fontSize: 14,
  },
  separator: {
    height: 14,
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#D9E2EC",
  },
  emptyTitle: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "700",
  },
  emptyText: {
    color: "#64748B",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
