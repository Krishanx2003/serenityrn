import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}