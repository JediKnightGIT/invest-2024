const deposit = document.getElementById('deposit');
const depositInput = document.getElementById('deposit-input');
const depositRange = document.getElementById('deposit-range');

const months = document.getElementById('months');
const monthsInput = document.getElementById('months-input');
const monthsRange = document.getElementById('months-range');

depositInput.addEventListener('input', () => calc(depositInput, depositRange, deposit));
monthsInput.addEventListener('input', () => calc(monthsInput, monthsRange, months));

function calc(input, range, text) {
  const min = parseInt(input.min);
  const max = parseInt(input.max);
  const val = parseInt(input.value);
  const percent = (val - min) / (max - min) * 100;
  range.style.width = percent + '%';
  text.innerText = val
}