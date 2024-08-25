const analogClock = document.querySelector('.analog-clock');
const digitalClock = document.querySelector('.digital-clock');
const timezoneSelect = document.getElementById('timezone');
const clockTypeSelect = document.getElementById('clock-type');
const timeFormatSelect = document.getElementById('time-format');

const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');


function populateTimeZones() {
    const now = moment();
    const timeZones = [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    timeZones.forEach(offset => {
        const option = document.createElement('option');
        option.value = offset;
        option.textContent = `UTC${offset >= 0 ? '+' : ''}${offset}`;
        timezoneSelect.appendChild(option);
    });


    const localOffset = now.utcOffset() / 60;
    timezoneSelect.value = localOffset;
}

populateTimeZones();

function updateClock() {
    const offset = parseInt(timezoneSelect.value);
    const now = moment().utcOffset(offset * 60);
    
    console.log('Selected offset:', offset);
    console.log('Current time in selected timezone:', now.format('YYYY-MM-DD HH:mm:ss'));

    const timeFormat = timeFormatSelect.value === '12' ? 'hh:mm:ss A' : 'HH:mm:ss';
    digitalClock.textContent = now.format(timeFormat);
    
    const seconds = now.seconds();
    const minutes = now.minutes();
    const hours = now.hours();
    
    console.log('Hours:', hours, 'Minutes:', minutes, 'Seconds:', seconds);
    
    const secondsDegrees = (seconds / 60) * 360;
    const minutesDegrees = (minutes / 60) * 360;
    const hoursDegrees = ((hours % 12 + minutes / 60) / 12) * 360;
    
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

function setClockType() {
    const clockType = clockTypeSelect.value;
    if (clockType === 'analog') {
        analogClock.style.display = 'block';
        digitalClock.style.display = 'none';
    } else {
        analogClock.style.display = 'none';
        digitalClock.style.display = 'block';
    }
}


setInterval(updateClock, 1000);


timezoneSelect.addEventListener('change', updateClock);


clockTypeSelect.addEventListener('change', setClockType);


timeFormatSelect.addEventListener('change', updateClock);


updateClock();
setClockType();



let stopwatchInterval;
let stopwatchTime = 0;
const stopwatchDisplay = document.querySelector('.stopwatch-display');
const startStopwatchBtn = document.getElementById('startStopwatch');
const pauseStopwatchBtn = document.getElementById('pauseStopwatch');
const resetStopwatchBtn = document.getElementById('resetStopwatch');

function updateStopwatch() {
    stopwatchTime += 10;
    const formattedTime = moment.utc(stopwatchTime).format('HH:mm:ss.SSS');
    stopwatchDisplay.textContent = formattedTime;
}

startStopwatchBtn.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(updateStopwatch, 10);
});

pauseStopwatchBtn.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
});

resetStopwatchBtn.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    stopwatchDisplay.textContent = '00:00:00.000';
});


let timerInterval;
let timerTime = 0;
const timerDisplay = document.querySelector('.timer-display');
const startTimerBtn = document.getElementById('startTimer');
const pauseTimerBtn = document.getElementById('pauseTimer');
const resetTimerBtn = document.getElementById('resetTimer');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

function updateTimer() {
    if (timerTime > 0) {
        timerTime -= 1000;
        const formattedTime = moment.utc(timerTime).format('HH:mm:ss');
        timerDisplay.textContent = formattedTime;
    } else {
        clearInterval(timerInterval);
        alert('Timer finished!');
    }
}

startTimerBtn.addEventListener('click', () => {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    timerTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});

pauseTimerBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
});

resetTimerBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerTime = 0;
    timerDisplay.textContent = '00:00:00';
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
});


const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});
