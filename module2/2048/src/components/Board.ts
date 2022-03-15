import { BoardInterface } from '../types/globalInterfaces';
import { createElement } from '../functions/createElement';
import { getRandomPosition } from '../functions/getRandomPosition';
import { getRandomValue } from '../functions/getRandomValue';
import { createMatrix } from '../functions/createMatrix';
import { Tile } from './Tile';
import MakeObservableSubject from './Observer'

class Board implements BoardInterface {
	size!: number;
	board!: HTMLDivElement;
	positionData!: { top: number; left: number }[];
	matrix: { id: number; value: number; top: number; left: number; tileElem: Tile }[][];
	Tile!: Tile;
	subject!: MakeObservableSubject;
	counterTiles: number;
	total: number

	constructor(parent: HTMLDivElement, size: number, positionData: { top: number; left: number }[]) {
		this.size = size;
		this.counterTiles = 1;
		this.positionData = positionData;
		this.matrix = createMatrix(size);
		this.total = 0;
		this.subject = new MakeObservableSubject()
		this.init(parent);
	}

	private init(parent: HTMLDivElement) {
		this.createBoard(parent);
		this.createRandomTile();
		this.createRandomTile();
		this.arrowMove = this.arrowMove.bind(this);
		document.addEventListener('keydown', this.arrowMove);
		this.updateScores()
	}

	private createBoard(parent: HTMLDivElement) {
		const board = createElement('div', 'board-container');
		const grid = parent.querySelector('.grid');
		board.style.width = `${grid?.clientWidth}px`;
		parent.appendChild(board);
		this.board = parent.querySelector('.board-container')!;
	}

	private createRandomTile() {
		const randomValue = getRandomValue();
		const randomPositionOnRow = getRandomPosition(this.size);
		const randomPositionOnColumn = getRandomPosition(this.size);
		const randomPositionInData = randomPositionOnRow * this.size - this.size + (randomPositionOnColumn - 1);
		if (this.matrix[randomPositionOnRow - 1][randomPositionOnColumn - 1] === undefined) {
			this.matrix[randomPositionOnRow - 1][randomPositionOnColumn - 1] = {
				id: this.counterTiles,
				value: randomValue,
				...this.positionData[randomPositionInData],
				tileElem: new Tile(this.board, {
					value: randomValue,
					id: this.counterTiles,
					left: this.positionData[randomPositionInData].left,
					top: this.positionData[randomPositionInData].top,
				}),
			};
			this.counterTiles = this.counterTiles + 1;
		} else {
			this.createRandomTile();
		}
	}

	private arrowMove(e: KeyboardEvent) {
		
		switch (e.code) {
			case 'ArrowDown':
				e.preventDefault();
				this.tilesMoveDown();
				this.createRandomTile();
				this.createRandomTile();
				break;
			case 'ArrowUp':
				e.preventDefault();
				this.tilesMoveUp();
				this.createRandomTile();
				this.createRandomTile();
				break;
			case 'ArrowLeft':
				e.preventDefault();
				this.tilesMoveLeft();
				this.createRandomTile();
				this.createRandomTile();
				break;
			case 'ArrowRight':
				e.preventDefault();
				this.tilesMoveRight();
				this.createRandomTile();
				this.createRandomTile();
				break;
		}
		this.updateScores()
	}

	private tilesMoveDown() {
		for (let arr of this.matrix) {
			let isMerge = false;
			for (let j = arr.length - 1; j > 0; j--) {
				for (let i = 0; i <= arr.length - 1; i++) {
					if (this.matrix[j - 1][i] && this.matrix[j][i] === undefined) {
						let swap = this.matrix[j - 1][i];
						this.matrix[j - 1][i] = this.matrix[j][i];
						swap.top = this.positionData[(j + 1) * this.size - this.size + i].top;
						this.matrix[j][i] = swap;
					} else if (
						this.matrix[j - 1][i] &&
						this.matrix[j][i] &&
						this.matrix[j - 1][i].value === this.matrix[j][i].value &&
						isMerge === false
					) {
						this.matrix[j][i].value = this.matrix[j][i].value + this.matrix[j - 1][i].value;
						this.matrix[j - 1][i].tileElem.destroy();
						delete this.matrix[j - 1][i];
						isMerge = true;
					}
				}
			}
		}
		this.updateTiles();
		console.log(this.matrix);
	}

	private tilesMoveUp() {
		for (let arr of this.matrix) {
			let isMerge = false;
			for (let j = 1; j <= arr.length - 1; j++) {
				for (let i = 0; i <= arr.length - 1; i++) {
					if (this.matrix[j][i] && this.matrix[j - 1][i] === undefined) {
						let swap = this.matrix[j][i];
						this.matrix[j][i] = this.matrix[j - 1][i];
						swap.top = this.positionData[j * this.size - this.size + i].top;
						this.matrix[j - 1][i] = swap;
					} else if (
						this.matrix[j - 1][i] &&
						this.matrix[j][i] &&
						this.matrix[j - 1][i].value === this.matrix[j][i].value &&
						isMerge === false
					) {
						this.matrix[j - 1][i].value = this.matrix[j][i].value + this.matrix[j - 1][i].value;
						this.matrix[j][i].tileElem.destroy();
						delete this.matrix[j][i];
						isMerge = true;
					}
				}
			}
		}
		this.updateTiles();
		console.log(this.matrix);
	}

	private tilesMoveLeft() {
		this.matrix.forEach((arr, index) => {
			let isMerge = false;
			for (let j = 0; j <= arr.length - 1; j++) {
				for (let i = 0; i <= arr.length - 1; i++) {
					if (arr[i + 1] && arr[i] === undefined) {
						let swap = arr[i + 1];
						arr[i + 1] = arr[i];
						swap.left = this.positionData[index * this.size + i].left;
						arr[i] = swap;
					} else if (arr[i] && arr[i + 1] && arr[i].value === arr[i + 1].value && isMerge === false) {
						arr[i].value = arr[i + 1].value + arr[i].value;
						arr[i + 1].tileElem.destroy();
						delete arr[i + 1];
						isMerge = true;
					}
				}
			}
		});
		this.updateTiles();
		console.log(this.matrix);
	}

	private tilesMoveRight() {
		this.matrix.forEach((arr, index) => {
			let isMerge = false;
			for (let j = arr.length - 1; j >= 0; j--) {
				for (let i = arr.length - 1; i >= 0; i--) {
					if (arr[i - 1] && arr[i] === undefined) {
						let swap = arr[i - 1];
						arr[i - 1] = arr[i];
						swap.left = this.positionData[index * this.size + i].left;
						arr[i] = swap;
					} else if (arr[i] && arr[i - 1] && arr[i].value === arr[i - 1].value && isMerge === false) {
						arr[i].value = arr[i - 1].value + arr[i].value;
						arr[i - 1].tileElem.destroy();
						delete arr[i - 1];
						isMerge = true;
					}
				}
			}
		});
		this.updateTiles();
		console.log(this.matrix);
	}

	private updateTiles() {
		this.matrix.forEach((arr) => {
			arr.map((tile) => {
				if (tile !== undefined) {
					tile.tileElem.update(tile.value, tile.left, tile.top);
				}
			});
		});
	}

	public updateScores() {
		let sum = 0;
		this.matrix.forEach((arr) => {
			arr.forEach((obj) => {
				if (obj) {
					sum = sum + obj.value;
				}
			});
		});
		this.total = sum;
		this.subject.notify()
	}
}

export { Board };
