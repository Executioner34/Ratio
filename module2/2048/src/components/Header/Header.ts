import './header.css'

import { createElement } from '../../functions/createElement';

class Header {
	root: HTMLDivElement;
	scores!: number;
	headerContainer!: HTMLDivElement
	scoreContainer!: HTMLDivElement;
	bestContainer!: HTMLDivElement;
	timerContainer!: HTMLDivElement;

	constructor(parent: HTMLDivElement, scores: number) {
		this.root = parent;
		this.init(scores);
	}

	private init(scores: number) {
		this.createHeader()
		this.createScoresContainer();
		this.updateScoreContainer(scores)
	}

	private createHeader() {
		this.headerContainer = createElement('div', 'header-container') as HTMLDivElement;
		const title = createElement('h1', 'header__title');
		title.textContent = '2048'
		this.headerContainer.appendChild(title)
		const rootFirstChild = this.root.firstChild;
		this.root.insertBefore(this.headerContainer, rootFirstChild)
	}

	private createScoresContainer() {
		const scoresContainer = createElement('div', 'scores-container');
		const score = createElement('div', 'score');
		const best = createElement('div', 'best');
		const timer = createElement('div', 'timer')
		score.textContent = `${this.scores}`
		best.textContent = `${0}`
		timer.textContent = '00:00'
		scoresContainer.appendChild(score);
		scoresContainer.appendChild(best);
		scoresContainer.appendChild(timer)
		this.headerContainer.appendChild(scoresContainer)
		this.scoreContainer = this.root.querySelector('.score')!;
		this.bestContainer = this.root.querySelector('.best')!;
		this.timerContainer = this.root.querySelector('.timer')!
	}

	public updateScoreContainer(number: number) {
		this.scoreContainer.textContent = `${number}`;
	}

	public updateBestContainer(number: number) {
		this.bestContainer.textContent = `${number}`
	}

	public updateTimerContainer(time: string) {
		this.timerContainer.textContent = time
	}
}

export { Header };
