export const getNumberOfRemainingWords = (
  includedWords: number,
  foundWords: number
) => {
  return Math.ceil(0.1 * includedWords) - foundWords;
};
