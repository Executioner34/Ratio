import './game.css';

import { GameInterface, GameOptions } from '../../types/globalInterfaces';
import { Grid } from '../Grid/Grid';
import { Board } from '../Board/Board';
import { createElement } from '../../functions/createElement';
import MakeObservableSubject from '../../functions/Observer';

class Game implements GameInterface {
	gameContainer!: HTMLDivElement;
	root: HTMLDivElement;
	size!: number;
	scores: number;
	isEndGame: boolean;
	isWinGame: boolean;
	options!: GameOptions;
	Grid!: Grid;
	Board!: Board;
	Observer: MakeObservableSubject;

	constructor(options: GameOptions) {
		this.root = options.root;
		this.size = options.size || 5;
		this.scores = 0;
		this.isEndGame = false;
		this.isWinGame = false;
		this.Observer = new MakeObservableSubject();
		this.init();
	}

	private init() {
		this.createGameContainer();
		this.Grid = new Grid(this.gameContainer, this.size);
		this.Board = new Board(this.gameContainer, this.size, this.Grid.gridElementPositionData);
		this.scores = this.Board.total;
		this.Board.subject.addObserver(() => {
			this.scores = this.Board.total;
			this.isEndGame = this.Board.isLoseGame || this.Board.isWinGame;
			this.isWinGame = this.Board.isWinGame;
			this.Observer.notify();
		});
	}

	private createGameContainer() {
		const gameContainer = createElement('div', 'game-container');
		this.root.appendChild(gameContainer);
		this.gameContainer = this.root.querySelector('.game-container')!;
	}
}

export { Game };
