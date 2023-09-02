import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  activeRow: {
    borderColor: "yellow",
    borderWidth: 3,
  },
  cell: {
    alignItems: "center",
    borderRadius: 4,
    justifyContent: "center",
    width: 40,
    height: 40,
    borderWidth: 2,
  },
  container: {
    gap: 16,
  },
  correctCell: {
    backgroundColor: "green",
  },
  foundCell: {
    backgroundColor: "yellow",
  },
  gridContainer: {
    alignItems: "center",
    gap: 4,
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  notEvaluatedCell: {
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    gap: 4,
  },
  title: {
    textAlign: "center",
  },
  wrongCell: {
    backgroundColor: "gray",
  },
});

export default styles;
