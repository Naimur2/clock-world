/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts}", "./**/*.{html,js,ts}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Mulish", "sans-serif"],
            },
            colors: {
                black: "#2A2927",
                gray: "#55534F",
            },
            content: {
                empty: "''",
            },
            backgroundImage: {
                homeClock1bg: "url('/public/svg/home/clock1bg.svg')",
                homeClock2bg: "url('/public/svg/home/clock2bg.svg')",
                homeClock3bg: "url('/public/svg/home/clock3bg.svg')",
                homeClock4bg: "url('/public/svg/home/clock4bg.svg')",
                timerBg: "url('/public/images/timer-bg.png')",
            },
            borderWidth: {
                1: "1px",
            },
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
