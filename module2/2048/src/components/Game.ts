import { GameInterface, GameOptions } from "../types/globalInrefaces";
import { Grid } from "./Grid";
import {Tile} from './Tile';

class Game implements GameInterface {
  root: HTMLDivElement;
  size!: number;
  options!: GameOptions;
	Grid!: Grid;

  constructor(options: GameInterface) {
    this.root = options.root;
		this.size = options.size;
		this.init();
  }

	private init() {
		this.Grid = new Grid(this.root, this.size);
	}
}

export {Game};

