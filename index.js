import View from "./assets/js/View.js";

const gridEl = document.getElementById('grid')

window.view = new View(gridEl);

view.init();