function LoadHabitsModule() {
    const loadHabitsModule = {};
    const canvases = {};

    const habitsSection = document.querySelector("div#habits");
    const habitsDeleteDiv = document.querySelector("div#dropdown-delete");

    async function loadHabits() {
        const res = await fetch("http://localhost:3000/api/myhabits");
        if (!(res.ok && res.status === 200)) {
            return console.log("Error downloading the habits", res);
        }
        const habits = await res.json();
        console.log("in LoadHabitsModule habits", habits);
        renderHabits(habits);
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
        console.log("render habit", h);
        const habitsDiv = document.createElement("div");
        const canvas = document.createElement("canvas");
        // canvas.className = "col-sm-12 col-md-8 mycanvas";
        canvas.className = "mycanvas";
        const logAndLabel = document.createElement("div");
        logAndLabel.className = "d-flex justify-content-center";
        logAndLabel.innerHTML = `
            <h3>${h.habit}</h3>
            <button type="button" class="btn ms-4 log-btn" onclick="showModalLogUnit('${h._id}')">Log</button>
        `;

        habitsDiv.appendChild(canvas);
        habitsDiv.appendChild(logAndLabel);
        habitsSection.appendChild(habitsDiv);
        // TODO: extend this object
        canvases[h._id] = {
            image: h.picture,
            canvas: canvas,
            numberOfDays: Number(h.numberOfDays),
        };
    }

    function renderHabitsForDelete(habits) {

        const habitsUl = document.createElement("ul");
        habitsUl.className = "dropdown-menu";
        habitsUl.setAttribute("id", "dropdown-delete-ul");

        let output = "";

        for (let h of habits) {
            output += `
      <li>
          <a class="dropdown-item" href="#" onclick="deleteHabit('${h._id}');">${h.habit}
          <div class="deleteX"><i class="bi bi-x"></i></div></a>
      </li>`;
        }

        habitsUl.innerHTML = output;

        habitsDeleteDiv.appendChild(habitsUl);

    }

    loadHabitsModule.canvases = canvases;
    loadHabitsModule.loadHabits = loadHabits;

    return loadHabitsModule;
} //end of loadHabitsModule
