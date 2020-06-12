import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { CategoryCard } from '../components/Components';
import categories from './categories';
const Home = ({ navigation }) => {
  const _renderItem = ({ item }) => (
    <CategoryCard
      navigation={navigation}
      title={item.title}
      background={item.background}
      id={item.id}
      src={item.image}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.title}
        numColumns={2}
        data={categories}
        renderItem={_renderItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default Home;
