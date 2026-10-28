// My Gym - scripts

// ---------- Opening hours ----------

// [opens, closes] per weekday, 0 = Sunday
const openingHours = {
    0: null,
    1: [7, 22],
    2: [7, 22],
    3: [7, 22],
    4: [7, 22],
    5: [7, 22],
    6: [9, 18],
};

function showOpeningStatus() {
    const status = document.getElementById("status");
    const now = new Date();
    const today = now.getDay();
    const time = now.getHours() + now.getMinutes() / 60;
    const hours = openingHours[today];

    // highlight today's row in the opening hours list
    document.querySelectorAll("#hours [data-days]").forEach((row) => {
        if (row.dataset.days.split(",").includes(String(today))) {
            row.classList.add("today");
        }
    });

    if (hours && time >= hours[0] && time < hours[1]) {
        status.textContent = "Jetzt geöffnet bis " + hours[1] + ":00 Uhr";
        status.classList.add("open");
    } else {
        status.textContent = "Gerade geschlossen";
    }
}

showOpeningStatus();

// ---------- Mobile menu ----------

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen);
});

menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", false);
    });
});

// ---------- Course filter ----------

const filterButtons = document.querySelectorAll(".filter button");
const courses = document.querySelectorAll(".course");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const day = button.dataset.filter;

        filterButtons.forEach((other) => {
            other.setAttribute("aria-pressed", other === button);
        });

        courses.forEach((course) => {
            const days = course.dataset.days.split(",");
            course.hidden = !(day === "all" || days.includes(day));
        });
    });
});

// ---------- BMI calculator ----------

const bmiForm = document.getElementById("bmi-form");

bmiForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const weight = Number(document.getElementById("weight").value);
    const height = Number(document.getElementById("height").value);
    const result = document.getElementById("bmi-result");

    if (!weight || !height) {
        result.textContent = "Bitte gib Gewicht und Größe ein.";
        return;
    }

    const bmi = weight / ((height / 100) ** 2);

    let range;
    if (bmi < 18.5) {
        range = "unter dem Normalbereich";
    } else if (bmi < 25) {
        range = "im Normalbereich";
    } else if (bmi < 30) {
        range = "über dem Normalbereich";
    } else {
        range = "deutlich über dem Normalbereich";
    }

    result.textContent = "Dein BMI ist " + bmi.toFixed(1).replace(".", ",") + " und liegt " + range + ".";
});

// ---------- Contact form ----------

const contactForm = document.getElementById("contact-form");

function setError(fieldId, message) {
    document.getElementById(fieldId + "-error").textContent = message;
    document.getElementById(fieldId).setAttribute("aria-invalid", message !== "");
}

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const result = document.getElementById("form-result");
    let isValid = true;

    result.textContent = "";

    if (name.length < 2) {
        setError("name", "Bitte gib deinen Namen ein.");
        isValid = false;
    } else {
        setError("name", "");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email)) {
        setError("email", "Bitte gib eine gültige E-Mail-Adresse ein, zum Beispiel name@beispiel.de.");
        isValid = false;
    } else {
        setError("email", "");
    }

    if (!isValid) {
        return;
    }

    // TODO: send the data to a backend with fetch()
    result.textContent = "Danke! Deine Nachricht ist angekommen. Wir melden uns bald.";
    contactForm.reset();
});
