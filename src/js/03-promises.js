import { reject } from 'lodash';
import { resolve } from 'path-browserify';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}
const delayForm = document.querySelector('.form');
let interval = null;
let amountValue = 0;

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  console.log(Number(step.value));
  setTimeout(() => {
    interval = setInterval(() => {
      amountValue += 1;
      if (amountValue <= Number(amount.value)) {
        createPromise(amountValue, Number(delay.value))
          .then(onSuccess)
          .catch(onError);
      } else {
        clearInterval(interval);
      }
    }, Number(step.value));
  }, Number(delay.value));
}

delayForm.addEventListener('submit', handleSubmit);

function onSuccess(result) {
  Notify.success(result);
}

function onError(result) {
  Notify.failure(result);
}
