import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { Dimensions } from 'react-native';
import { primary } from '../constants/Color';
const Counter = ({ showAnswer, gameOn, isNextCall, handleNextCall }) => {
  const [time, setTime] = useState(60);
  useEffect(() => {
    let interval;
    if (isNextCall) {
      setTime(60);
    }
    if (time && gameOn) {
      interval = setInterval(() => setTime((prevState) => prevState - 1), 1000);
      if (isNextCall) {
        handleNextCall();
      }
    } else {
      if (!time) {
        playSound();
        showAnswer();
      }
      setTime(60);
    }
    return () => clearInterval(interval);
  });
  const playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/sounds/Wrong_Answer.mp3'));
      await soundObject.playAsync();
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <View style={styles.counterWrapper}>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  counterWrapper: {
    width: 60,
    height: 60,
    borderColor: primary,
    borderWidth: 5,
    backgroundColor: '#fff',
    borderRadius: 400,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  counter: {
    height: Dimensions.get('window').height < 800 ? 50 : 25,
    backgroundColor: '#fff',
  },
  time: {
    fontSize: 20,
    color: primary,
  },
});

export default Counter;
