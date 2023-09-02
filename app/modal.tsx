import { useLocalSearchParams } from "expo-router";
import ModalContainer from "../components/ModalContainer";

export default function ModalScreen() {
  const { expression, title } = useLocalSearchParams();
  return <ModalContainer expression={expression} title={title} />;
}
