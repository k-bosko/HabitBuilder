 
async function main() {
  const habitsModule = HabitsModule();
  await habitsModule.loadHabits();

  // const canvasModule = CanvasModule();
  // canvasModule.init(habitsModule.canvases)

  console.log(habitsModule.canvases);  

  // const habitsDeleteLiAList = document.querySelectorAll("#dropdown-delete-ul li a");
  // for (let habitDelete of habitsDeleteLiAList){
  //   habitDelete.addEventListener('click', () => {
    
  //   const parent = habitDelete.parentNode;
  //   // console.log("checked item", parent);
  //   const checkedVal = parent.firstElementChild.value;

  //   console.log(checkedVal);

  // });
  // }
  
}

document.addEventListener('DOMContentLoaded', main);
