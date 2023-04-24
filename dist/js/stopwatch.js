import { clockHandler } from "./clock.js";

const targetElement = document.querySelector("#stopwatch");

const initialTime = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
};

clockHandler(targetElement, initialTime, "stopwatch");
