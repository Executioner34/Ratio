function createElement(element: string, className: string): HTMLElement {
	const elem = document.createElement(element);
	if (className) {
		elem.className = className;
	}
	return elem
}

export {createElement};