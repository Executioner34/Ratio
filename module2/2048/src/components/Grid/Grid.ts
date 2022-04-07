import './grid.css'

import { GridInterface } from "../../types/globalInterfaces";
import { createElement } from "../../functions/createElement";
import { setPosition } from "../../functions/setPosition";

class Grid implements GridInterface {
	size: number;
	gridElementPositionData: Array<{
		top: number;
		left: number;
	}>;

	constructor(parent: HTMLElement, size: number) {
		this.size = size;
		this.gridElementPositionData = [];
		this.renderGrid(parent);
	}

	private renderGrid(root: HTMLElement) {
		root.appendChild(this.createGrid(this.size));
		this.fixHeight();
	}

	private createGrid(size: number) {
		const grid = createElement("div", "grid-template grid");
		const sizes = size * size;
		for (let i = 1; i <= sizes; i++) {
			const gridElement = createElement("div", `grid-elem grid-elem-${i}`);
			grid.appendChild(gridElement);
		}
		return grid;
	}

	private fixHeight() {
		const gridElem: NodeListOf<HTMLDivElement> = document.querySelectorAll(".grid-elem")!;
		gridElem.forEach((elem) => {
			elem.style.height = elem.clientWidth + "px";
			this.gridElementPositionData.push(setPosition(elem));
		});
	}
}

export { Grid };
