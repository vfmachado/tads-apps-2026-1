import { Image } from "expo-image";
import { Text, View } from "react-native";

import { postCardStyles as styles } from "../styles/shared-styles";
import { AppPost } from "../types/post";

type Props = {
  post: AppPost;
};

function getInitials(name: string) {
  const letters = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return letters || "PO";
}

export function PostCard({ post }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(post.authorName)}</Text>
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.author}>{post.authorName}</Text>
          <Text style={styles.meta}>{post.createdAt}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content}>{post.body}</Text>
      </View>

      {post.photoUri ? (
        <Image contentFit="cover" source={{ uri: post.photoUri }} style={styles.photo} />
      ) : null}
    </View>
  );
}
