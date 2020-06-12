import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="ios-arrow-round-back" size={32} color="#ef6c35" />
    </TouchableOpacity>
  );
};

export default BackButton;
