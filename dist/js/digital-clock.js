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

 const digitalClockHandler = (targetElement, initialTime) => {
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

const digitalClocks = document.querySelectorAll(".digital-clock");
digitalClocks.forEach((dgClock) => {
    const clockHandler = digitalClockHandler(dgClock, {
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds(),
    });
    clockHandler.start();
});
