import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Layout from './app/_layout';
import { UserProvider } from './app/components/UserContext';

export default function App() {
  return (
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
  );
}