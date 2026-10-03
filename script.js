// ==========================================
// ORBITAL HEALTH
// Astronaut Health Monitoring Dashboard
// ==========================================


// ------------------------------------------
// INITIAL HEALTH DATA
// ------------------------------------------

let health = {
    heartRate: 72,
    oxygen: 98,
    temperature: 36.7,
    sleep: 7.4,
    exercise: 54
};


// ------------------------------------------
// MISSION CLOCK
// Starting from Mission Day 42
// ------------------------------------------

let missionSeconds = 42 * 24 * 60 * 60;


// ------------------------------------------
// HELPER FUNCTION
// Generate random value
// ------------------------------------------

function randomBetween(min, max, decimals = 0) {

    const value = Math.random() * (max - min) + min;

    return Number(value.toFixed(decimals));
}


// ------------------------------------------
// UPDATE HEALTH DATA
// ------------------------------------------

function updateHealthData() {

    // Generate simulated astronaut data

    health.heartRate =
        randomBetween(60, 105);

    health.oxygen =
        randomBetween(86, 100);

    health.temperature =
        randomBetween(36.0, 38.0, 1);

    health.sleep =
        randomBetween(5.5, 9.0, 1);

    health.exercise =
        randomBetween(20, 90);


    // --------------------------------------
    // UPDATE VALUES ON SCREEN
    // --------------------------------------

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


    // --------------------------------------
    // TEMPERATURE VISUAL
    // --------------------------------------

    const temperatureProgress =
        document.getElementById("temperatureProgress");

    let temperatureWidth =
        ((health.temperature - 35) / 4) * 100;

    temperatureWidth =
        Math.max(5, Math.min(100, temperatureWidth));

    temperatureProgress.style.width =
        temperatureWidth + "%";


    // --------------------------------------
    // UPDATE OXYGEN RING
    // --------------------------------------

    const oxygenRing =
        document.querySelector(".oxygen-ring");

    if (oxygenRing) {

        const oxygenPercentage =
            Math.max(0, Math.min(100, health.oxygen));

        oxygenRing.style.background =
            `conic-gradient(
                #4c9fdb ${oxygenPercentage}%,
                #e5f3fb ${oxygenPercentage}%
            )`;

        oxygenRing.style.border =
            "5px solid #e5f3fb";

        oxygenRing.style.borderTopColor =
            "#4c9fdb";
    }


    // --------------------------------------
    // CHECK HEALTH STATUS
    // --------------------------------------

    checkHealthStatus();


    // --------------------------------------
    // UPDATE LAST UPDATED TIME
    // --------------------------------------

    updateLastUpdated();

}


// ------------------------------------------
// HEALTH STATUS + ALERT LOGIC
// ------------------------------------------

function checkHealthStatus() {

    const status =
        document.getElementById("overallStatus");

    const alertBox =
        document.getElementById("alertBox");

    const alertTitle =
        document.getElementById("alertTitle");

    const alertMessage =
        document.getElementById("alertMessage");


    // ======================================
    // CRITICAL CONDITION
    // Oxygen below 90%
    // ======================================

    if (health.oxygen < 90) {

        status.className =
            "status critical";

        status.innerHTML =
            "<span></span>CRITICAL";


        alertBox.classList.remove("hidden");

        alertTitle.textContent =
            "CRITICAL OXYGEN ALERT";

        alertMessage.textContent =
            `Oxygen saturation has dropped to ${health.oxygen}%. Immediate medical attention is required.`;

        return;
    }


    // ======================================
    // WARNING CONDITIONS
    // ======================================

    if (
        health.heartRate > 100 ||
        health.temperature > 37.5 ||
        health.sleep < 6
    ) {

        status.className =
            "status warning";

        status.innerHTML =
            "<span></span>WARNING";


        alertBox.classList.remove("hidden");

        alertTitle.textContent =
            "HEALTH WARNING";


        // Elevated heart rate

        if (health.heartRate > 100) {

            alertMessage.textContent =
                `Heart rate is elevated at ${health.heartRate} BPM.`;

        }


        // Elevated temperature

        else if (health.temperature > 37.5) {

            alertMessage.textContent =
                `Body temperature is elevated at ${health.temperature}°C.`;

        }


        // Insufficient sleep

        else if (health.sleep < 6) {

            alertMessage.textContent =
                `Sleep duration is below the recommended level at ${health.sleep} hours.`;

        }

        return;
    }


    // ======================================
    // NORMAL CONDITION
    // ======================================

    status.className =
        "status normal";

    status.innerHTML =
        "<span></span>NORMAL";


    alertBox.classList.add("hidden");

}


// ------------------------------------------
// MISSION TIME
// ------------------------------------------

function updateMissionTime() {

    missionSeconds++;


    // Calculate mission day

    const days =
        Math.floor(
            missionSeconds / (24 * 60 * 60)
        );


    // Remaining seconds in the current day

    const remaining =
        missionSeconds % (24 * 60 * 60);


    // Calculate hours

    const hours =
        Math.floor(remaining / 3600);


    // Calculate minutes

    const minutes =
        Math.floor(
            (remaining % 3600) / 60
        );


    // Calculate seconds

    const seconds =
        remaining % 60;


    // --------------------------------------
    // DISPLAY MISSION DAY
    // --------------------------------------

    const missionDay =
        document.getElementById("missionDay");

    missionDay.textContent =
        `DAY ${days}`;


    // --------------------------------------
    // DISPLAY MISSION TIME
    // --------------------------------------

    const missionTime =
        document.getElementById("missionTime");

    missionTime.textContent =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;

}


// ------------------------------------------
// LAST UPDATED TIME
// ------------------------------------------

function updateLastUpdated() {

    const lastUpdated =
        document.getElementById("lastUpdated");

    const now =
        new Date();


    lastUpdated.textContent =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

}


// ------------------------------------------
// ADD SMALL INTERACTION TO HEALTH CARDS
// ------------------------------------------

function enableCardInteractions() {

    const cards =
        document.querySelectorAll(".health-card");


    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.cursor = "default";

        });

    });

}


// ------------------------------------------
// INITIALIZE DASHBOARD
// ------------------------------------------

function initializeDashboard() {

    // Generate first health reading

    updateHealthData();


    // Start mission clock

    updateMissionTime();


    // Enable card interactions

    enableCardInteractions();

}


// ------------------------------------------
// RUN DASHBOARD
// ------------------------------------------

initializeDashboard();


// ------------------------------------------
// AUTOMATIC HEALTH UPDATE
// Every 5 seconds
// ------------------------------------------

setInterval(() => {

    updateHealthData();

}, 5000);


// ------------------------------------------
// MISSION CLOCK UPDATE
// Every second
// ------------------------------------------

setInterval(() => {

    updateMissionTime();

}, 1000);
