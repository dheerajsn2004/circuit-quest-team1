const questions = {
    1: [
        { q: "The unit of resistance is ___.", a: "ohm", clue: "Resistor" },
        { q: "An LED emits ___ when current flows through it.", a: "light", clue: "LED" },
        { q: "A capacitor stores ___ energy.", a: "electrical", clue: "Capacitor" }
    ],
    2: [
        { q: "A diode allows current in ___ direction.", a: "one", clue: "Diode" },
        { q: "The SI unit of capacitance is ___.", a: "farad", clue: "Capacitor" },
        { q: "The device used to measure current is called ___.", a: "ammeter", clue: "Ammeter" }
    ],
    3: [
        { q: "The transistor is used for ___.", a: "amplification", clue: "Transistor" },
        { q: "The voltage regulator IC is ___.", a: "7805", clue: "Voltage Regulator" },
        { q: "A fuse is used for ___.", a: "protection", clue: "Fuse" }
    ],
    4: [
        { q: "A Zener diode is used for ___.", a: "voltage regulation", clue: "Zener Diode" },
        { q: "A photodiode detects ___.", a: "light", clue: "Photodiode" },
        { q: "A potentiometer is used to vary ___.", a: "resistance", clue: "Potentiometer" }
    ],
    5: [
        { q: "The basic unit of inductance is ___.", a: "henry", clue: "Inductor" },
        { q: "A rectifier converts AC to ___.", a: "dc", clue: "Rectifier" },
        { q: "A relay is used for ___.", a: "switching", clue: "Relay" }
    ],
    6: [
        { q: "An oscilloscope is used to measure ___.", a: "waveform", clue: "Oscilloscope" },
        { q: "A thermistor is used to measure ___.", a: "temperature", clue: "Thermistor" },
        { q: "The SI unit of frequency is ___.", a: "hertz", clue: "Oscillator" }
    ],
    7: [
        { q: "A microphone converts sound into ___.", a: "electric signal", clue: "Microphone" },
        { q: "The device that stores charge is called a ___.", a: "capacitor", clue: "Capacitor" },
        { q: "A transformer is used to change ___.", a: "voltage", clue: "Transformer" }
    ],
    8: [
        { q: "An LDR changes resistance with ___.", a: "light", clue: "LDR" },
        { q: "The device used to amplify signals is ___.", a: "transistor", clue: "Transistor" },
        { q: "A motor converts electrical energy to ___.", a: "mechanical energy", clue: "Motor" }
    ],
    9: [
        { q: "An operational amplifier is used for ___.", a: "signal processing", clue: "Op-Amp" },
        { q: "A piezoelectric sensor detects ___.", a: "pressure", clue: "Piezoelectric Sensor" },
        { q: "A solar panel converts ___.", a: "light into electricity", clue: "Solar Panel" }
    ],
    10: [
        { q: "A push-button is a type of ___.", a: "switch", clue: "Push-Button" },
        { q: "A buzzer produces ___.", a: "sound", clue: "Buzzer" },
        { q: "An antenna is used for ___.", a: "signal transmission", clue: "Antenna" }
    ]
};

let currentTeam = 1;
let currentQuestions = [];
let attemptCounts = {}; // Stores number of attempts for each question

function startQuiz() {
    const teamNumber = parseInt(document.getElementById("teamNumber").value);
    if (teamNumber < 1 || teamNumber > 10 || isNaN(teamNumber)) {
        alert("Please enter a valid team number between 1 and 10.");
        return;
    }

    currentTeam = teamNumber;
    currentQuestions = questions[teamNumber]; // Each team gets its own set

    // Initialize attempt counts
    attemptCounts = {};
    currentQuestions.forEach((_, index) => {
        attemptCounts[index] = 0;
    });

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("quizPage").style.display = "block";
    document.getElementById("teamInfo").innerText = `Team ${currentTeam}, answer the questions below:`;

    const questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = "";

    currentQuestions.forEach((q, index) => {
        questionContainer.innerHTML += `
            <div class="question">
                <p>${q.q}</p>
                <input type="text" id="answer${index}" placeholder="Your Answer">
                <button onclick="checkAnswer(${index})">Submit</button>
                <p id="clue${index}" class="clue-message"></p>
            </div>
        `;
    });
}

function checkAnswer(index) {
    attemptCounts[index]++; // Track attempts

    const answer = document.getElementById(`answer${index}`).value.trim().toLowerCase();
    const correctAnswer = currentQuestions[index].a.toLowerCase();
    const clueMessage = document.getElementById(`clue${index}`);

    if (answer === correctAnswer) {
        clueMessage.innerText = `Clue: ${currentQuestions[index].clue}`;
        clueMessage.style.color = "green";
    } else {
        clueMessage.innerText = "Incorrect! Try again.";
        clueMessage.style.color = "red";
    }
}

// Admin can check attempt counts via console
function getAttempts() {
    console.log(`Attempts for Team ${currentTeam}:`, attemptCounts);
}
