const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const stopAlarmButton = document.getElementById('stopAlarmButton');
const timeInput = document.getElementById('time');
const timerDisplay = document.getElementById('timerDisplay');
let countdown;
let alarmSound = new Audio('alarm.mp3');
let remainingTime;

function startTimer() {
  const minutes = parseInt(timeInput.value, 10);
  if (isNaN(minutes) || minutes <= 0) {
    alert('Insira um tempo válido!');
    return;
  }
  
function loadTimerFromLocalStorage() {
  const savedTime = localStorage.getItem('remainingTime');
  if (savedTime !== null) {
    remainingTime = parseInt(savedTime, 10);
    if (!isNaN(remainingTime)) {
      updateTimeDisplay(remainingTime);
      if (remainingTime > 0) {
        startButton.style.display = 'none';
        pauseButton.style.display = 'block';
        stopAlarmButton.style.display = 'none';
        countdown = setInterval(() => {
          remainingTime--;
          if (remainingTime >= 0) {
            updateTimeDisplay(remainingTime);
          } else {
            clearInterval(countdown);
            playAlarm();
            pauseButton.style.display = 'none';
            stopAlarmButton.style.display = 'block';
          }
        }, 1000);
      }
    }
  }
}

  const totalSeconds = minutes * 60;

  startButton.style.display = 'none';
  pauseButton.style.display = 'block';
  timeInput.disabled = true;
  stopAlarmButton.style.display = 'none';

  remainingTime = totalSeconds;

  countdown = setInterval(() => {
    remainingTime--;
    if (remainingTime >= 0) {
      updateTimeDisplay(remainingTime);
    } else {
      clearInterval(countdown);
      playAlarm();
      pauseButton.style.display = 'none';
      stopAlarmButton.style.display = 'block';
    }
  }, 1000);
}

function updateTimeDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsToShow = seconds % 60;
  timerDisplay.textContent = `${minutes}:${secondsToShow < 10 ? '0' : ''}${secondsToShow}`;
}

function pauseTimer() {
  clearInterval(countdown);
  startButton.style.display = 'block';
  pauseButton.style.display = 'none';
  stopAlarmButton.style.display = 'block';
}

function playAlarm() {
  alarmSound.play();
}

function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  stopAlarmButton.style.display = 'none';
  pauseButton.style.display = 'block';
  timerDisplay.textContent = '';
  timeInput.disabled = false;
}

timeInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    if (startButton.style.display === 'none') {
      pauseTimer();
    } else {
      startTimer();
    }
  }
});

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopAlarmButton.addEventListener('click', stopAlarm);
