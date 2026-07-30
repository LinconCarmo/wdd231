// join.js

const timestamp = document.querySelector("#timestamp");

timestamp.value = new Date().toISOString();

const links = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close");

links.forEach(link => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const modal = document.querySelector(`#${link.dataset.modal}`);

        modal.showModal();

    });

});

closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.parentElement.close();

    });

});