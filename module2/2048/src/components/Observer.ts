export default class MakeObservableSubject {
	private observers!: Array<() => void>;

	constructor() {
		this.observers = [];
	}

	public addObserver(observer: () => void) {
		const isExist = this.observers.includes(observer);
		if (isExist) {
			return console.log('Subject: Наблюдатель уже прикреплен.');
		}

		this.observers.push(observer);
	}

	public unsubscribe(observer: () => void) {
		const observerIndex = this.observers.indexOf(observer);
		if (observerIndex === -1) {
			return console.log('Subject: несуществующий наблюдатель.');
		}

		this.observers.splice(observerIndex, 1);
	}

	public notify(): void {
		this.observers.map((observer) => {
			observer();
		});
	}
}
