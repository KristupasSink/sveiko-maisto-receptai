import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Kategorijos", headerTitleAlign: "center" }} />
      <Stack.Screen name="[category]" options={{ title: "Receptai", headerTitleAlign: "center" }} />
      <Stack.Screen name="recipe/[id]" options={{ title: "Receptas", headerTitleAlign: "center" }} />
    </Stack>
  );
}
