import clock, { clockHandler } from "./clock.js";

const stopwatchForm = document.getElementById("stopwatchForm");
const targetElement = document.querySelector("#timer");

const initialTime = {
    day: 0,
    hour: 0,
    minute: 40,
    second: 0,
};

const watch = clockHandler(targetElement, initialTime, "timer");

stopwatchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(stopwatchForm));
    const { days, hours, minutes, seconds } = values;

    const time = {
        day: parseInt(days),
        hour: parseInt(hours),
        minute: parseInt(minutes),
        second: parseInt(seconds),
    };
    watch.restartFrom(time);
});
