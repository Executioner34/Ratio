
interface GridInterface {
	size: number,
	gridElementPositionData: Array<gridElementPositionDataInterface>
}

type gridElementPositionDataInterface = {
	top: number;
	left: number;
}

interface GameInterface {
	gameContainer: HTMLDivElement,
	root: HTMLDivElement,
	size: number,
}

interface GameOptions {
  root: HTMLDivElement,
  size: number,
}

interface BoardInterface {
	size: number,
	positionData: Array<gridElementPositionDataInterface>
}

interface TileInterface {
	id: number,
	position: {top: number, left: number},
	value: number,
	merge?: boolean
}

export {GridInterface, GameInterface, GameOptions, BoardInterface, TileInterface};