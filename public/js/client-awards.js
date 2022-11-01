function LoadHabitsWithAwardsModule() {
    const loadHabitsWithAwardsModule = {};
    const habitsSection = document.querySelector("div#habitsWithAwards");

    // get image and habit status
    async function getHabitsWithAwards() {
        const res = await fetch(
            "http://localhost:3000/api/myhabits/myHabitsWithAwards"
        );
        if (!(res.ok && res.status === 200)) {
            return console.log("Error downloading the habits with awards", res);
        }

        const habitsWithAwards = await res.json();
        console.log(habitsWithAwards);
        console.log("in LoadHabitsWithAwards habits", habitsWithAwards);
        renderHabitsWithAwards(habitsWithAwards);
    }
    function renderHabitsWithAwards(habitsWithAwards) {
        //TODO think about limiting number of habits
        // on page and adding another page if too many habits created?

        //clear it out first
        habitsSection.innerHTML = "";
        console.log("hi");
        console.log(habitsWithAwards);
        if (habitsWithAwards.length != 0) {
            for (let h of habitsWithAwards) {
                renderHabitWithAward(h);
            }
        }
    }

    function renderHabitWithAward(h) {
        console.log("render habit with award", h);

        const habitWithAwardDiv = document.createElement("div");
        habitWithAwardDiv.className = "my-2";
        // canvas.className = "col-sm-12 col-md-8 mycanvas";
        console.log(h.picture);
        habitWithAwardDiv.innerHTML = `
            <div class="py-2"><h4>Award For Completing the ${h.habit}  habit</h4> </div>
            <img
                class="w-50 rounded"
                src="${h.picture}"
            />`;
        habitsSection.appendChild(habitWithAwardDiv);
        // TODO: extend this object
    }
    loadHabitsWithAwardsModule.getHabitsWithAwards = getHabitsWithAwards;
    return loadHabitsWithAwardsModule;
}
