import { Dropdown } from './js/components'

class Stylekit {
    constructor() {
        this.components = {};

        this.initializeComponents();
    }

    initializeComponents() {
        this.components.dropdown = new Dropdown();
    }
}

window.stylekit = new Stylekit();
