const handleHrizontalScroll = (item) => {
    let isDown = false;
    let startX;
    let scrollLeft;
    item.addEventListener("mousedown", (e) => {
        isDown = true;
        item.classList.add("active");
        item.style.cursor = "grabbing";
        startX = e.pageX - item.offsetLeft;
        scrollLeft = item.scrollLeft;
    });

    item.addEventListener("mouseleave", () => {
        isDown = false;
        item.style.cursor = "grab";
        item.classList.remove("active");
    });

    item.addEventListener("mouseup", () => {
        isDown = false;
        item.style.cursor = "grab";
        item.classList.remove("active");
    });

    item.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - item.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        item.scrollLeft = scrollLeft - walk;
        console.log(walk);
    });

    // touch to scroll
    item.addEventListener("touchstart", (e) => {
        isDown = true;
        item.classList.add("active");
        startX = e.touches[0].pageX - item.offsetLeft;
        scrollLeft = item.scrollLeft;
    });

    item.addEventListener("touchend", () => {
        isDown = false;
        item.classList.remove("active");
    });

    item.addEventListener("touchmove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - item.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        item.scrollLeft = scrollLeft - walk;
        console.log(walk);
    });
};

const hScrollHandler = (items) => {
    items.forEach((item) => {
        handleHrizontalScroll(item);
    });
};

export default hScrollHandler;
