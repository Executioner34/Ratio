import './highScoreTable.css';

import { createElement } from '../../functions/createElement';
import { formatTimestamp } from '../../functions/formatTimestamp';

class HighScoreTable {
	tableList: { username: string; time: string }[];

	constructor(parent: HTMLDivElement, table: { username: string; time: string }[]) {
		this.tableList = table;
		this.init(parent);
	}

	private init(parent: HTMLDivElement) {
		parent.appendChild(this.renderTable());
	}

	private renderTable() {
		let tableWrap = createElement('div', 'table-container');
		let tableHeader = createElement('div', 'table__header');
		let timeTitle = createElement('h2', 'header__time');
		let nameTitle = createElement('h2', 'header__name');
		timeTitle.textContent = 'TIME';
		nameTitle.textContent = 'NAME';
		tableHeader.appendChild(nameTitle);
		tableHeader.appendChild(timeTitle);
		tableWrap.appendChild(tableHeader);
		tableWrap.appendChild(this.renderList());
		return tableWrap;
	}

	public renderList() {
		let tableList = createElement('ul', 'table__list');
		this.tableList.sort((a, b) => {
			return Number(a.time) - Number(b.time);
		});

		this.tableList.length = 10;

		this.tableList
			.map((elem) => {
				let itemList = createElement('li', 'list__item');
				let itemTime = createElement('span', 'item__time');
				let itemName = createElement('span', 'item__name');
				itemTime.textContent = formatTimestamp(Number(elem.time));
				itemName.textContent = elem.username;
				itemList.appendChild(itemName);
				itemList.appendChild(itemTime);
				return itemList;
			})
			.forEach((item) => tableList.appendChild(item));
		return tableList;
	}
}

export { HighScoreTable };
