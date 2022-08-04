const options = document.querySelectorAll(".menu__option");
const cards = document.querySelectorAll(".card");

const loadData = async (timeframe) => {

    const response = await fetch("../data.json");
    const data = await response.json();

    data.forEach((activity, idx) => {
        const {current, previous} = activity.timeframes[timeframe];
        const card = cards[idx];

        card.querySelector(".card__current").textContent = `${current}hrs`;
        card.querySelector(".card__previous").textContent = `Last Week - ${previous}hrs`;
    });

}

options.forEach(option => {
    option.addEventListener("change", event => {
        loadData(event.target.value);
    })
})

loadData(document.querySelector('.menu__option:checked').value);