import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button, Counter, QA_Wrapper } from '../components/Components';
import CheckAnswer from '../CheckAnswer';
import { dataCleaner, getRandomIndex } from '../util/Utils';
import { primary } from '../constants/Color';

const viewedQuestionIndex = new Set();

const Game = ({ route, navigation }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAns, setShowState] = useState(false);
  const [isGameOn, setGameState] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isKeyboardOpen, setKeyboardState] = useState(false);
  const [isNextCall, setNextCall] = useState(false);
  const { id, title } = route.params;
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const Controller = new AbortController();
    const { signal } = Controller;
    fetch(`http://jservice.io/api/category/?id=${id}`, { signal })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(dataCleaner(data.clues));
        setIndex(getRandomIndex(data.clues.length - 1, 0));
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log(error.name, error.message);
          return;
        }
        Alert.alert('Error', error.message, [
          { text: 'ok', onPress: () => navigation.navigate('Home') },
        ]);
      })
      .finally(() => setLoading(false));

    return () => {
      Controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const question = questions.length ? questions[index].question : null;
  const answer = questions.length ? questions[index].answer : null;

  const handleNext = () => {
    const lastIndex = questions.length - 1;
    setIndex(getNextQuestion(lastIndex, 0));
    setShowState(false);
    setNextCall(true);
    setGameState(true);
    setUserAnswer('');
  };
  const handleAnswerShow = () => {
    setNextCall(false);
    setShowState(true);
    setGameState(false);
  };

  const getNextQuestion = (last, first) => {
    const randomIndex = getRandomIndex(last, first);
    if (viewedQuestionIndex.size === questions.length) {
      navigation.navigate('Modal', { category: title });
      return 0;
    }
    if (viewedQuestionIndex.has(randomIndex)) {
      getNextQuestion(last, first);
    }
    viewedQuestionIndex.add(randomIndex);
    return randomIndex;
  };

  const handleNextCall = () => setNextCall(false);
  const handleSubmit = async () => {
    CheckAnswer(userAnswer, answer, handleNext);
  };

  const handleKeyboard = () => {
    setKeyboardState((prevState) => !prevState);
  };
  const _keyboardVerticalOffset = () => {
    const OS = Platform.OS === 'ios';
    if (!isKeyboardOpen) {
      return 0;
    }
    return OS ? (Dimensions.get('window').width > 320 ? 150 : 250) : 0;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      keyboardVerticalOffset={_keyboardVerticalOffset()}
      enabled
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={primary} />
      ) : (
        <>
          <Counter
            showAnswer={handleAnswerShow}
            isNextCall={isNextCall}
            handleNextCall={handleNextCall}
            gameOn={isGameOn}
          />
          <View style={styles.qaHolder}>
            <QA_Wrapper title={'Question'}>
              <Text style={styles.question}>{question}</Text>
            </QA_Wrapper>
            <QA_Wrapper title="Answer">
              {showAns ? (
                <Text style={styles.question}>{answer}</Text>
              ) : (
                <Text style={styles.answerPlaceholder}>XXXX</Text>
              )}
              <TouchableWithoutFeedback
                onPress={handleAnswerShow}
                style={styles.toggleAns}
              >
                <Ionicons name="ios-eye" size={20} />
              </TouchableWithoutFeedback>
            </QA_Wrapper>
            <TextInput
              style={styles.input}
              placeholder={'Type your answer'}
              onFocus={handleKeyboard}
              onBlur={handleKeyboard}
              value={userAnswer}
              onChangeText={(text) => setUserAnswer(text)}
            />

            <Button onPress={handleSubmit} buttonText={'Answer'} />
            <Button onPress={handleNext} buttonText={'Next'} />
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableWithoutFeedback: {
    height: '100%',
    width: '100%',
  },
  qaHolder: {
    justifyContent: 'center',
    width: '90%',
    height: Dimensions.get('window').height / 1.5,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
  question: {
    fontWeight: '400',
    color: primary,
  },
  input: {
    borderWidth: 1,
    borderColor: '#709fb0',
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    marginVertical: 20,
    color: primary,
  },
  answerPlaceholder: {
    color: primary,
  },
  toggleAns: {
    width: 50,
    alignItems: 'flex-end',
  },
});

export default Game;
