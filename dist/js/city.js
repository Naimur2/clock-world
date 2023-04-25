const clocks = ["sydney", "sydney2"];

const renderClocks = () => {
    clocks.forEach((clock) => {
        const clockEl = $(`[country="${clock}"]`);
        if (clockEl) {
            clockEl.thooClock({
                size: 110,
            });
        }
    });
};

renderClocks();