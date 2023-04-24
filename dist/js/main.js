import handleCollapsable from "./collapsable.js";
import hScrollHandler from "./horizontal-scroll.js";

const horizontalScrollViews = document.querySelectorAll(".horizontal-scroll");
const collapsables = document.querySelectorAll(".collapsable");

// select item with attribute number-only

const numberOnly = document.querySelectorAll("[number-only]");
const minMax = document.querySelectorAll("[min-max]");
const maxLen = document.querySelectorAll("[max-len]");

handleCollapsable(collapsables);
hScrollHandler(horizontalScrollViews);

numberOnly.forEach((input) => {
    input.addEventListener("keydown", (e) => {
        if (
            !(
                (e.keyCode >= 48 && e.keyCode <= 57) ||
                (e.keyCode >= 96 && e.keyCode <= 105) ||
                e.keyCode === 8 ||
                e.keyCode === 46 ||
                e.keyCode === 37 ||
                e.keyCode === 39 ||
                e.keyCode === 9
            )
        ) {
            e.preventDefault();
        }
    });
});

minMax.forEach((input) => {
    const minmx = input.getAttribute("min-max");
    const min = minmx.split("-")[0];
    const max = minmx.split("-")[1];

    input.addEventListener("keyup", (e) => {
        if (e.target.value < min) {
            e.target.value = min;
        } else if (e.target.value > max) {
            e.target.value = max;
        }
    });
});

maxLen.forEach((input) => {
    const max = input.getAttribute("max-len");

    input.addEventListener("keyup", (e) => {
        if (e.target.value.length > max) {
            e.preventDefault();
            e.target.value = e.target.value.slice(0, max);
        }
    });
});
