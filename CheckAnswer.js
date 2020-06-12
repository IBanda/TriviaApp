import { Audio } from 'expo-av';
const CheckAnswer = async (userAnswer, actualAnswer, fn) => {
  const soundObject = new Audio.Sound();
  if (userAnswer.toLowerCase().trim() === actualAnswer.toLowerCase().trim()) {
    try {
      await soundObject.loadAsync(
        require('./assets/sounds/Announcer_Saying_Correct.mp3')
      );
      await soundObject.playAsync();
      fn();
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      await soundObject.loadAsync(require('./assets/sounds/Wrong_Answer.mp3'));
      await soundObject.playAsync();
    } catch (error) {}
  }
};

export default CheckAnswer;
