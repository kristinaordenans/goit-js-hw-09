import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('button');
startBtnEl.setAttribute(`disabled`, ``);

let timeId = null;

startBtnEl.addEventListener('click', startCountToDate);

const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
       clearInterval(timeId)
       if (selectedDates[0]< options.defaultDate) {
           Notiflix.Notify.failure('Please choose a date in the future');
           return;
        } else {
          startBtnEl.removeAttribute(`disabled`, ``);
        }
    },
};

function addLeadingZero(value){
  return value.toString().padStart(2, `0`);
}

function startCountToDate() {
    options.isActive = true;
  startBtnEl.setAttribute(`disabled`, ``);
    timeId = setInterval(() => {
        const currentDate = new Date();
        let targetDate = new Date(inputEl.value);
        const time = targetDate - currentDate;
        const { days, hours, minutes, seconds } = convertMs(time);

           if (time >= 0) {
                daysEl.textContent = addLeadingZero(days);
                hoursEl.textContent = addLeadingZero(hours);
                minutesEl.textContent = addLeadingZero(minutes);
                secondsEl.textContent = addLeadingZero(seconds);
           } else {
               clearInterval(timeId);
               Notiflix.Notify.success(`Yippee!`);
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

flatpickr("#datetime-picker", options);







