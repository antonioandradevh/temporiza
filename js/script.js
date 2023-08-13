// script.js
const startButton = document.getElementById('startButton');
const cancelButton = document.getElementById('cancelButton');
const stopAlarmButton = document.getElementById('stopAlarmButton');
const timeInput = document.getElementById('time');
const timerDisplay = document.getElementById('timerDisplay');
let countdown;
let alarmSound = new Audio('alarm.mp3');

function startTimer() {
    const minutes = parseInt(timeInput.value, 10);
    if (isNaN(minutes) || minutes <= 0) {
      alert('Insira um tempo válido!');
      return;
    }
  
    const totalSeconds = minutes * 60;
  
    startButton.style.display = 'none';
    cancelButton.style.display = 'block';
    timeInput.disabled = true;
    stopAlarmButton.style.display = 'none';
  
    let remainingTime = totalSeconds;
  
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
  timeInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      startTimer();
    }
  });  

function updateTimeDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsToShow = seconds % 60;
    
    const displayMinutes = minutes > 0 ? `${minutes} minuto${minutes !== 1 ? 's' : ''}` : '';
    const displaySeconds = secondsToShow > 0 ? `${secondsToShow} segundo${secondsToShow !== 1 ? 's' : ''}` : '';
  
    const displayText = [displayMinutes, displaySeconds].filter(Boolean).join(' e ');
    timerDisplay.textContent = displayText;
    document.title = `${displayText} - Temporizador`;
  }
  

function resetTimer() {
  startButton.style.display = 'block';
  cancelButton.style.display = 'none';
  timeInput.disabled = false;
  timerDisplay.textContent = '';
}

function playAlarm() {
  alarmSound.play();
  stopAlarmButton.style.display = 'block';
}

function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  stopAlarmButton.style.display = 'none';
  resetTimer();
}

startButton.addEventListener('click', startTimer);
cancelButton.addEventListener('click', () => {
  clearInterval(countdown);
  stopAlarm();
});
stopAlarmButton.addEventListener('click', stopAlarm);
