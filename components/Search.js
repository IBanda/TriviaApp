import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Book from './Book';

const Search = () => {
  const [books, setBooks] = useState({});
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  const [queryString, setQueryString] = useState('');
  const onSearch = () => {
    if (!search) {
      return;
    }
    setQueryString(search);
  };
  useEffect(() => {
    console.log('run');
    if (queryString) {
      setLoader(true);
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryString}`)
        .then((response) => response.json())
        .then((data) => setBooks(data))
        .catch((error) => console.error(error))
        .finally(() => setLoader(false));
    }
  }, [queryString]);
  const bookList = () => {
    if (queryString) {
      return (
        <FlatList
          data={books.items}
          renderItem={({ item }) => {
            const { volumeInfo } = item;
            const bookProps = {
              title: volumeInfo.title,
              imageSrc: volumeInfo.imageLinks.thumbnail,
              ratingsCount: volumeInfo.ratingsCount,
              averageRating: volumeInfo.averageRating,
              authors: volumeInfo.authors,
            };
            return <Book {...bookProps} />;
          }}
        />
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Find a book"
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />
      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text style={styles.searchBtnText}>Search</Text>
      </TouchableOpacity>
      {loader && <ActivityIndicator size={'small'} color={'#00909e'} />}
      {bookList()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 50,
  },
  input: {
    borderColor: '#00909e',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 5,
    fontSize: Platform.OS === 'ios' ? 20 : 16,
  },
  button: {
    backgroundColor: '#00909e',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  searchBtnText: {
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 20 : 16,
  },
});

export default Search;
