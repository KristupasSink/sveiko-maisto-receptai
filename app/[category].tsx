import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { recipes } from "../data/recipes";
import CustomButton from "../components/CustomButton";

export default function Category() {
    const { category } = useLocalSearchParams();
    const categoryName = category ? category.toString() : "";

    const filtered = recipes.filter((r) => r.category === categoryName);

    if (filtered.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>Nerasta receptų šiai kategorijai</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                {categoryName
                    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                    : ""}
            </Text>

            <View style={styles.buttonContainer}>
                {filtered.map((recipe) => (
                    <Link key={recipe.id} href={`/recipe/${recipe.id}`} asChild>
                        <CustomButton title={recipe.title} />
                    </Link>
                ))}
            </View>
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
        fontSize: 24,
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
        marginTop: 20,
    },
});
