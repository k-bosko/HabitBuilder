//TODO encapsulate into Module

async function deleteHabit(id) {
    console.log(`will delete habit with id ${id}`);
    const res = await fetch(`/api/myhabits/${id}`, { "method": "delete" });
    // remove on UI
    if (res.ok) {
        document.querySelectorAll(`.delete-item-${id}`).forEach(el => el.remove());
    }
};

const habitModal = new bootstrap.Modal("#modalHabits");

function showModalUpdateHabit(habitId) {
    habitModal.show();
    document.querySelector("#modalInput").value = "";
    document.querySelector("#modalLabel").innerText = "Enter new habit name:";
    const updateHabitModalElem = document.querySelector("#modalHabits");
    const buttonSave = updateHabitModalElem.querySelector("#button-save");
    buttonSave.onclick = (evt) => updateHabit(evt, habitId);
    updateHabitModalElem.onkeydown = (evt) => {
        if (evt.code === "Enter"){
            updateHabit(evt, habitId)
        }};
};


async function updateHabit(event, habitId) {

    const newHabitLabel = document.querySelector("#modalInput").value;
    const bodyToSend = JSON.stringify({ "updateHabit": newHabitLabel });
    console.log("bodyToSend", bodyToSend);
    habitModal.hide();

    const res = await fetch(`/api/myhabits/${habitId}/update`, {
        "method": "post",
        "body": bodyToSend,
        "headers": {
            "Content-Type": "application/json"
        },
    });

    // update on UI
    if (res.ok) {
        document.querySelector(`.habit-label-${habitId}`).innerText = newHabitLabel;
    }
};


function showModalLogUnit(habitId) {
    habitModal.show();
    document.querySelector("#modalInput").value = "";
    const modalLabel = document.querySelector("#modalLabel")
    modalLabel.innerText = "Enter logging units:";
    const logUnitsModalElem = document.querySelector("#modalHabits");
    const buttonSave = logUnitsModalElem.querySelector("#button-save");
    buttonSave.onclick = (evt) => saveLogUnits(evt, habitId);
    logUnitsModalElem.onkeydown = (evt) => {
        if (evt.code === "Enter"){
            saveLogUnits(evt, habitId)
        }};
};


async function saveLogUnits(event, habitId) {
    const logUnits = document.querySelector("#modalInput").value;
    const bodyToSend = JSON.stringify({ "logUnits": logUnits });
    console.log(bodyToSend);
    habitModal.hide();

    await fetch(`/api/myhabits/${habitId}/log`, {
        "method": "post",
        "body": bodyToSend,
        "headers": {
            "Content-Type": "application/json"
        },
    });
    //TODO add error handling
};

async function saveClickedPiece(habitId, openPiecesArray) {
    console.log("GOT openPiecesArray", openPiecesArray)

    const bodyToSend = JSON.stringify({
        "openPieces": openPiecesArray

    });

    const res = await fetch(`/api/puzzles/${habitId}/clicked`, {
        "method": "post",
        "body": bodyToSend,
        "headers": {
            "Content-Type": "application/json"
        },
    });

    // update on UI
    if (res.ok) {
        location.reload();
    }
};

async function savePuzzleCompleted(habitId){
    console.log("INSIDE savePuzzleCompleted");
    await fetch(`/api/puzzles/${habitId}/completed`);
}


