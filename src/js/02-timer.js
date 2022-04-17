import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const chooseDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysOutput = document.querySelector('.value[data-days]');
const hoursOutput = document.querySelector('.value[data-hours]');
const minutesOutput = document.querySelector('.value[data-minutes]');
const secondsOutput = document.querySelector('.value[data-seconds]');
let endDate = 0;
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      endDate = selectedDates[0].getTime();
      console.log(endDate - options.defaultDate.getTime());
    }
  },
};

flatpickr(chooseDate, options);

startBtn.addEventListener('click', startingCounter);

function startingCounter() {
  timerId = setInterval(() => {
    const currentTime = Date.now();
    let currentValue = {};
    if (endDate > currentTime) {
      currentValue = convertMs(endDate - currentTime);
      daysOutput.textContent = pad(currentValue.days);
      hoursOutput.textContent = pad(currentValue.hours);
      minutesOutput.textContent = pad(currentValue.minutes);
      secondsOutput.textContent = pad(currentValue.seconds);
      console.log(currentValue);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
