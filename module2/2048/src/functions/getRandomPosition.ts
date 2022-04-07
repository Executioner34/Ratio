const getRandomPosition = (max: number) => {
  const min = 1;
  return Math.floor(Math.random() * (max) + min);
};

export { getRandomPosition };
