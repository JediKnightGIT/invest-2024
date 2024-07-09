const deposit = document.getElementById('deposit');
const depositInput = document.getElementById('deposit-input');
const depositRange = document.getElementById('deposit-range');
const roiInput = document.getElementById('roi')
const yieldInput = document.getElementById('yield')
const rateInput = document.getElementById('rate')

const months = document.querySelectorAll('[data-period]');
const monthsInput = document.getElementById('months-input');
const monthsRange = document.getElementById('months-range');

const payments = document.getElementById('payments');
const rateText = document.getElementById('rate-text')
const yieldText = document.getElementById('yeild-text')
const roiText = document.getElementById('roi-text')

const freq = ['monthly', 'quarterly', 'semi-annually', 'annually']

roiInput.value = roiText.innerText
yieldInput.value = yieldText.innerText
rateInput.value = rateText.innerText

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
    text.innerText = formatNumber(val)
  }
  const payments = [...document.querySelectorAll('[data-payment]')];
  const index = payments.findIndex((item) => item.classList.contains("active"))

  roiText.innerText = formatNumber(Math.round(calcCompoundInterest(depositInput.value, rateText.innerText, monthsInput.value, freq[index])))
  roiInput.value = roiText.innerText
  yieldInput.value = yieldText.innerText
  rateInput.value = rateText.innerText
}

function changeRate() {
  const rates = [19.8, 20.6, 21, 25]
  const payments = [...document.querySelectorAll('[data-payment]')];
  const index = payments.findIndex((item) => item.classList.contains("active"))

  rateText.innerText = rates[index]
  yieldText.innerText = calculateAPY(rateText.innerText, freq[index])
}

function calcCompoundInterest(initialInvestment, interestRate, months, compoundingFrequency) {
  const periodsPerYear = 12;

  const n = getCompoundingPeriodsPerYear(compoundingFrequency);

  const effectiveInterestRate = interestRate / 100;
  const periodicInterestRate = effectiveInterestRate / n;
  const totalAmount = initialInvestment * Math.pow(1 + periodicInterestRate, n * (months / periodsPerYear));
  return totalAmount;
}

// Example usage:
// const initialInvestment = 500000;
// const interestRate = 10;
// const month = 84;

// const capitalMonthly = calcCompoundInterest(initialInvestment, interestRate, month, 'monthly').toFixed(2);
// const capitalQuarterly = calcCompoundInterest(initialInvestment, interestRate, month, 'quarterly').toFixed(2);
// const capitalSemiAnnually = calcCompoundInterest(initialInvestment, interestRate, month, 'semi-annually').toFixed(2);
// const capitalAnnually = calcCompoundInterest(initialInvestment, interestRate, month, 'annually').toFixed(2);

// console.log(`Capital with monthly reinvestment: ${capitalMonthly}`);
// console.log(`Capital with quarterly reinvestment: ${capitalQuarterly}`);
// console.log(`Capital with semi-annual reinvestment: ${capitalSemiAnnually}`);
// console.log(`Capital with annual reinvestment: ${capitalAnnually}`);


function calculateAPY(interestRate, compoundingFrequency) {
  const n = getCompoundingPeriodsPerYear(compoundingFrequency);

  const apy = ((1 + (interestRate / 100 / n)) ** n - 1) * 100;
  return gigaRound(apy)
}

function getCompoundingPeriodsPerYear(compoundingFrequency) {
  let n; // Number of compounding periods per year
  switch (compoundingFrequency) {
    case 'monthly':
      n = 12;
      break;
    case 'quarterly':
      n = 4;
      break;
    case 'semi-annually':
      n = 2;
      break;
    case 'annually':
      n = 1;
      break;
    default:
      n = 12;
  }
  return n;
}

function formatNumber(num) {
  return num.toLocaleString().replace(/,/g, ' ');
}

function gigaRound(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}