

function renderTime(start: number) {
	const now = Date.now()
	let minutes: number | string = new Date(now - start).getMinutes()
	if(minutes < 10) minutes = '0' + minutes
	let seconds: number | string = new Date(now - start).getSeconds()
	if(seconds < 10) seconds = '0' + seconds
	
	return `${minutes}:${seconds}`
}

export {renderTime}