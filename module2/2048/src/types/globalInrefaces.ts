
interface GridInterface {
	size: number
}

interface GameInterface {
	root: HTMLDivElement,
	size: number,
}

interface GameOptions {
  root: HTMLDivElement,
  size: number,
}

interface TileInterface {
	id: number,
	position: [number, number],
	value: number,
	merge?: boolean
}

export {GridInterface, GameInterface, GameOptions, TileInterface};