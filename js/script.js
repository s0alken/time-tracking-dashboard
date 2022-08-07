const options = document.querySelectorAll(".menu__option");
const cards = document.querySelectorAll(".card");

const loadData = async timeframe => {

    const response = await fetch("../data.json");
    const data = await response.json();

    data.forEach((activity, idx) => {
        const { current, previous } = activity.timeframes[timeframe];
        const card = cards[idx];

        counterUp(current, card.querySelector(".card__current"), "current", timeframe);
        counterUp(previous, card.querySelector(".card__previous"), "previous", timeframe);
    });

}

let counterUp = (targetNumber, element, type, timeframe) => {
    let startingNumber = 0;
    let animationSpeed = 10;
    let growRatio = targetNumber / 100;

    let interval = setInterval(() => {
        if (startingNumber >= targetNumber) {
            clearInterval(interval);
        } else {
            startingNumber += growRatio;
            element.textContent = getLabel(Math.round(startingNumber), type, timeframe);
        }

    }, animationSpeed);
};

const getLabel = (hour, type, timeframe) => {

    const hourLabel = `${hour}${hour === 1 ? "hr" : "hrs"}`;

    const timeframeLabels = {
        daily: "Yesterday",
        weekly: "Last Week",
        monthly: "Last Month"
    }

    const labels = {
        current: `${hourLabel}`,
        previous: `${timeframeLabels[timeframe]} - ${hourLabel}`,
    }

    return labels[type];
}

options.forEach(option => {
    option.addEventListener("change", event => {
        loadData(event.target.value);
    })
})

loadData(document.querySelector('.menu__option:checked').value);