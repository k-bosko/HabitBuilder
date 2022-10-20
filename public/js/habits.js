function HabitsModule() {
  const habitsModule = {};

  const habitsSection = document.querySelector("div#habits");

  async function loadHabits() {
    const res = await fetch('http://localhost:3000/api/myhabits');
    if (!(res.ok && res.status === 200)) {
        return showError("Error downloading the listings", res);
    }
    const habits = await res.json();
    console.log("habits", habits);
    renderHabits(habits);

    // TODO: use createElement in renderHabit
    habitsModule.canvases = document.querySelectorAll(".mycanvas");
  }


  function renderHabits(habits) {
    //TODO think about limiting number of habits
    // on page and adding another page if too many habits created?

    //clear it out first
    habitsSection.innerHTML = "";

    for (let h of habits) {
        renderHabit(h);
    }
  }

  function renderHabit(h) {
    console.log("render habit", h.habit_name);
    const habitsDiv = document.createElement("div");

    // TODO: use createElement here
    habitsDiv.innerHTML =
      `<div class="container">
      <canvas class="col-sm-12 col-md-8 mycanvas"></canvas>
      </div>
      <h3>${h.habit_name}</h3>`;

    habitsSection.appendChild(habitsDiv);

    // console.log("CANVAS", canvasSection);
  }

  habitsModule.loadHabits = loadHabits;

  return habitsModule;
} //end of habitsModule