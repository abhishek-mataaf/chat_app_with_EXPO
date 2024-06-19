// app/_layout.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpComp from './components/SignUpComp';
import LoginComp from './components/LoginComp';
import Main from './components/StartPage'
import HomePage from './components/HomePage';
import FrontPage from './components/FrontPage';
import ChatScreen from './components/ChatScreen';
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
      <Stack.Screen
        name="components/FrontPage"
        component={FrontPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="components/ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  );
}
