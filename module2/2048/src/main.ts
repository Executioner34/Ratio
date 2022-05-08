import 'reset-css';
import './style.css';

import { Game } from './components/Game/Game';
import { Header } from './components/Header/Header';
import { HighScoreTable } from './components/HighScoreTable/HighScoreTable';
import { renderTime } from './functions/renderTime';
import { Model } from './components/Model/Model';

class App {
	root: HTMLDivElement;
	size!: number;
	scores!: number;
	nowDate!: number;
	Game!: Game;
	Header!: Header;
	timer!: number;
	HighScoreTable!: HighScoreTable;
	Model!: Model;
	username: string;

	constructor(size: number, user: string = 'PlayerUnknown') {
		this.root = document.querySelector('#app')!;
		this.username = user;
		this.init(size);
	}

	private async init(size: number) {
		this.Model = new Model();
		this.Game = new Game({
			root: this.root,
			size: size,
		});
		this.Game.Observer.addObserver(() => {
			this.scores = this.Game.scores;
			this.Header.updateScoreContainer(this.Game.scores);
			if (this.Game.isEndGame) {
				clearInterval(this.timer);
				setTimeout(() => {
					document.location.reload();
				}, 5000);
			}
			if (this.Game.isWinGame) {
				this.postUser({ username: this.username });
				setTimeout(() => {
					document.location.reload();
				}, 5000);
			}
		});
		this.Header = new Header(this.root, this.Game.scores);
		this.HighScoreTable = new HighScoreTable(this.root, await this.Model.getData());
		this.startTimer();
	}

	private updateTimer() {
		this.Header.updateTimerContainer(renderTime(this.nowDate));
	}

	private startTimer() {
		this.nowDate = Date.now();
		this.timer = setInterval(() => {
			this.updateTimer();
		}, 1000);
	}

	private async postUser(user: { username: string }) {
		await this.Model.postData(user);
	}
}

const app1 = new App(5);
