import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function AppLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack>
      {/* Public routes - only accessible when NOT authenticated */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Protected routes - only accessible when authenticated */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Index route - always accessible, handles initial routing */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
