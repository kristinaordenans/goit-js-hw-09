import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

const formEl = document.querySelector('.form');
const submitBtn = document.querySelector('button');
submitBtn.setAttribute(`disabled`, ``);

formEl.addEventListener(`input`, throttle(checkInputValue, 1000));
formEl.addEventListener('submit', handleSubmitBnt);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
        if (shouldResolve) {
        resolve(`Fulfiled ${position} in ${delay} ms`)
        } else {
        reject(`Rejected ${position} in ${delay} ms`)
        }
    }, delay)
  })
}

function checkInputValue() {
  if (Number(formEl.elements.delay.value) && Number(formEl.elements.step.value) &&  Number(formEl.elements.amount.value)){
    submitBtn.removeAttribute("disabled");
  } 
}

function handleSubmitBnt(e){
    e.preventDefault();
  let delay = Number(formEl.elements.delay.value);
  for (let i = 1; i <=  Number(formEl.elements.amount.value); i += 1) {
    console.log(delay);
    createPromise(i, delay).
      then(resolve => Notiflix.Notify.success(resolve)).
      catch(reject => Notiflix.Notify.failure(reject));
      delay += Number(formEl.elements.step.value);
  }
  formEl.reset();
}





