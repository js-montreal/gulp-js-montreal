'use strict';

class Meetups {
    constructor(data) {
        this.data = data.sort((a, b) => parseInt(a.on) > parseInt(b.on));
    }

    latest() {
        return this.data[this.data.length - 1];
    }
}

module.exports = Meetups;