import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Loading, Game, Home, Modal } from './screens/Screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { primary } from './constants/Color';
const Stack = createStackNavigator();
const RootStack = createStackNavigator();
export default function App() {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoad(false), 1000);
  }, []);
  if (load) {
    return <Loading />;
  }

  const MainStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: primary,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Game"
        component={Game}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );

  const DARK_CONTENT = 'dark-content';
  const LIGHT_CONTENT = 'light-content';
  const ContentColor = Platform.OS === 'android' ? LIGHT_CONTENT : DARK_CONTENT;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={ContentColor} />
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Main"
            component={MainStack}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Modal"
            component={Modal}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
