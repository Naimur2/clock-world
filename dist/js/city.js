const clock = (hourNode, minuteNode, secondNode, meridiamNode, time) => {
    const { hour, minute, second } = time;
    let timerId = null;

    const initialState = {
        hour: hour,
        minute: minute,
        second: second,
        meridiam: "AM",
    };

    const render = (state) => {
        const houerContent = state.hour < 10 ? `0${state.hour}` : state.hour;

        hourNode.textContent = houerContent;

        minuteNode.textContent =
            state.minute < 10 ? `0${state.minute}` : state.minute;
        if (secondNode) {
            secondNode.textContent =
                state.second < 10 ? `0${state.second}` : state.second;
        }

        if (meridiamNode) {
            meridiamNode.textContent = state.meridiam;
        }
    };

    const update = (state) => {
        // increase time by 1 second
        state.second += 1;
        if (state.second >= 60) {
            state.second = 0;
            state.minute += 1;
        }

        if (state.minute >= 60) {
            state.minute = 0;
            state.hour += 1;
        }

        if (state.hour > 12) {
            state.hour -= 12;
            state.meridiam = "PM";
        } else if (state.hour === 0) {
            state.hour = 12;
        }

        return state;
    };

    const stop = () => {
        clearInterval(timerId);
    };

    const tick = () => {
        render(update(initialState));
    };

    const start = () => {
        timerId = setInterval(tick, 1000);
    };

    tick();

    return {
        start,
        stop,
    };
};

export const digitalClockHandler = (targetElement, initialTime) => {
    const dgClockHour = targetElement.querySelector(".digital-clock__hour");
    const dgClockMinute = targetElement.querySelector(".digital-clock__minute");
    const dgClockSecond = targetElement.querySelector(".digital-clock__second");
    const dgClockMeridiam = targetElement.querySelector(
        ".digital-clock__meridiam"
    );

    const timerFc = clock(
        dgClockHour,
        dgClockMinute,
        dgClockSecond,
        dgClockMeridiam,
        initialTime
    );

    return {
        start: timerFc.start,
        stop: timerFc.stop,
    };
};

const clocks = ["sydney", "sydney2"];
const addCityButton = document.getElementById("add-city-btn");
const clockContainer = document.getElementById("clock-container");

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
const addClock = () => {
    const city = "sydney" + (clocks.length + 1);

    const el = ` <h5 class="font-bold text-base">Sydney</h5>
                        <div country="${city}"></div>
                        <div class="grid place-items-center gap-1">
                            <div class="digital-clock">
                                <span
                                    class="text-[#588500] font-bold text-xl digital-clock__hour"
                                    >05</span
                                ><span class="text-[#588500] font-bold text-xl"
                                    >:</span
                                ><span
                                    class="text-[#588500] font-bold text-xl digital-clock__minute"
                                    >23</span
                                >
                                <span
                                    class="text-[#588500] font-bold text-xl digital-clock__meridiam"
                                    >PM</span
                                >
                            </div>
                            <p class="text-xs text-[#55534F]">${` 
                                ${new Date().getDate()}    
                               ${new Date().toLocaleDateString("en-US", {
                                   month: "long",
                               })} ,
                                ${new Date().getFullYear()}
                                `}</p>
                        </div>
                   
    `;

    const element = document.createElement("div");

    element.classList.add(
        "card",
        "flex",
        "flex-col",
        "items-center",
        "gap-2",
        "w-full",
        "sm:max-w-[12rem]"
    );
    element.innerHTML = el;

    clockContainer.appendChild(element);

    const clockEl = $(`[country="${city}"]`);

    if (clockEl) {
        clockEl.thooClock({
            size: 110,
        });
    }

    const clockHandler = digitalClockHandler(element, {
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds(),
    });
    clockHandler.start();

    clocks.push(city);
};

addCityButton.addEventListener("click", addClock);

renderClocks();


$("#current-clock")?.thooClock({
    size: 110,
})