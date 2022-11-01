/* global LoadHabitsWithAwardsModule, CanvasModule: readable */
async function main() {
    const loadHabitsModule = LoadHabitsWithAwardsModule();
    await loadHabitsModule.getHabitsWithAwards();
    console.log("LOAD HABIT with award MODULE", loadHabitsModule.canvases);
}

document.addEventListener("DOMContentLoaded", main);
