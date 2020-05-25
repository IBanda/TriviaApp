import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Image } from 'react-native-elements';
const Book = (props) => {
  const { imageSrc, title, authors } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: imageSrc }}
        PlaceholderContent={
          <ActivityIndicator color={'#f4f4f4'} size={'small'} />
        }
      />
      <View style={styles.details}>
        <View>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.text}>{title}</Text>
        </View>
        {authors && (
          <View>
            <Text style={styles.title}>{`Author${
              authors.length > 1 ? 's' : ''
            }`}</Text>
            {authors.map((author, idx) => (
              <Text key={idx}>{author}</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
    paddingVertical: 5,
  },
  details: {
    paddingRight: 5,
  },
  image: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    marginRight: 10,
    borderColor: '#f4f4f4',
    borderWidth: 1,
  },
  title: {
    fontWeight: '600',
    marginRight: 5,
  },
  text: {
    maxWidth: '80%',
    minWidth: '50%',
  },
});
export default Book;
