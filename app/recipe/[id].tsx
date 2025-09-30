import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { recipes } from "../../data/recipes";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";

export default function RecipePage() {
  const { id } = useLocalSearchParams();
  const recipe = recipes.find((r) => r.id === id);
  const [reload, setReload] = React.useState(false);

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text>Receptas nerastas</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Pavadinimas */}
      <Text style={styles.title}>{recipe.title}</Text>

      {/* Aprašymas */}
      {recipe.description && (
        <Text style={styles.description}>{recipe.description}</Text>
      )}

      {/* Meta informacija */}
      <View style={styles.metaBox}>
        {recipe.time && <Text style={styles.meta}>⏱ {recipe.time}</Text>}
        {recipe.servings && (
          <Text style={styles.meta}>👨‍👩‍👧‍👦 {recipe.servings} porc.</Text>
        )}
      </View>

      {/* Ingredientai */}
      <Text style={styles.sectionTitle}>Ingredientai:</Text>
      <View style={styles.listContainer}>
        {recipe.ingredients.map((i, idx) => (
          <Text key={idx} style={styles.listItem}>
            • {i}
          </Text>
        ))}
      </View>

      {/* Paruošimas */}
      <Text style={styles.sectionTitle}>Paruošimas:</Text>
      {Array.isArray(recipe.instructions) ? (
        recipe.instructions.map((step, idx) => (
          <Text key={idx} style={styles.instructions}>
            {idx + 1}. {step}
          </Text>
        ))
      ) : (
        <Text style={styles.instructions}>{recipe.instructions}</Text>
      )}

      {/* Komentarai */}
      <Text style={styles.sectionTitle}>Komentarai:</Text>
      <CommentList recipeId={recipe.id} key={reload ? 1 : 0} />
      <CommentForm recipeId={recipe.id} onCommentAdded={() => setReload(!reload)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f7f6fb",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4b2c82",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 12,
    textAlign: "center",
  },
  metaBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 16,
  },
  meta: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b2c82",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  listContainer: {
    paddingLeft: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 22,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 6,
  },
});
