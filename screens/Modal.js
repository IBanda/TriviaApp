import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Components';
export default function Modal({ route, navigation }) {
  const { category } = route.params;
  const handleNavigate = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Congratulations</Text>
      <Text style={styles.text}>
        You've just completed the {category} category
      </Text>
      <Button buttonText="Go Home" onPress={handleNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  text: {
    color: '#000',
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
});
