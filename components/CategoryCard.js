import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';

const CategoryCard = (props) => {
  const { navigation, background, id, title, src } = props;
  const backgroundColor = {
    backgroundColor: background,
  };

  const handlePress = () => {
    navigation.navigate('Game', { id, title });
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.touchOpacity}>
      <ImageBackground style={[styles.container, backgroundColor]} source={src}>
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  touchOpacity: {
    width: '49%',

    marginVertical: 5,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  title: {
    fontWeight: '600',
    color: '#fff',
  },
});
export default CategoryCard;
