const clock = (
    dayNode,
    hourNode,
    minuteNode,
    secondNode,
    time,
    type = "stopwatch",
    callbacks
) => {
    const { day, hour, minute, second } = time;
    let timerId = null;

    const initialState = {
        day: day,
        hour: hour,
        minute: minute,
        second: second,
    };

    const render = (state) => {
        dayNode.textContent = state.day < 10 ? `0${state.day}` : state.day;
        hourNode.textContent = state.hour < 10 ? `0${state.hour}` : state.hour;
        minuteNode.textContent =
            state.minute < 10 ? `0${state.minute}` : state.minute;
        secondNode.textContent =
            state.second < 10 ? `0${state.second}` : state.second;
    };

    const timerUpdates = (state) => {
        // stopwatch
        // decrease time by 1 second
        state.second -= 1;
        if (state.second < 0) {
            state.second = 59;
            state.minute -= 1;
        }
        if (state.minute < 0) {
            state.minute = 59;
            state.hour -= 1;
        }
        if (state.hour < 0) {
            state.hour = 23;
            state.day -= 1;
        }

        return state;
    };

    const stopwatchUpdates = (state) => {
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
        if (state.hour >= 24) {
            state.hour = 0;
            state.day += 1;
        }

        return state;
    };

    const update = type === "stopwatch" ? stopwatchUpdates : timerUpdates;

    const stop = () => {
        clearInterval(timerId);
    };

    const tick = () => {
        if (
            type === "timer" &&
            initialState.day === 0 &&
            initialState.hour === 0 &&
            initialState.minute === 0 &&
            initialState.second === 0
        ) {
            stop();
            callbacks?.onComplete(initialState);
            return;
        }
        render(update(initialState));
        callbacks?.onTick(initialState);
    };

    const start = () => {
        timerId = setInterval(tick, 1000);
        callbacks?.onStart(initialState);
    };

    const reset = () => {
        stop();
        initialState.day = day;
        initialState.hour = hour;
        initialState.minute = minute;
        initialState.second = second;
        render(initialState);
        callbacks?.onReset(initialState);
    };

    const pause = () => {
        stop();
        callbacks?.onPause(initialState);
    };

    const resume = () => {
        start();
        callbacks?.onResume(initialState);
    };

    const restartFrom = (time) => {
        stop();
        initialState.day = time.day;
        initialState.hour = time.hour;
        initialState.minute = time.minute;
        initialState.second = time.second;
        render(initialState);
        start();
        callbacks?.onRestart(initialState);
    };

    return {
        start,
        reset,
        pause,
        resume,
        restartFrom,
    };
};

export const clockHandler = (
    targetElement,
    initialTime,
    type = "stopwatch"
) => {
    console.log(targetElement);
    const timerDays = targetElement.querySelector(".timer__days");
    const timerHours = targetElement.querySelector(".timer__hours");
    const timerMinutes = targetElement.querySelector(".timer__minutes");
    const timerSeconds = targetElement.querySelector(".timer__seconds");
    const timeStartBtn = targetElement.querySelector(".time__start");
    const timeResetBtn = targetElement.querySelector(".time__reset");
    const timePauseBtn = targetElement.querySelector(".time__pause");
    const timeResumeBtn = targetElement.querySelector(".time__resume");

    const timerFc = clock(
        timerDays,
        timerHours,
        timerMinutes,
        timerSeconds,
        initialTime,
        type,
       
    );

    const start = () => {
        timerFc.start();
        timeResetBtn?.classList.remove("hidden");
        timeStartBtn?.classList.add("hidden");
        timePauseBtn?.classList.remove("hidden");
        timeResumeBtn?.classList.add("hidden");
    };

    const reset = () => {
        timerFc.reset();
        timeResetBtn.classList.add("hidden");
        timeStartBtn.classList.remove("hidden");
        timePauseBtn?.classList.add("hidden");
        timeResumeBtn?.classList.add("hidden");
    };

    const restartFrom = (time) => {
        timerFc.restartFrom(time);
        timeStartBtn.classList.add("hidden");
        timeResetBtn.classList.remove("hidden");
        timePauseBtn?.classList.remove("hidden");
        timeResumeBtn?.classList.add("hidden");
    };

    const pause = () => {
        timerFc.pause();
        timePauseBtn.classList.add("hidden");
        timeResumeBtn.classList.remove("hidden");
    };

    const resume = () => {
        timerFc.resume();
        timePauseBtn.classList.remove("hidden");
        timeResumeBtn.classList.add("hidden");
    };

    timePauseBtn?.addEventListener("click", pause);

    timeResumeBtn?.addEventListener("click", resume);

    timeStartBtn?.addEventListener("click", start);

    timeResetBtn?.addEventListener("click", reset);

    return {
        start,
        reset,
        pause,
        resume,
        restartFrom,
    };
};

export default clock;
