/* global LoadHabitsModule: readable */

async function main() {
    const loadHabitsModule = LoadHabitsModule();
    await loadHabitsModule.loadHabits();

    // const canvasModule = CanvasModule();
    // canvasModule.init(loadHabitsModule.canvases)

    console.log(loadHabitsModule.canvases);  
  
}

document.addEventListener("DOMContentLoaded", main);
