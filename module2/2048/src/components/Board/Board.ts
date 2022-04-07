import './board.css';

import { BoardInterface } from '../../types/globalInterfaces';
import { createElement } from '../../functions/createElement';
import { getRandomPosition } from '../../functions/getRandomPosition';
import { getRandomValue } from '../../functions/getRandomValue';
import { createMatrix } from '../../functions/createMatrix';
import { Tile } from '../Tile/Tile';
import MakeObservableSubject from '../../functions/Observer';

class Board implements BoardInterface {
	size!: number;
	board!: HTMLDivElement;
	positionData!: { top: number; left: number }[];
	matrix: { id: number; value: number; top: number; left: number; tileElem: Tile }[][];
	Tile!: Tile;
	subject!: MakeObservableSubject;
	counterTiles: number;
	total: number;
	quantityTiles: number;
	isLoseGame: boolean;
	startX!: number;
	startY!: number;
	tileWidthAndHeight!: number;

	constructor(parent: HTMLDivElement, size: number, positionData: { top: number; left: number }[]) {
		this.size = size;
		this.counterTiles = 0;
		this.positionData = positionData;
		this.matrix = createMatrix(size);
		this.total = 0;
		this.quantityTiles = 0;
		this.isLoseGame = false;
		this.subject = new MakeObservableSubject();
		this.init(parent);
	}

	private init(parent: HTMLDivElement) {
		this.createBoard(parent);
		this.createRandomTile();
		this.createRandomTile();
		this.arrowMove = this.arrowMove.bind(this);
		this.pointerDownHandler = this.pointerDownHandler.bind(this);
		document.addEventListener('pointerdown', this.pointerDownHandler);
		document.addEventListener('keydown', this.arrowMove);
		this.updateScores();
	}

	private createBoard(parent: HTMLDivElement) {
		const board = createElement('div', 'board-container');
		const grid = parent.querySelector('.grid');
		board.style.width = `${grid?.clientWidth}px`;
		const gridElem = grid?.querySelector('.grid-elem')!
		parent.appendChild(board);
		this.tileWidthAndHeight = gridElem.clientWidth
		this.board = parent.querySelector('.board-container')!;
	}

	private createRandomTile() {
		const randomValue = getRandomValue();
		const randomPositionOnRow = getRandomPosition(this.size);
		const randomPositionOnColumn = getRandomPosition(this.size);
		const randomPositionInData = randomPositionOnRow * this.size - this.size + (randomPositionOnColumn - 1);
		if (!this.matrix[randomPositionOnRow - 1][randomPositionOnColumn - 1]) {
			this.matrix[randomPositionOnRow - 1][randomPositionOnColumn - 1] = {
				id: this.counterTiles,
				value: randomValue,
				...this.positionData[randomPositionInData],
				tileElem: new Tile(this.board, {
					value: randomValue,
					id: this.counterTiles,
					left: this.positionData[randomPositionInData].left,
					top: this.positionData[randomPositionInData].top,
				}, this.tileWidthAndHeight),
			};
			this.counterTiles = this.counterTiles + 1;
			return;
		} else if(this.quantityTiles === 25) {
			return
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
				this.updateScores();
				break;
			case 'ArrowUp':
				e.preventDefault();
				this.tilesMoveUp();
				this.createRandomTile();
				this.updateScores();
				break;
			case 'ArrowLeft':
				e.preventDefault();
				this.tilesMoveLeft();
				this.createRandomTile();
				this.updateScores();
				break;
			case 'ArrowRight':
				e.preventDefault();
				this.tilesMoveRight();
				this.createRandomTile();
				this.updateScores();
				break;
		}
	}

	private pointerDownHandler(event: PointerEvent) {
		this.pointerMoveHandler = this.pointerMoveHandler.bind(this);
		this.pointerUpHandler = this.pointerUpHandler.bind(this);
		document.ondragstart = () => {
			return false;
		};
		this.startX = event.pageX;
		this.startY = event.pageY;

		document.addEventListener('pointermove', this.pointerMoveHandler);
		document.addEventListener('pointerup', this.pointerUpHandler);
	}

	private pointerMoveHandler(event: PointerEvent) {
		const currentX = event.pageX;
		const currentY = event.pageY;
		const clientX = document.body.clientWidth;
		const clientY = document.body.clientHeight;
		const percentX = Math.floor(((this.startX - currentX) / clientX) * 100);
		const percentY = Math.floor(((this.startY - currentY) / clientY) * 100);
		if (percentX >= 10) {
			this.tilesMoveLeft();
			this.createRandomTile();
			this.updateScores();
			document.removeEventListener('pointermove', this.pointerMoveHandler);
		} else if (percentX <= -10) {
			this.tilesMoveRight();
			this.createRandomTile();
			this.updateScores();
			document.removeEventListener('pointermove', this.pointerMoveHandler);
		} else if (percentY >= 20) {
			this.tilesMoveUp();
			this.createRandomTile();
			this.updateScores();
			document.removeEventListener('pointermove', this.pointerMoveHandler);
		} else if (percentY <= -20) {
			this.tilesMoveDown();
			this.createRandomTile();
			this.updateScores();
			document.removeEventListener('pointermove', this.pointerMoveHandler);
		}
	}

