import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#201b2e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: '📐 UniKalkulus',
          headerShown: true
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Login',
          presentation: 'modal'
        }} 
      />
      <Stack.Screen 
        name="material" 
        options={{ 
          title: 'Materi Pembelajaran'
        }} 
      />
      <Stack.Screen 
        name="quiz" 
        options={{ 
          title: 'Quiz Kalkulus'
        }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          title: 'Profil Saya'
        }} 
      />
    </Stack>
  );
}
