// app/_layout.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpComp from './components/SignUpComp';
import LoginComp from './components/LoginComp';
import Main from './components/StartPage'
import HomePage from './components/HomePage';
const Stack = createNativeStackNavigator()

export default function Layout() {


  return (
    <Stack.Navigator>
      <Stack.Screen
        name="index"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="components/HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  );
}
