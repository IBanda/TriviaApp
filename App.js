import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Home, Login } from './screens/Screens';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
