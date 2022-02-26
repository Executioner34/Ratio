import { TileInterface } from "../types/globalInrefaces";

class Tile implements TileInterface {
	id: number;
	position: [number, number];
	value: number;
	merge?: boolean | undefined;

	constructor () {
		
	}

}

export {Tile};