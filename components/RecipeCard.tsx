import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <Link href={`/recipe/${recipe.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.title}>{recipe.title}</Text>
        
        {/* Aprašymas */}
        {recipe.description && (
          <Text style={styles.description}>{recipe.description}</Text>
        )}

        {/* Papildoma info */}
        <View style={styles.metaBox}>
          {recipe.time && (
            <Text style={styles.meta}>⏱ {recipe.time}</Text>
          )}
          {recipe.servings && (
            <Text style={styles.meta}>👨‍👩‍👧‍👦 {recipe.servings} porc.</Text>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fbc687", // šilta oranžinė
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  metaBox: {
    flexDirection: "row",
    gap: 12,
  },
  meta: {
    fontSize: 13,
    color: "#4b2c82",
    fontWeight: "600",
  },
});
