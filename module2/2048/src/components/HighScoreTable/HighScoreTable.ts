import './highScoreTable.css'

import { createElement } from "../../functions/createElement";

class HighScoreTable {
	tableList: { time: string; id: string; }[];

	constructor(parent: HTMLDivElement) {
		this.tableList = [
			{
				time: '90',
				id: 'Alexander',
			},
			{
				time: '100',
				id: 'Alena',
			},
			{
				time: '80',
				id: 'Vova',
			},
		];
		this.init(parent)
	}

	private init(parent: HTMLDivElement) {
		parent.appendChild(this.renderTable())
		
	}

	private renderTable() {
		let tableWrap = createElement('div', 'table-container');
		let tableHeader = createElement('div', 'table__header');
		let timeTitle = createElement('h2', 'header__time');
		let nameTitle = createElement('h2', 'header__name');
		timeTitle.textContent = 'TIME';
		nameTitle.textContent = 'NAME';
		tableHeader.appendChild(timeTitle);
		tableHeader.appendChild(nameTitle);
		tableWrap.appendChild(tableHeader);
		tableWrap.appendChild(this.renderList());
		return tableWrap
	}

	private renderList() {
		let tableList = createElement('ul', 'table__list');
		this.tableList.sort((a, b) => {
			return Number(a.time) - Number(b.time)})
			.map( elem => {
				let itemList = createElement('li', 'list__item')
				let itemTime = createElement('span', 'item__time')
				let itemName = createElement('span', 'item__name')
				itemTime.textContent = elem.time;
				itemName.textContent = elem.id;
				itemList.appendChild(itemTime)
				itemList.appendChild(itemName)
				return itemList
		}).forEach(item => tableList.appendChild(item))
		return tableList
	}
}

export {HighScoreTable}