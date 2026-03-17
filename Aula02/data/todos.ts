import { Todo } from "@/types/todo";

export const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Prepare the class notes",
    description: "Review the main React Native concepts before tomorrow.",
    completed: false,
  },
  {
    id: "2",
    title: "Organize the study session",
    description: "Separate examples and define the exercises for the group.",
    completed: true,
  },
  {
    id: "3",
    title: "Update the app prototype",
    description: "Refine spacing, colors, and card hierarchy on the main screen.",
    completed: false,
  },
];
