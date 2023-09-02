import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  keyboardContainer: {
    alignSelf: "stretch",
  },
  row: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  keyButton: {
    alignItems: "center",
    backgroundColor: "lightgray",
    borderRadius: 5,
    flex: 1,
    height: 40,
    maxWidth: 80,
    justifyContent: "center",
    marginBottom: 16,
  },
  keyText: {
    color: "black",
    fontSize: 18,
  },
});

export default styles;
