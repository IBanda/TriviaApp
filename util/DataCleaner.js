const dataCleaner = (array) => {
  const regex = /<\/?.>/gm;
  const matchColony = /:$/gm;
  return array
    .filter(
      (item) =>
        item.question && item.answer && !matchColony.test(item.question.trim())
    )
    .map((item) => {
      if (regex.test(item.question)) {
        item.question = item.question.replace(regex, '').trim();
      }
      if (regex.test(item.answer)) {
        item.answer = item.answer.replace(regex, '').trim();
      }
      return item;
    });
};

export default dataCleaner;
