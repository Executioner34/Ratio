const getRandomValue = () => {
	const min = 1;
	const max = 100;
	const randomValue = Math.floor(Math.random() * (max - min) + min);
	return (randomValue <= 90) ? 2 : 4
}

export {getRandomValue}