// app/_layout.tsx
import { Stack, usePathname } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  const pathname = usePathname();
  console.log(pathname);
  
  const showHeader = false; // Adjust the condition based on your needs

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: showHeader }} />
    </View>
  );
}
