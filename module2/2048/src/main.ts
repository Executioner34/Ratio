import 'reset-css';
import './style.css';

import { Game } from './components/Game/Game';
import { Header } from './components/Header/Header';
import { HighScoreTable } from './components/HighScoreTable/HighScoreTable';
import { renderTime } from './functions/renderTime';

class App {
	root: HTMLDivElement;
	size!: number;
	scores!: number
	nowDate!: number
	Game!: Game;
	Header!: Header;
	timer!: number;
	HighScoreTable!: HighScoreTable;

	constructor(size: number) {
		this.root = document.querySelector('#app')!;
		this.init(size);
	}

	private init(size: number) {
		this.Game = new Game({
			root: this.root,
			size: size,
		});
		this.Game.Observer.addObserver(() => {
			this.scores = this.Game.scores
			this.Header.updateScoreContainer(this.Game.scores)
			if (this.Game.isEndGame) {
				console.log(this.Game.isEndGame)
				clearInterval(this.timer)
			}
			if (this.Game.isStartGame) {
				this.startTimer()
			}
		})
		this.Header = new Header(this.root, this.Game.scores);
		this.HighScoreTable = new HighScoreTable(this.root)
	}

	private updateTimer() {
		this.Header.updateTimerContainer(renderTime(this.nowDate))
	}
	
	private startTimer() {
		this.nowDate = Date.now()
		this.timer = setInterval(() => {
			this.updateTimer()
		}, 1000)
	}
}

const app1 = new App(5);
