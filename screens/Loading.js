import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-trivia.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 270,
    height: 70,
  },
});
