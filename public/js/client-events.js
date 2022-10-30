//TODO encapsulate into Module

async function deleteHabit(id) {
    console.log(`will delete habit with id ${id}`);
    const res = await fetch(`/api/myhabits/${id}`, { "method": "delete" });
    //TODO add error handling

    // remove on UI
    if (res.ok) {
        location.reload();
    }
};


const logUnitModal = new bootstrap.Modal("#modalOnLogBtn");

function showModalLogUnit(habitId) {
    logUnitModal.show();

    const exampleModal = document.querySelector("#modalOnLogBtn");
    const buttonSave = exampleModal.querySelector("#button-save");
    buttonSave.setAttribute("data-habit-id", habitId);
}


async function saveLogUnits(event) {
    const habitId = event.target.getAttribute("data-habit-id");
    const logUnits = document.querySelector("#logUnits").value;
    const bodyToSend = JSON.stringify({ "logUnits": logUnits });
    console.log(bodyToSend);
    logUnitModal.hide();

    await fetch(`/api/myhabits/${habitId}/log`, {
        "method": "post",
        "body": bodyToSend,
        "headers": {
            "Content-Type": "application/json"
        },
    });
    //TODO add error handling
}
