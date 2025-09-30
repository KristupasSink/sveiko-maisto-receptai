import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    recipeId: string;
};

export default function CommentList({ recipeId }: Props) {
    const [comments, setComments] = useState<string[]>([]);

    const loadComments = async () => {
        const stored = await AsyncStorage.getItem(`comments_${recipeId}`);
        setComments(stored ? JSON.parse(stored) : []);
    };

    useEffect(() => {
        loadComments();
    }, []);

    const handleDelete = async (index: number) => {
        const updated = [...comments];
        // komentaro salinismas vienas
        updated.splice(index, 1);
        setComments(updated);
        await AsyncStorage.setItem(`comments_${recipeId}`, JSON.stringify(updated));
    };

    if (comments.length === 0) {
        return <Text>Dar nėra komentarų</Text>;
    }

    return (
        <View style={styles.container}>
            {comments.map((comment, idx) => (
                <View key={idx} style={styles.commentRow}>
                    <Text style={styles.commentText}>{comment}</Text>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDelete(idx)}
                    >
                        <Text style={styles.deleteText}>Ištrinti</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    commentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#e7def5",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 8,
    },
    commentText: {
        fontSize: 16,
        color: "#333",
        flex: 1,
        marginRight: 12,
    },
    deleteButton: {
        backgroundColor: "#ff4d4d",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    deleteText: {
        color: "#fff",
        fontWeight: "600",
    },
});
