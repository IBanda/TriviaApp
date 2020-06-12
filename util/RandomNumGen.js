const getRandomIndex = (max, min) => {
  const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
  return randomIndex;
};

export default getRandomIndex;
