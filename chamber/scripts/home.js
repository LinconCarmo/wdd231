const currentTemp = document.querySelector("#currentTemp");
const weatherDesc = document.querySelector("#weatherDesc");
const forecast = document.querySelector("#forecast");
const spotlights = document.querySelector("#spotlights");

const apiKey = "4d7bc23621581eb72d92a0621b33c9ff";

const url = `https://api.openweathermap.org/data/2.5/forecast?q=Curitiba&units=metric&appid=${apiKey}`;

console.log(url);

async function getWeather() {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to load weather data.");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {

        console.error(error);

        currentTemp.textContent = "Weather unavailable.";

    }

}

function displayWeather(data) {

    currentTemp.textContent =
        `Current Temperature: ${Math.round(data.list[0].main.temp)}°C`;

    weatherDesc.textContent =
        data.list[0].weather[0].description;

    forecast.innerHTML = "";

    const days = [8, 16, 24];

    days.forEach(day => {

        const date = new Date(data.list[day].dt_txt);

        const options = {
            weekday: "long"
        };

        const dayName = date.toLocaleDateString("en-US", options);

        const p = document.createElement("p");

        p.textContent =
            `${dayName}: ${Math.round(data.list[day].main.temp)}°C`;

        forecast.appendChild(p);

    });

}

async function getSpotlights() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        displaySpotlights(members);

    } catch (error) {

        console.error(error);

    }

}

function displaySpotlights(members) {

    spotlights.innerHTML = "";

    const featured = members.filter(member =>
        member.membership === "Gold" ||
        member.membership === "Silver"
    );

    featured.sort(() => 0.5 - Math.random());

    const selected = featured.slice(0, 3);

    selected.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img
                src="${member.image}"
                alt="${member.name} logo"
                width="120"
                height="120"
                loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.phone}</p>

            <p>${member.address}</p>

            <p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            </p>

            <p>${member.membership} Member</p>
        `;

        spotlights.appendChild(card);

    });

}

getWeather();

getSpotlights();