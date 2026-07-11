
const courses = [
    {
        code: "WDD 130",
        name: "Web Fundamentals",
        credits: 2,
        subject: "WDD",
        completed: true
    },
    {
        code: "WDD 131",
        name: "Dynamic Web Fundamentals",
        credits: 2,
        subject: "WDD",
        completed: true
    },
    {
        code: "WDD 231",
        name: "Web Frontend Development I",
        credits: 2,
        subject: "WDD",
        completed: false
    },
    {
        code: "CSE 110",
        name: "Programming Building Blocks",
        credits: 2,
        subject: "CSE",
        completed: true
    },
    {
        code: "CSE 111",
        name: "Programming with Functions",
        credits: 2,
        subject: "CSE",
        completed: true
    },
    {
        code: "CSE 210",
        name: "Programming with Classes",
        credits: 2,
        subject: "CSE",
        completed: false
    }
];

const courseContainer = document.querySelector("#courses");
const creditDisplay = document.querySelector("#credits");

function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const div = document.createElement("div");

        div.classList.add("course");

        if (course.completed) {
            div.classList.add("completed");
        }

        div.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
        `;

        courseContainer.appendChild(div);

    });

    const totalCredits = courseList.reduce((total, course) => total + course.credits, 0);

    creditDisplay.textContent = `Total Credits: ${totalCredits}`;

}

displayCourses(courses);

document.querySelector("#all").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd").addEventListener("click", () => {

    const wddCourses = courses.filter(course => course.subject === "WDD");

    displayCourses(wddCourses);

});

document.querySelector("#cse").addEventListener("click", () => {

    const cseCourses = courses.filter(course => course.subject === "CSE");

    displayCourses(cseCourses);

});