const trainings = [
    { name: "Силове тренування", description: "Комплекс вправ для нарощування м'язової маси.", image: "https://hips.hearstapps.com/hmg-prod/images/powerlifter-with-strong-arms-lifting-weights-royalty-free-image-595768514-1546267269.jpg", video: "videos/strength-training.mp4", calories: 300 },
    { name: "Кардіо", description: "Вправи для підвищення витривалості.", image: "https://www.shape.com/thmb/DjCIHGX6cWaIniuqHeBAAreNE08=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-cardio-exercises-promo-2000-498cbfb8f07541b78572bf810e7fb600.jpg", video: "videos/cardio.mp4", calories: 200 },
    { name: "Йога", description: "Розслаблення та розвиток гнучкості.", image: "https://a.storyblok.com/f/97382/2000x1500/4c15e1224b/cover-benefits-of-yoga-and-meditation.png", video: "videos/yoga.mp4", calories: 100 }
];

const trainingList = document.getElementById("trainingList");
for (let index = 0; index < trainings.length; index++) {
    const training = trainings[index];
    const article = document.createElement("article");
    article.classList.add("training-card");
    article.innerHTML = `
        <img src="${training.image}" alt="${training.name}">
        <h3>${training.name}</h3>
        <p>${training.description}</p>
        <button class="startTraining" data-index="${index}">Почати тренування</button>
        <p id="status-${index}">Статус: Не почато</p>
    `;
    trainingList.appendChild(article);
}

document.querySelectorAll(".startTraining").forEach(button => {
    button.addEventListener("click", function() {
        const trainingIndex = this.getAttribute("data-index");
        const training = trainings[trainingIndex];
        const statusElement = document.getElementById(`status-${trainingIndex}`);
        const completedWorkoutsElement = document.getElementById("completed-workouts");
        const burnedCaloriesElement = document.getElementById("burned-calories");

        statusElement.textContent = "Статус: Пройдено";

        const completedWorkouts = parseInt(completedWorkoutsElement.textContent) + 1;
        completedWorkoutsElement.textContent = completedWorkouts;

        burnedCaloriesElement.textContent = `${parseInt(burnedCaloriesElement.textContent) + training.calories} ккал`;

        const log = document.getElementById("trainingLog");
        const logEntry = document.createElement("li");
        logEntry.textContent = `Тренування: ${training.name} | Час: ${new Date().toLocaleTimeString()}`;
        log.appendChild(logEntry);
    });
});

document.getElementById("toggleDietForm").addEventListener("click", function() {
    const dietFormContainer = document.getElementById("dietFormContainer");
    if (dietFormContainer.style.display === "none" || dietFormContainer.style.display === "") {
        dietFormContainer.style.display = "block";
    } else {
        dietFormContainer.style.display = "none";
    }
});

document.getElementById("diet-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const meal = document.getElementById("meal").value;
    const calories = document.getElementById("calories").value;

    const dietList = document.getElementById("dietList");
    const listItem = document.createElement("li");
    listItem.textContent = `${meal} - ${calories} ккал`;
    dietList.appendChild(listItem);


    document.getElementById("meal").value = "";
    document.getElementById("calories").value = "";
});