	private pointerUpHandler() {
		document.removeEventListener('pointermove', this.pointerMoveHandler);
		document.removeEventListener('pointerup', this.pointerUpHandler);
	}

	private tilesMoveDown() {
		for (let arr of this.matrix) {
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
						this.matrix[j - 1][i].tileElem.isMerge === false &&
						this.matrix[j][i].tileElem.isMerge === false
					) {
						this.matrix[j][i].value = this.matrix[j][i].value + this.matrix[j - 1][i].value;
						this.matrix[j][i].tileElem.isMerge = true;
						this.matrix[j - 1][i].tileElem.destroy();
						delete this.matrix[j - 1][i];
					}
				}
			}
		}
		this.updateTiles();
	}

	private tilesMoveUp() {
		for (let arr of this.matrix) {
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
						this.matrix[j - 1][i].tileElem.isMerge === false &&
						this.matrix[j][i].tileElem.isMerge === false
					) {
						this.matrix[j - 1][i].value = this.matrix[j][i].value + this.matrix[j - 1][i].value;
						this.matrix[j - 1][i].tileElem.isMerge = true;
						this.matrix[j][i].tileElem.destroy();
						delete this.matrix[j][i];
					}
				}
			}
		}
		this.updateTiles();
	}

	private tilesMoveLeft() {
		this.matrix.forEach((arr, index) => {
			for (let j = 0; j <= arr.length - 1; j++) {
				for (let i = 0; i <= arr.length - 1; i++) {
					if (arr[i + 1] && arr[i] === undefined) {
						let swap = arr[i + 1];
						arr[i + 1] = arr[i];
						swap.left = this.positionData[index * this.size + i].left;
						arr[i] = swap;
					} else if (
						arr[i] &&
						arr[i + 1] &&
						arr[i].value === arr[i + 1].value &&
						arr[i].tileElem.isMerge === false &&
						arr[i + 1].tileElem.isMerge === false
					) {
						arr[i].value = arr[i + 1].value + arr[i].value;
						arr[i].tileElem.isMerge = true;
						arr[i + 1].tileElem.destroy();
						delete arr[i + 1];
					}
				}
			}
		});
		this.updateTiles();
	}

	private tilesMoveRight() {
		this.matrix.forEach((arr, index) => {
			for (let j = 0; j <= arr.length - 1; j++) {
				for (let i = arr.length - 1; i >= 1; i--) {
					if (arr[i - 1] && arr[i] === undefined) {
						let swap = arr[i - 1];
						arr[i - 1] = arr[i];
						swap.left = this.positionData[index * this.size + i].left;
						arr[i] = swap;
					} else if (
						arr[i] &&
						arr[i - 1] &&
						arr[i].value === arr[i - 1].value &&
						arr[i].tileElem.isMerge === false &&
						arr[i - 1].tileElem.isMerge === false
					) {
						arr[i].value = arr[i - 1].value + arr[i].value;
						arr[i].tileElem.isMerge = true;
						arr[i - 1].tileElem.destroy();
						delete arr[i - 1];
					}
				}
			}
		});
		this.updateTiles();
	}

	private updateTiles() {
		this.matrix.forEach((arr) => {
			arr.map((tile) => {
				if (tile) {
					tile.tileElem.update(tile.value, tile.left, tile.top);
				}
			});
		});
	}

	public updateScores() {
		let sum = 0;
		let counter = 0;
		this.matrix.forEach((arr) => {
			arr.forEach((obj) => {
				if (obj) {
					counter = counter + 1;
					sum = sum + obj.value;
				}
			});
		});
		this.total = sum;
		this.quantityTiles = counter;
		if(this.quantityTiles === 25) {
			this.isLoseGame = this.checkLoseGame()
			this.subject.notify()
		}
		this.subject.notify();
	}

	private checkLoseGame() {
		let arr = this.matrix.flat()
		return arr.map(tile => {
			return tile?.value
		}).every((value, index, array) => {
			if (value && array[index + 1]) {
				return value !== array[index + 1]
			} 
			if(value && array[index - 1]) {
				return value !== array[index - 1]
			} 
			if(value && array[index + 5]) {
				return value !== array[index + 5]
			} 
			if(value && array[index - 5]) {
				return value !== array[index - 5]
			}
		})

	}
}

export { Board };
