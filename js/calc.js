const deposit = document.getElementById('deposit');
const depositInput = document.getElementById('deposit-input');
const depositRange = document.getElementById('deposit-range');

const months = document.querySelectorAll('[data-period]');
const monthsInput = document.getElementById('months-input');
const monthsRange = document.getElementById('months-range');

const payments = document.getElementById('payments');
const rateText = document.getElementById('rate-text')

depositInput.addEventListener('input', () => calc(depositInput, depositRange, deposit));
monthsInput.addEventListener('input', () => calc(monthsInput, monthsRange, months));
payments.addEventListener('click', changeRate);

function calc(input, range, text) {
  const min = parseInt(input.min);
  const max = parseInt(input.max);
  const val = parseInt(input.value);
  const percent = (val - min) / (max - min) * 100;
  range.style.width = percent + '%';
  if (text.length) {
    text.forEach((item) => item.innerText = val)
  } else {
    text.innerText = val
  }
}

function changeRate() {
  const rates = [19.8, 20.6, 21, 25]
  const payments = [...document.querySelectorAll('[data-payment]')];
  const index = payments.findIndex((item) => item.classList.contains("active"))

  rateText.innerText = rates[index]
}