import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const QA_Wrapper = ({ children, title }) => {
  let extraStye = {};
  if (title === 'Answer') {
    extraStye = styles.answerHolder;
  }
  return (
    <View>
      <Text style={styles.title}>{title}:</Text>
      <View style={[styles.qa, extraStye]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  qa: {
    backgroundColor: '#e0dede',
    padding: 10,
    justifyContent: 'center',
    marginBottom: 10,
    minHeight: 50,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  answerHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontWeight: '400',
    fontSize: 15,
    marginBottom: 5,
    color: '#e0dede',
  },
});
export default QA_Wrapper;
