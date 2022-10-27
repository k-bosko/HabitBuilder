var today = new Date().toISOString().split("T")[0];
document.getElementsByName("start-date")[0].setAttribute("min", today);
