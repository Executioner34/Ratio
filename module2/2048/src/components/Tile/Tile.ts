import './tile.css'

import { TileInterface } from "../../types/globalInterfaces";
import { createElement } from "../../functions/createElement";

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
		},
		width: number
	) {
		this.isMerge = false
		this.parent = parent
		this.value = options.value;
		this.id = options.id;
		this.position = {
			top: options.top,
			left: options.left,
		};
		this.init(parent, width);
	}

	private init(parent: HTMLDivElement, width: number) {
		this.createTile(parent, width);
	}

	private createTile(parent: HTMLDivElement, width: number) {
		const tile = createElement("div", `tile tile-${this.value}`) as HTMLDivElement;
		tile.textContent = this.value.toString();
		tile.style.left = this.position.left + "px";
		tile.style.top = this.position.top + "px";
		tile.style.width = `${width}px`;
		tile.style.height = `${tile.style.width}`
		tile.style.lineHeight = `${tile.style.height}`
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
