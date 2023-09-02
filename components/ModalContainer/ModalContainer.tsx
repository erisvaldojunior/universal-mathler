import React from "react";

import { Button } from "react-native";
import { router } from "expo-router";
import { MonoText } from "../StyledText";
import { ThemedText, ThemedView } from "../Themed";
import styles from "./styles";

export default function ModalContainer({
  expression,
  title,
}: {
  expression: string | string[];
  title: string | string[];
}) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedView style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ThemedView>
        <ThemedView style={styles.getStartedContainer}>
          <ThemedText
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            The expression was
          </ThemedText>
          <ThemedView
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            darkColor="rgba(255,255,255,0.05)"
            lightColor="rgba(0,0,0,0.05)">
            <MonoText>{expression}</MonoText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button
        onPress={() => {
          router.back();
        }}
        title="Go Back"
      />
    </ThemedView>
  );
}
