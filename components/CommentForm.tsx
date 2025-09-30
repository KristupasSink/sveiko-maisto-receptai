import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    recipeId: string;
    onCommentAdded?: () => void; 
};

export default function CommentForm({ recipeId, onCommentAdded }: Props) {
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        if (!comment) return;

        const stored = await AsyncStorage.getItem(`comments_${recipeId}`);
        const comments = stored ? JSON.parse(stored) : [];
        comments.push(comment);
        await AsyncStorage.setItem(`comments_${recipeId}`, JSON.stringify(comments));
        setComment("");

        if (onCommentAdded) onCommentAdded();
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Parašyk komentarą"
                style={styles.input}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Siųsti</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        width: "100%",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#4b2c82",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
