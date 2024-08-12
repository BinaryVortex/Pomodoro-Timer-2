// Variables
let workMinutes = 25;
let breakMinutes = 5;
let longBreakMinutes = 15;
let currentMinutes = workMinutes;
let currentSeconds = 0;
let interval;
let sessionCount = 0;
let isPaused = false;

// DOM Elements
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const sessionStatus = document.getElementById('session-status');
const goalProgress = document.getElementById('goal-progress');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Functions
function updateDisplay() {
    minutesElement.textContent = currentMinutes.toString().padStart(2, '0');
    secondsElement.textContent = currentSeconds.toString().padStart(2, '0');
}

function startTimer() {
    if (isPaused) {
        isPaused = false;
    } else {
        currentMinutes = workMinutes;
        currentSeconds = 0;
        sessionCount++;
        updateSessionStatus();
    }
    interval = setInterval(() => {
        if (currentSeconds === 0) {
            if (currentMinutes === 0) {
                clearInterval(interval);
                handleSessionComplete();
            } else {
                currentMinutes--;
                currentSeconds = 59;
            }
        } else {
            currentSeconds--;
        }
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(interval);
    isPaused = true;
}

function stopTimer() {
    clearInterval(interval);
    currentMinutes = workMinutes;
    currentSeconds = 0;
    updateDisplay();
    isPaused = false;
}

function resetTimer() {
    clearInterval(interval);
    currentMinutes = workMinutes;
    currentSeconds = 0;
    sessionCount = 0;
    updateSessionStatus();
    updateDisplay();
}

function handleSessionComplete() {
    if (sessionCount % 4 === 0) {
        currentMinutes = longBreakMinutes;
        sessionStatus.textContent = `Long Break ${sessionCount / 4}`;
    } else if (sessionCount % 2 === 0) {
        currentMinutes = breakMinutes;
        sessionStatus.textContent = `Break ${sessionCount / 2}`;
    } else {
        currentMinutes = workMinutes;
        sessionStatus.textContent = `Session ${Math.ceil(sessionCount / 2)}`;
    }
    goalProgress.textContent = `Goal Progress: ${Math.floor(sessionCount / 2)}/4`;
    startTimer();
}

function updateSessionStatus() {
    if (sessionCount % 4 === 0 && sessionCount > 0) {
        sessionStatus.textContent = `Long Break ${sessionCount / 4}`;
    } else if (sessionCount % 2 === 0 && sessionCount > 0) {
        sessionStatus.textContent = `Break ${sessionCount / 2}`;
    } else {
        sessionStatus.textContent = `Session ${Math.ceil(sessionCount / 2)}`;
    }
}

// Event Listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay(); // Initial display update
