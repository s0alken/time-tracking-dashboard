const options = document.querySelectorAll(".menu__option");
const cards = document.querySelectorAll(".card");

const loadData = async (timeframe) => {

    const response = await fetch("../data.json");
    const data = await response.json();

    data.forEach((activity, idx) => {
        const { current, previous } = activity.timeframes[timeframe];
        const card = cards[idx];

        counterUp(current, card.querySelector(".card__current"), "current");
        counterUp(previous, card.querySelector(".card__previous"), "previous");
    });

}

let counterUp = (targetNumber, element, type) => {
    let startingNumber = 0;
    let animationSpeed = 10;
    let growRatio = targetNumber / 100;

    let interval = setInterval(() => {
        if (startingNumber >= targetNumber) {
            clearInterval(interval);
        } else {
            startingNumber += growRatio;
            element.textContent = getLabel(startingNumber, type);
        }

    }, animationSpeed);
};

const getLabel = (hour, type) => {

    hour = Math.round(hour);

    const hourLabel = `${hour}${hour === 1 ? "hr" : "hrs"}`;

    const labels = {
        current: `${hourLabel}`,
        previous: `Last Week - ${hourLabel}`,
    }

    return labels[type];
}

options.forEach(option => {
    option.addEventListener("change", event => {
        loadData(event.target.value);
    })
})

loadData(document.querySelector('.menu__option:checked').value);