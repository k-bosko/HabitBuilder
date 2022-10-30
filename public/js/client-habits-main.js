/* global LoadHabitsModule, CanvasModule: readable */

async function main() {
    const loadHabitsModule = LoadHabitsModule();
    await loadHabitsModule.loadHabits();

    const canvasModule = CanvasModule();
    canvasModule.init(loadHabitsModule.canvases);

    canvasModule.renderImages();

    // console.log("LOAD HABITS MODULE", loadHabitsModule.canvases);  
  
}

document.addEventListener("DOMContentLoaded", main);
