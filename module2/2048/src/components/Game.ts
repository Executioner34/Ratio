import { GameInterface, GameOptions } from '../types/globalInterfaces';
import { Grid } from './Grid';
import { Board } from './Board';
import { createElement } from '../functions/createElement';

class Game implements GameInterface {
	gameContainer!: HTMLDivElement;
	root: HTMLDivElement;
	scoreContainer!: HTMLDivElement;
	best!: HTMLDivElement;
	size!: number;
	scores: number;
	isEndGame: boolean;
	options!: GameOptions;
	Grid!: Grid;
	Board!: Board;
	

	constructor(options: GameOptions) {
		this.root = options.root;
		this.size = options.size || 5;
		this.scores = 0;
		this.isEndGame = false;
		this.init();
	}

	private init() {
		this.createScoresContainer();
		this.createGameContainer();
		this.Grid = new Grid(this.gameContainer, this.size);
		this.Board = new Board(this.gameContainer, this.size, this.Grid.gridElementPositionData);
		this.Board.subject.addObserver(() => {
			this.scores = this.Board.total;
			this.isEndGame = this.Board.isEndGame;
			this.updateScoreContainer(this.Board.total)
		})
		this.updateScoreContainer(this.Board.total)
	}

	private createGameContainer() {
		const gameContainer = createElement('div', 'game-container');
		this.root.appendChild(gameContainer);
		this.gameContainer = this.root.querySelector('.game-container')!;
	}

	private createScoresContainer() {
		const scoresContainer = createElement('div', 'scores-container');
		const score = createElement('div', 'score');
		const best = createElement('div', 'best');
		scoresContainer.appendChild(score);
		scoresContainer.appendChild(best);
		this.root.appendChild(scoresContainer);
		this.scoreContainer = this.root.querySelector('.score')!;
		this.best = this.root.querySelector('.best')!;
	}

	private updateScoreContainer(number: number) {
		this.scoreContainer.textContent = `${number}`
	}
}

export { Game };
