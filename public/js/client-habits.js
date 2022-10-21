function HabitsModule() {
  const habitsModule = {};

  const habitsSection = document.querySelector("div#habits");
  const habitsDeleteDiv = document.querySelector("div#dropdown-delete");

  async function loadHabits() {
    const res = await fetch('http://localhost:3000/api/myhabits');
    if (!(res.ok && res.status === 200)) {
        return console.log("Error downloading the habits", res);
    }
    const habits = await res.json();
    console.log("in HabitsModule habits", habits);
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
    renderHabitsForDelete(habits);
  }

  function renderHabit(h) {
    console.log("render habit", h.name);
    const habitsDiv = document.createElement("div");

    // TODO: use createElement for canvas here
    habitsDiv.innerHTML =
      `<div class="container">
      <canvas class="col-sm-12 col-md-8 mycanvas"></canvas>
      </div>
      <h3 class="habit-title">${h.name}</h3>
    `;

    habitsSection.appendChild(habitsDiv);

  }

  function renderHabitsForDelete(habits){

    const habitsUl = document.createElement("ul");
    habitsUl.className = "dropdown-menu";
    habitsUl.setAttribute("id","dropdown-delete-ul");

    let output = '';

    for (let h of habits) {
        output += `
        <li>
            <form id="deleteHabitForm" action="/api/myhabits/delete/" method="POST">
            <input type="hidden" name="habitId" value="${h.id}"/>
            <a class="dropdown-item" href="#" onclick="document.getElementById('deleteHabitForm').submit()">${h.name}</a>
            </form>
        </li>`;
    }

    habitsUl.innerHTML = output;
      
    habitsDeleteDiv.appendChild(habitsUl);

  }


  habitsModule.loadHabits = loadHabits;

  return habitsModule;
} //end of habitsModule


