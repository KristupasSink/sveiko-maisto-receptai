import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import CustomButton from "../components/CustomButton";

const categories = [
  { key: "sriubos", title: "🥣 Sriubos" },
  { key: "desertai", title: "🍰 Desertai" },
  { key: "pagrindiniai", title: "🍗 Pagrindiniai patiekalai" },
];

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pasirinkite kategoriją</Text>

      <View style={styles.buttonContainer}>
        {categories.map((c) => (
          <Link key={c.key} href={`/${c.key}`} asChild>
            <CustomButton title={c.title} />
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f6fb",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4b2c82",
    marginBottom: 24,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
    alignItems: "center",
  },
});
