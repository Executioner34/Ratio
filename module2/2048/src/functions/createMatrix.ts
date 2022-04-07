function createMatrix(num: number) {
	const arr = [];
	for (let i = 0; i < num; i++) {
		arr.push(new Array(num))
	}
	return arr
}

export {createMatrix};