import handleCollapsable from "./collapsable.js";
import hScrollHandler from "./horizontal-scroll.js";

const horizontalScrollViews = document.querySelectorAll(".horizontal-scroll");
const collapsables = document.querySelectorAll(".collapsable");

// select item with attribute number-only

const numberOnly = document.querySelectorAll("[number-only]");
const minMax = document.querySelectorAll("[min-max]");
const maxLen = document.querySelectorAll("[max-len]");
const dropdowns = document.querySelectorAll(".dropdown");

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

dropdowns.forEach((dropdown) => {
    const dropdownBtn = dropdown.querySelector(".dropdown-button");
    const dropdownMenu = dropdown.querySelector(".dropdown-content");

    dropdownBtn.addEventListener("click", (e) => {
        // select parent element with class dropdown
        const parent = e.target.closest(".dropdown");
        // select all dropdowns
        const allDropdowns = document.querySelectorAll(".dropdown");
        // if dropdown is not active
        if (!parent.classList.contains("active")) {
            // remove active class from all dropdowns
            allDropdowns.forEach((dropdown) => {
                dropdown.classList.remove("active");
            });

            // add active class to parent
            parent.classList.add("active");
            // add active class to dropdown menu
            dropdownMenu.classList.add("active");
        } else {
            // remove active class from parent
            parent.classList.remove("active");
        }
    });
});

document.addEventListener("click", (e) => {
    const dropdowns = document.querySelectorAll(".dropdown");
    const dropdownMenus = document.querySelectorAll(".dropdown-menu");

    dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });
});


const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-btn");
const navBackdrop = document.querySelector(".nav-backdrop");

menuBtn.addEventListener("click", (e) => {
    navbar.classList.toggle("open");
});

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        navbar.classList.remove("open");
    });
});

navBackdrop.addEventListener("click", (e) => {
    navbar.classList.remove("open");
});



// dynamicallly add active link to nav linkk depending on the routes

navLinks.forEach((link) => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});