import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "../contexts/auth-context";
import { usePostStorage } from "../contexts/post-storage";
import { postComposerStyles as styles } from "../styles/shared-styles";

export function PostComposer() {
  const { isAuthenticated } = useAuth();
  const { createPost, isCreating } = usePostStorage();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isCapturingPhoto, setIsCapturingPhoto] = useState(false);

  function updatePhotoFromResult(result: ImagePicker.ImagePickerResult) {
    if (!result.canceled && result.assets[0]?.uri) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  async function handleChoosePhoto() {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissao necessaria",
          "Autorize o acesso a galeria para escolher uma foto."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: "images",
        quality: 0.7,
      });

      updatePhotoFromResult(result);
    } catch (error) {
      Alert.alert(
        "Falha ao abrir a galeria",
        error instanceof Error
          ? error.message
          : "Nao foi possivel escolher uma foto agora."
      );
    }
  }

  async function handleTakePhoto() {
    setIsCapturingPhoto(true);

    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissao necessaria",
          "Autorize o uso da camera para anexar uma foto ao post."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: "images",
        quality: 0.7,
      });

      updatePhotoFromResult(result);
    } catch (error) {
      console.error("Falha ao abrir a camera", error);

      const message =
        error instanceof Error ? error.message.toLowerCase() : "";

      if (
        message.includes("simulator") ||
        message.includes("not available") ||
        message.includes("unavailable")
      ) {
        Alert.alert(
          "Camera indisponivel",
          "A camera nao esta disponivel neste ambiente. Voce pode escolher uma foto da galeria.",
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Abrir galeria",
              onPress: () => {
                void handleChoosePhoto();
              },
            },
          ]
        );
        return;
      }

      Alert.alert(
        "Falha ao abrir a camera",
        error instanceof Error
          ? error.message
          : "Nao foi possivel tirar a foto agora."
      );
    } finally {
      setIsCapturingPhoto(false);
    }
  }

  async function handlePublish() {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Campos obrigatorios", "Preencha titulo e conteudo do post.");
      return;
    }

    try {
      await createPost({
        title,
        body,
        photoUri,
      });

      setTitle("");
      setBody("");
      setPhotoUri(null);
    } catch (error) {
      Alert.alert(
        "Publicacao indisponivel",
        error instanceof Error
          ? error.message
          : "Nao foi possivel publicar o post."
      );
    }
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.blockedPanel}>
        <Text style={styles.title}>Criar postagem</Text>
        <Text style={styles.description}>
          Faca login para publicar no feed e anexar uma foto tirada na hora.
        </Text>
      </View>
    );
  }

  const isBusy = isCreating || isCapturingPhoto;

  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Nova postagem</Text>
      <Text style={styles.description}>
        O post e enviado para a API externa e salvo no contexto global do app.
      </Text>

      <TextInput
        editable={!isBusy}
        onChangeText={setTitle}
        placeholder="Titulo do post"
        style={styles.input}
        value={title}
      />

      <TextInput
        editable={!isBusy}
        multiline
        numberOfLines={4}
        onChangeText={setBody}
        placeholder="O que voce quer compartilhar?"
        style={[styles.input, styles.textArea]}
        textAlignVertical="top"
        value={body}
      />

      {photoUri ? (
        <View style={styles.previewCard}>
          <Image contentFit="cover" source={{ uri: photoUri }} style={styles.previewImage} />

          <Pressable
            disabled={isBusy}
            onPress={() => setPhotoUri(null)}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.pressedButton,
              isBusy && styles.disabledButton,
            ]}
          >
            <Text style={styles.secondaryButtonText}>Remover foto</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.actionsRow}>
        <Pressable
          disabled={isBusy}
          onPress={handleTakePhoto}
          style={({ pressed }) => [
            styles.secondaryButton,
            styles.actionButton,
            pressed && styles.pressedButton,
            isBusy && styles.disabledButton,
          ]}
        >
          {isCapturingPhoto ? (
            <ActivityIndicator color="#1D4ED8" />
          ) : (
            <Text style={styles.secondaryButtonText}>Tirar foto</Text>
          )}
        </Pressable>

        <Pressable
          disabled={isBusy}
          onPress={() => {
            void handleChoosePhoto();
          }}
          style={({ pressed }) => [
            styles.secondaryButton,
            styles.actionButton,
            pressed && styles.pressedButton,
            isBusy && styles.disabledButton,
          ]}
        >
          <Text style={styles.secondaryButtonText}>Escolher foto</Text>
        </Pressable>

        <Pressable
          disabled={isBusy}
          onPress={handlePublish}
          style={({ pressed }) => [
            styles.primaryButton,
            styles.actionButton,
            styles.submitButton,
            pressed && styles.pressedButton,
            isBusy && styles.disabledButton,
          ]}
        >
          {isCreating ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Publicar</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
