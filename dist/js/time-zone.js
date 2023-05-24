const timeZoneTabs = document.querySelectorAll(".timezone-tab");
const timeZoneContainer = document.querySelector(".timezone-items-container");

// africa
// australia
// europe
// south-america
// antarctica

const timeZones = [
    {
        name: "CAT - Central Africa Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "africa",
    },
    {
        name: "CET - Central European Time (UTC+1)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "africa",
    },
    {
        name: "CVT - Cape Verda Time (UTC-1)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "africa",
    },
    {
        name: "EAT - Eastern European Time (UTC+3)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "africa",
    },
    {
        name: "GMT - Greenwich Mean Time (UTC)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "africa",
    },
    {
        name: "EET - Eastern European Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "africa",
    },
    {
        name: "CAT - Central Africa Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "africa",
    },
    {
        name: "GMT - Greenwich Mean Time (UTC)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "asia",
    },
    {
        name: "EET - Eastern European Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "asia",
    },
    {
        name: "CAT - Central Africa Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "asia",
    },
    {
        name: "GMT - Greenwich Mean Time (UTC)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "australia",
    },
    {
        name: "EET - Eastern European Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "australia",
    },
    {
        name: "CAT - Central Africa Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "australia",
    },
    {
        name: "GMT - Greenwich Mean Time (UTC)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "europe",
    },
    {
        name: "EET - Eastern European Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "europe",
    },
    {
        name: "CAT - Central Africa Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "europe",
    },
    {
        name: "GMT - Greenwich Mean Time (UTC)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "south-america",
    },
    {
        name: "EET - Eastern European Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "south-america",
    },
    {
        name: "CAT - Central Africa Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "south-america",
    },
    {
        name: "CAT - Central Africa Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "antarctica",
    },
    {
        name: "CAT - Central Africa Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "north-america",
    },
    {
        name: "CAT - Central Africa Time (UTC+2)",
        href: "/time-zone-details.html?timezone=America/New_York",
        tag: "north-america",
    },
];

const renderTimeZoneList = (timeZones) => {
    const renderList = [];

    timeZones.forEach((timeZone) => {
        renderList.push(`
        <li>
            <a class="timezone-item" href="${timeZone.href}">
                ${timeZone.name}
            </a>
        </li>
        `);
    });

    timeZoneContainer.innerHTML = renderList.join("");
};

timeZoneTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        timeZoneTabs.forEach((tab) => tab.classList.remove("active"));
        tab.classList.add("active");
        // get africa tag value
        const tag = tab.getAttribute("data-tag");
        // filter timezones by tag
        const filteredTimeZones = timeZones.filter(
            (timeZone) => timeZone.tag === tag
        );
        // render timezones
        renderTimeZoneList(filteredTimeZones);
    });
});

const africaTimeZones = timeZones.filter(
    (timeZone) => timeZone.tag === "africa"
);

renderTimeZoneList(africaTimeZones);
