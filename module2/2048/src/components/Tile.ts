import { TileInterface } from "../types/globalInterfaces";

import { createElement } from "../functions/createElement";

class Tile implements TileInterface {
	isMerge?: boolean;
	id: number;
	position: { top: number; left: number };
	value: number;
	tileElement!: HTMLDivElement;
	parent: HTMLDivElement

	constructor(
		parent: HTMLDivElement,
		options: {
			value: number;
			id: number;
			top: number;
			left: number;
		}
	) {
		this.isMerge = false
		this.parent = parent
		this.value = options.value;
		this.id = options.id;
		this.position = {
			top: options.top,
			left: options.left,
		};
		this.init(parent);
	}

	private init(parent: HTMLDivElement) {
		this.createTile(parent);
	}

	private createTile(parent: HTMLDivElement) {
		const tile = createElement("div", `tile tile-${this.value}`) as HTMLDivElement;
		tile.textContent = this.value.toString();
		tile.style.left = this.position.left + "px";
		tile.style.top = this.position.top + "px";
		parent.appendChild(tile);
		this.tileElement = tile;
	}

	public update = (value: number, left: number, top:number) => {
		this.isMerge = false
		this.value = value;
		this.position = {
			top: top,
			left: left
		}
		this.tileElement.classList.remove(`tile-${value/2}`);
		this.tileElement.classList.add(`tile-${value}`)
		this.tileElement.textContent = value.toString();
		this.tileElement.style.left = left + 'px';
		this.tileElement.style.top = top + 'px'
	}

	destroy() {
		this.parent.removeChild(this.tileElement)
	}
}

export { Tile };
