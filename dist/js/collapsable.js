const handleCollapsable = (collapsables) => {
    collapsables.forEach((collapsable) => {
        const collapsableHeader = collapsable.querySelector(
            ".collapsable-header"
        );

        const collapsableBody = collapsable.querySelector(
            ".collapsable-content"
        );
        collapsableHeader.addEventListener("click", () => {
            const oherCollapsables = document.querySelectorAll(".collapsable");
            // collapsable.classList.toggle("open");

            oherCollapsables.forEach((otherCollaps) => {
                if (otherCollaps === collapsable && collapsable.classList.contains("open")) {
                    collapsable.classList.remove("open");
                } else if (otherCollaps === collapsable && !collapsable.classList.contains("open")) {
                    collapsable.classList.add("open");
                } else {
                    otherCollaps.classList.remove("open");
                }
            });
        });
    });
};

export default handleCollapsable;
