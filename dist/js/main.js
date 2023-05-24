import handleCollapsable from "./collapsable.js";
import hScrollHandler from "./horizontal-scroll.js";

const horizontalScrollViews = document.querySelectorAll(".horizontal-scroll");
const collapsables = document.querySelectorAll(".collapsable");

const searchResultsContainer = document.getElementById("search-results");
const searchInput = document.querySelector(".search-input");

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

const searchModal = document.querySelector(".search-modal");
const modalBackdrop = document.querySelector(".modal-backdrop");

document.querySelector(".search-btn").addEventListener("click", (e) => {
    searchModal.classList.add("open");
});
document.querySelector(".search-bar").addEventListener("click", (e) => {
    searchModal.classList.add("open");
});

searchModal
    .querySelector(".search-modal__body")
    .addEventListener("click", (e) => {
        e.stopPropagation();
    });

modalBackdrop.addEventListener("click", (e) => {
    searchModal.classList.remove("open");
    searchResultsContainer.innerHTML = "";
});

const renderSearchResults = (
    results,
    container = searchResultsContainer,
    onClick
) => {
    const renderResult = results
        ?.map((result) => {
            return `
                     <div class="flex justify-between items-center cursor-pointer hover:bg-[#ccc]/50 px-4 lg:px-6 py-2"
                       
                        ${onClick ? `onclick=${onClick}(this)` : ""}

                        data-geonameId="${result?.geonameId}"
                        data-name="${result?.name}"
                        data-location="${result?.location}"
                        data-timeZoneId="${result?.timeZoneId}"
                        data-dstOffset="${result?.dstOffset}"
                        data-gmtOffset="${result?.gmtOffset}"
                     >
                            <div class="">
                                <h4
                                    class="font-medium text-sm sm:text-base xl:text-lg"
                                >
                                    ${result.name}
                                </h4>
                                <p class="text-xs md:text-sm">
                                    ${result.location}
                                </p>
                            </div>
                            
                        </div>
        `;
        })
        .join("");

    const result = `
        <div class="card px-0 mt-2 overflow-hidden">
        <h5 class="font-bold text-sm lg:text-base px-4 lg:px-6">
            Search Results
        </h5>
        <div class="grid mt-2 overflow-y-scroll max-h-[20rem] md:max-h-[30rem] lg:max-h-[40rem]" >
            ${renderResult || `<p class="text-sm">No results found</p>`}
        </div>
    </div>
    `;

    container.innerHTML = result;
};

const search = async (query = "", render, container, onClick) => {
    const res = await fetch(
        `https://clocks.world/api/search/?callback=jQuery341032723557231595235_1683285605880&name_startsWith=${query}&isNameRequired=true&maxRows=10&username=troef&type=json&featureCode=PPL&featureCode=PPLA&featureCode=PPLA2&featureCode=PPLA3&featureCode=PPLA4&featureCode=PPLC&featureCode=PPLF&featureCode=PPLG&featureCode=PPLL&featureCode=PPLQ&featureCode=PPLR&featureCode=PPLS&featureCode=PPLW&featureCode=PPLX&featureCode=STLMT&lang=nl&style=FULL&orderby=featureclass&_=1683285605883`
    );

    const data = await res.text();
    const startingPoint = data.indexOf("(") + 1;
    const endingPoint = data.lastIndexOf(")");

    const results = JSON.parse(data.substring(startingPoint, endingPoint));
    console.log(results);
    const locations = results?.geonames?.map((location) => {
        return {
            name: location.name,
            location: `${location.adminName1}, ${location.countryName}`,
            geonameId: location.geonameId,
            timeZoneId: location.timezone?.timeZoneId,
            dstOffset: location.timezone?.dstOffset,
            gmtOffset: location.timezone?.gmtOffset,
            
        };
    });
    render(locations, container, onClick);
};

const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

searchInput?.addEventListener("keyup", (e) => {
    debounce(
        search(e.target.value, renderSearchResults, searchResultsContainer,"onSearchResultClick"),
        500
    );
});

// search-timezone-input
// search-timezone-container

const searchTimezoneInput = document.getElementById("search-timezone-input");

const searchTimezoneContainer = document.getElementById(
    "search-timezone-container"
);

searchTimezoneInput?.addEventListener("keyup", (e) => {
    searchTimezoneContainer.classList.add("open");
    debounce(
        search(
            e.target.value,
            renderSearchResults,
            searchTimezoneContainer,
            "onTimeZoneClick"
        ),
        500
    );
});



document.addEventListener("click", (e) => {
    const searchTimezoneContainer = document.getElementById(
        "search-timezone-container"
    );
    if (!searchTimezoneContainer?.contains(e.target)) {
        searchTimezoneContainer.classList.remove("open");
    }
}
);