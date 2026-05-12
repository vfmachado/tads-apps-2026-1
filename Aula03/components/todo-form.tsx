import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type TodoFormProps = {
  title: string;
  description: string;
  onChangeTitle: Dispatch<SetStateAction<string>>;
  onChangeDescription: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
};

export function TodoForm({
  title,
  description,
  onChangeTitle,
  onChangeDescription,
  onSubmit,
}: TodoFormProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Plan the day</Text>
      <Text style={styles.heading}>Todo list</Text>
      <Text style={styles.caption}>
        Add a short task and keep the important work visible.
      </Text>

      <TextInput
        placeholder="Task title"
        placeholderTextColor="#7B8794"
        style={styles.input}
        value={title}
        onChangeText={onChangeTitle}
      />

      <TextInput
        placeholder="Task details"
        placeholderTextColor="#7B8794"
        style={[styles.input, styles.textarea]}
        value={description}
        onChangeText={onChangeDescription}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />

      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Add task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FAFC",
    borderRadius: 24,
    padding: 20,
    gap: 12,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  eyebrow: {
    color: "#0F766E",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  heading: {
    color: "#0F172A",
    fontSize: 28,
    fontWeight: "800",
  },
  caption: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#0F172A",
  },
  textarea: {
    minHeight: 96,
  },
  button: {
    backgroundColor: "#0F766E",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
