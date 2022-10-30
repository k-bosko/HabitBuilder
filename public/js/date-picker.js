const today = new Date().toISOString().split("T")[0];
const startDateEl = document.querySelector("#start-date");
startDateEl.setAttribute("min", today);
