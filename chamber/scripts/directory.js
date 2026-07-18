const membersContainer = document.querySelector("#members");

const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");

async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {

        membersContainer.innerHTML = "<p>Unable to load member information.</p>";
        console.error(error);

    }

}

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="${member.image}"
                alt="${member.name} logo"
                width="180"
                height="180"
                loading="lazy">

            <h2>${member.name}</h2>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            </p>

            <p>Membership Level: ${member.membership}</p>
        `;

        membersContainer.appendChild(card);

    });

}

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");

});

listButton.addEventListener("click", () => {

    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");

});

getMembers();