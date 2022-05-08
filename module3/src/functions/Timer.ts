

class Timer {
    start: number

    constructor() {
        this.start = Date.now()
    }

    public end() {
        const now = Date.now()
        return now - this.start
    }


}

export {Timer}