// Starting health values

let health = {
    heartRate: 72,
    oxygen: 98,
    temperature: 36.7,
    sleep: 7.4,
    exercise: 54
};


// Generate random value within a range

function randomBetween(min, max, decimals = 0) {

    const value = Math.random() * (max - min) + min;

    return Number(value.toFixed(decimals));
}


// Update the dashboard

function updateHealthData() {

    health.heartRate = randomBetween(60, 105);

    health.oxygen = randomBetween(86, 100);

    health.temperature = randomBetween(36.0, 38.0, 1);

    health.sleep = randomBetween(5.5, 9.0, 1);

    health.exercise = randomBetween(20, 90);


    // Display values

    document.getElementById("heartRate").textContent =
        health.heartRate;

    document.getElementById("oxygen").textContent =
        health.oxygen;

    document.getElementById("temperature").textContent =
        health.temperature;

    document.getElementById("sleep").textContent =
        health.sleep;

    document.getElementById("exercise").textContent =
        health.exercise;


    // Progress bars

    document.getElementById("heartProgress").style.width =
        Math.min(health.heartRate, 100) + "%";

    document.getElementById("oxygenProgress").style.width =
        health.oxygen + "%";

    document.getElementById("temperatureProgress").style.width =
        ((health.temperature - 35) / 4) * 100 + "%";

    document.getElementById("sleepProgress").style.width =
        (health.sleep / 10) * 100 + "%";

    document.getElementById("exerciseProgress").style.width =
        Math.min((health.exercise / 90) * 100, 100) + "%";


    checkHealthStatus();
}


// Health status and alert logic

function checkHealthStatus() {

    const status = document.getElementById("overallStatus");

    const alertBox = document.getElementById("alertBox");

    const alertTitle = document.getElementById("alertTitle");

    const alertMessage = document.getElementById("alertMessage");


    // CRITICAL CONDITION

    if (health.oxygen < 90) {

        status.textContent = "● CRITICAL";
        status.className = "status critical";

        alertBox.classList.remove("hidden");

        alertTitle.textContent = "CRITICAL OXYGEN ALERT";

        alertMessage.textContent =
            `Oxygen level has dropped to ${health.oxygen}%. Immediate attention required.`;

        return;
    }


    // WARNING CONDITION

    if (
        health.heartRate > 100 ||
        health.temperature > 37.5 ||
        health.sleep < 6
    ) {

        status.textContent = "● WARNING";
        status.className = "status warning";

        alertBox.classList.remove("hidden");

        alertTitle.textContent = "HEALTH WARNING";

        if (health.heartRate > 100) {

            alertMessage.textContent =
                `Heart rate is elevated at ${health.heartRate} BPM.`;

        } else if (health.temperature > 37.5) {

            alertMessage.textContent =
                `Body temperature is elevated at ${health.temperature}°C.`;

        } else {

            alertMessage.textContent =
                `Sleep duration is below the recommended level.`;

        }

        return;
    }


    // NORMAL CONDITION

    status.textContent = "● NORMAL";
    status.className = "status normal";

    alertBox.classList.add("hidden");
}


// Mission clock

let missionSeconds = 42 * 24 * 60 * 60;


function updateMissionTime() {

    missionSeconds++;

    const days =
        Math.floor(missionSeconds / (24 * 60 * 60));

    const remaining =
        missionSeconds % (24 * 60 * 60);

    const hours =
        Math.floor(remaining / 3600);

    const minutes =
        Math.floor((remaining % 3600) / 60);

    const seconds =
        remaining % 60;


    document.getElementById("missionDay").textContent =
        `DAY ${days}`;


    document.getElementById("missionTime").textContent =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;


    const now = new Date();

    document.getElementById("lastUpdated").textContent =
        now.toLocaleTimeString();
}


// Initial update

updateHealthData();


// Health data changes every 5 seconds

setInterval(updateHealthData, 5000);


// Mission clock updates every second

setInterval(updateMissionTime, 1000);

updateMissionTime();