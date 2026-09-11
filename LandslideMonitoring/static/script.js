// ===============================
// LANDSLIDE MONITORING SIMULATION
// ===============================

let rainfall = 42;
let soilMoisture = 58;
let tilt = 2.4;
let movement = 10;


// Update dashboard
function updateDashboard() {

    // Slowly change prototype sensor values
    rainfall += (Math.random() - 0.5) * 4;
    soilMoisture += (Math.random() - 0.5) * 3;
    tilt += (Math.random() - 0.5) * 0.2;
    movement += (Math.random() - 0.5) * 2;

    // Keep values realistic
    rainfall = Math.max(0, Math.min(150, rainfall));
    soilMoisture = Math.max(0, Math.min(100, soilMoisture));
    tilt = Math.max(0, Math.min(15, tilt));
    movement = Math.max(0, Math.min(100, movement));


    // Calculate risk
    let rainfallRisk = Math.min(rainfall / 150 * 100, 100);
    let soilRisk = soilMoisture;
    let tiltRisk = Math.min(tilt / 15 * 100, 100);
    let movementRisk = movement;

    let riskScore =
        rainfallRisk * 0.20 +
        soilRisk * 0.30 +
        tiltRisk * 0.30 +
        movementRisk * 0.20;

    riskScore = Math.round(riskScore);


    // Update values
    document.getElementById("rainfall").innerText =
        rainfall.toFixed(0);

    document.getElementById("soilMoisture").innerText =
        soilMoisture.toFixed(0);

    document.getElementById("tilt").innerText =
        tilt.toFixed(1);

    document.getElementById("riskScore").innerText =
        riskScore;


    // Update table
    document.getElementById("tableRain").innerText =
        rainfall.toFixed(0) + " mm";

    document.getElementById("tableSoil").innerText =
        soilMoisture.toFixed(0) + "%";

    document.getElementById("tableTilt").innerText =
        tilt.toFixed(1) + "°";


    // Determine risk level
    updateRiskStatus(riskScore);
}


// =================================
// RISK STATUS
// =================================

function updateRiskStatus(score) {

    let status = document.getElementById("riskStatus");

    if (score < 40) {

        status.innerText = "SAFE";
        status.style.color = "#16a34a";

    } 
    else if (score < 60) {

        status.innerText = "WARNING";
        status.style.color = "#f59e0b";

    } 
    else if (score < 80) {

        status.innerText = "DANGER";
        status.style.color = "#ea580c";

    } 
    else {

        status.innerText = "CRITICAL";
        status.style.color = "#dc2626";

    }
}


// =================================
// WARNING MESSAGE
// =================================

function sendWarning() {

    alert(
        "⚠️ WARNING\n\n" +
        "Increasing landslide risk detected.\n" +
        "Monitoring has been intensified.\n\n" +
        "No alarm activated."
    );
}


// =================================
// CRITICAL ALARM
// =================================

function activateAlarm() {

    document.getElementById("alarmText").innerText =
        "🚨 CRITICAL CONDITION — ALARM ACTIVE";

    alert(
        "🚨 CRITICAL LANDSLIDE ALERT!\n\n" +
        "Severe slope instability detected.\n" +
        "Emergency alarm activated."
    );
}


// Update every 3 seconds
setInterval(updateDashboard, 3000);

// Initial update
updateDashboard();
// =================================
// PROTOTYPE SIMULATOR
// =================================

const rainSlider = document.getElementById("rainSlider");
const soilSlider = document.getElementById("soilSlider");
const tiltSlider = document.getElementById("tiltSlider");
const movementSlider = document.getElementById("movementSlider");


function calculateSimulation() {

    let rain = Number(rainSlider.value);
    let soil = Number(soilSlider.value);
    let tilt = Number(tiltSlider.value);
    let movement = Number(movementSlider.value);


    // Display slider values

    document.getElementById("rainValue").innerText =
        rain;

    document.getElementById("soilValue").innerText =
        soil;

    document.getElementById("tiltValue").innerText =
        tilt.toFixed(1);

    document.getElementById("movementValue").innerText =
        movement;


    // Convert parameters to risk values

    let rainRisk = Math.min((rain / 150) * 100, 100);

    let soilRisk = soil;

    let tiltRisk = Math.min((tilt / 15) * 100, 100);

    let movementRisk = movement;


    // Multi-sensor risk calculation

    let risk =
        (rainRisk * 0.20) +
        (soilRisk * 0.30) +
        (tiltRisk * 0.30) +
        (movementRisk * 0.20);


    risk = Math.round(risk);


    document.getElementById("simulationRisk").innerText =
        risk + "/100";


    let status =
        document.getElementById("simulationStatus");

    let message =
        document.getElementById("simulationMessage");


    // SAFE

    if (risk < 40) {

        status.innerText = "🟢 SAFE";
        status.style.color = "#16a34a";

        message.innerText =
            "Conditions are stable. No alert required.";

    }


    // WARNING

    else if (risk < 60) {

        status.innerText = "🟡 WARNING";
        status.style.color = "#f59e0b";

        message.innerText =
            "Warning message should be sent. Alarm remains OFF.";

    }


    // DANGER

    else if (risk < 80) {

        status.innerText = "🟠 DANGER";
        status.style.color = "#ea580c";

        message.innerText =
            "High-risk condition detected. Send priority warning. Alarm remains OFF.";

    }


    // CRITICAL

    else {

        status.innerText = "🔴 CRITICAL";
        status.style.color = "#dc2626";

        message.innerText =
            "CRITICAL condition! Send emergency message and activate alarm.";

    }
}


// Run whenever a slider changes

rainSlider.addEventListener("input", calculateSimulation);

soilSlider.addEventListener("input", calculateSimulation);

tiltSlider.addEventListener("input", calculateSimulation);

movementSlider.addEventListener("input", calculateSimulation);


// Initial calculation

calculateSimulation();