function setPosition(elem: HTMLDivElement) {
	const positionLeft = elem.offsetLeft;
	const positionTop = elem.offsetTop
	return {
		top: positionTop,
		left: positionLeft,
	}
}

export {setPosition};