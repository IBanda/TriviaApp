import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { primary } from '../constants/Color';
const Button = ({ onPress, buttonText }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <Text style={styles.btnText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    paddingVertical: Dimensions.get('window').height > 600 ? 20 : 15,
    backgroundColor: primary,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  btnText: {
    color: '#fff',
    textTransform: 'uppercase',
  },
});
export default Button;
