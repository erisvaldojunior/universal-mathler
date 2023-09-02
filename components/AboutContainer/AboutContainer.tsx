import React from "react";

import { MonoText } from "../StyledText";
import { ThemedText, ThemedView } from "../Themed";
import styles from "./styles";

export default function AboutContainer() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Universal Mathler</ThemedText>
      <ThemedView style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ThemedView>
        <ThemedView style={styles.getStartedContainer}>
          <ThemedText
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            Created by
          </ThemedText>
          <ThemedView
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            darkColor="rgba(255,255,255,0.05)"
            lightColor="rgba(0,0,0,0.05)">
            <MonoText>Erisvaldo Junior</MonoText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </ThemedView>
  );
}
