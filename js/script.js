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

// Restante do código

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopAlarmButton.addEventListener('click', stopAlarm);
