const formatTimestamp = (milisec: number): string => {
    let sec = milisec / 1000;
    const minutes = Math.floor(sec / 60);
    sec = Math.floor(sec) - (minutes * 60)
    return `${minutes} мин. ${sec} сек.`
}

export {formatTimestamp}