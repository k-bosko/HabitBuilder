 
async function main() {
  const habitsModule = HabitsModule();
  await habitsModule.loadHabits();

  // const canvasModule = CanvasModule();
  // canvasModule.init(habitsModule.canvases)

  console.log(habitsModule.canvases);  
}

document.addEventListener('DOMContentLoaded', main);