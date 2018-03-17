import { Dropdown, Progress } from './js/components'

class Stylekit {
    constructor() {
        this.components = {};

        this.initializeComponents();
    }

    initializeComponents() {
        this.components.dropdown = new Dropdown();
        this.components.progress = new Progress();
    }
}

window.stylekit = new Stylekit();
