const deposit = document.getElementById('deposit');
const depositInput = document.getElementById('deposit-input');
const depositValue = document.getElementById('deposit-value');
const depositRange = document.getElementById('deposit-range');
const roiInput = document.getElementById('roi')
const yieldInput = document.getElementById('yield')
const rateInput = document.getElementById('rate')

const months = document.querySelectorAll('[data-period]');
const monthsInput = document.getElementById('months-input');
const monthsRange = document.getElementById('months-range');

const paymentsList = document.getElementById('payments');
const rateText = document.getElementById('rate-text')
const yieldText = document.getElementById('yeild-text')
const roiText = document.getElementById('roi-text')

const freq = ['monthly', 'quarterly', 'semi-annually', 'annually']

roiInput.value = roiText.innerText
yieldInput.value = yieldText.innerText
rateInput.value = rateText.innerText

depositInput.addEventListener('input', () => calc(depositInput, depositRange, deposit));
depositValue.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

  deposit.innerText = numberWithSpaces(e.target.value)
  depositRange.style.width = mapRange(+depositInput.min, +depositInput.max, +e.target.dataset.rawValue)
  if (!+e.target.dataset.rawValue) {
    depositInput.value = 500000
    depositRange.style.width = 0
  } else {
    depositInput.value = e.target.dataset.rawValue
    depositRange.style.width = mapRange(+depositInput.min, +depositInput.max, +e.target.dataset.rawValue)
  }
  if (+e.target.dataset.rawValue > 30000000 && +e.target.value > 30000000) {
    deposit.innerText = '30 000 000'
    e.target.value = '30 000 000';
    e.target.dataset.rawValue = 30000000
    depositInput.value = 30000000
    depositRange.style.width = 100 + '%'
  }
  e.target.dataset.rawValue = e.target.value.replace(/\s/g, "");

  // e.target.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Add space every 3 digits

})

depositValue.addEventListener('focusout', (e) => {
  if (+e.target.dataset.rawValue < 500000) {
    e.target.value = '500 000'
    e.target.dataset.rawValue = 500000
    deposit.innerText = '500 000'
    depositInput.value = 500000
  }
  if (+e.target.dataset.rawValue > 30000000) {
    e.target.value = '30 000 000'
    e.target.dataset.rawValue = 30000000
    deposit.innerText = '30 000 000'
    depositInput.value = 30000000
  }
})

monthsInput.addEventListener('input', () => calc(monthsInput, monthsRange, months));
paymentsList.addEventListener('click', changeRate);

function calc(input, range, text) {
  if (text.length) {
    text.forEach((item) => item.innerText = input.value)
  } else {
    text.innerText = numberWithSpaces(input.value)
  }
  const payments = [...document.querySelectorAll('[data-payment]')];
  const index = payments.findIndex((item) => item.classList.contains("active"))

  roiText.innerText = numberWithSpaces(Math.round(calcCompoundInterest(depositInput.value, rateText.innerText, monthsInput.value, freq[index])))
  roiInput.value = roiText.innerText
  yieldInput.value = yieldText.innerText
  rateInput.value = rateText.innerText

  if (input.id === 'deposit-input') {
    depositValue.value = numberWithSpaces(input.value)
    deposit.innerText = numberWithSpaces(input.value)
  }
  else {
    monthsInput.value = input.value
    months.innerText = input.value
  }

  range.style.width = mapRange(+input.min, +input.max, +input.value)
}

function changeRate() {
  const rates = [19.8, 20.6, 21, 25]
  const payments = [...document.querySelectorAll('[data-payment]')];
  const index = payments.findIndex((item) => item.classList.contains("active"))

  rateText.innerText = rates[index]
  yieldText.innerText = calculateAPY(rateText.innerText, freq[index])
  roiText.innerText = numberWithSpaces(Math.round(calcCompoundInterest(depositInput.value, rateText.innerText, monthsInput.value, freq[index])))
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

function gigaRound(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function mapRange(min, max, val) {
  const percent = (val - min) / (max - min) * 100;

  if (val <= max)
    return percent + '%'
}