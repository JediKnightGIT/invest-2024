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
const DEP_MIN = +depositInput.min
const DEP_MAX = +depositInput.max

// set initial result values
roiInput.value = roiText.innerText
yieldInput.value = yieldText.innerText
rateInput.value = rateText.innerText

depositInput.addEventListener('input', () => calc(depositInput, depositRange, deposit));
depositValue.addEventListener('input', onDepositChange)
depositValue.addEventListener('focusout', onDepositFocusout)

monthsInput.addEventListener('input', () => calc(monthsInput, monthsRange, months));

paymentsList.addEventListener('click', onRateClick);

/**
 * Calculates and updates the result values based on the input values.
 *
 * @param {Element} input - The input element triggering the calculation.
 * @param {Element} range - The range element's width to be updated.
 * @param {Element | NodeList} text - The text element or array of text elements to be updated.
 */
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
    depositValue.dataset.rawValue = input.value
    deposit.innerText = numberWithSpaces(input.value)
  }
  else {
    monthsInput.value = input.value
    months.innerText = input.value
  }

  range.style.width = mapRange(+input.min, +input.max, +input.value)
}

/**
 * Updates the deposit values and stores the raw value in a dataset attribute after formatting it with spaces.
 *
 * @param {Event} e - The event object triggering the function.
 */
function onDepositChange(e) {
  e.target.value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
  deposit.innerText = e.target.value

  // value is rendered with spaces, but raw value is stored in data-raw-value
  e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Add space every 3 digits
  e.target.dataset.rawValue = e.target.value.replace(/\s/g, "");
}

/**
 * Matches the deposit values, deposit text, deposit range and its width based on the input value.
 *
 * @param {Event} e - The event object triggering the function.
 * @return {void}
 */
function onDepositFocusout(e) {
  if (+e.target.dataset.rawValue <= DEP_MIN) {
    e.target.value = numberWithSpaces(DEP_MIN)
    e.target.dataset.rawValue = DEP_MIN
    deposit.innerText = numberWithSpaces(DEP_MIN)
    depositInput.value = DEP_MIN

    depositRange.style.width = 0
  } else if (+e.target.dataset.rawValue >= DEP_MAX) {
    e.target.value = numberWithSpaces(DEP_MAX)
    e.target.dataset.rawValue = DEP_MAX
    deposit.innerText = numberWithSpaces(DEP_MAX)
    depositInput.value = DEP_MAX

    depositRange.style.width = 100 + '%'
  } else {
    deposit.innerText = e.target.value
    depositInput.value = +e.target.dataset.rawValue

    depositRange.style.width = mapRange(DEP_MIN, DEP_MAX, +e.target.dataset.rawValue)
  }
}

/**
 * Updates the rate, yield, and ROI (Return On Investment) text values based on the payment frequency.
 *
 * @return {void}
 */
function onRateClick() {
  const rates = [19.8, 20.6, 21, 25]
  const payments = [...document.querySelectorAll('[data-payment]')];
  const index = payments.findIndex((item) => item.classList.contains("active"))

  rateText.innerText = rates[index]
  yieldText.innerText = calculateAPY(rateText.innerText, freq[index])
  roiText.innerText = numberWithSpaces(Math.round(calcCompoundInterest(depositInput.value, rateText.innerText, monthsInput.value, freq[index])))
}

/**
 * Calculates the total amount of compound interest.
 *
 * @param {number} initialInvestment - The initial investment amount.
 * @param {number} interestRate - The interest rate in percentage.
 * @param {number} months - The number of months.
 * @param {string} period - The compounding period.
 * @return {number} The total amount of compound interest.
 */
function calcCompoundInterest(initialInvestment, interestRate, months, period) {
  const periodsPerYear = 12;
  const n = periodToNumber(period);

  const effectiveInterestRate = interestRate / 100;
  const periodicInterestRate = effectiveInterestRate / n;
  const totalAmount = initialInvestment * Math.pow(1 + periodicInterestRate, n * (months / periodsPerYear));
  return totalAmount;
}

/**
 * Calculate the Annual Percentage Yield (APY) based on the interest rate and compounding period.
 *
 * @param {number} interestRate - The interest rate in percentage.
 * @param {string} period - The compounding period.
 * @return {number} The calculated APY.
 */
function calculateAPY(interestRate, period) {
  const n = periodToNumber(period);

  const apy = (Math.pow((1 + (interestRate / 100 / n)), n) - 1) * 100;
  return gigaRound(apy)
}

/**
 * Maps period to a number.
 *
 * @param {'monthly' | 'quarterly' | 'semi-annually' | 'annually'} period
 * @return {number} period number.
 */
function periodToNumber(period) {
  let n;
  switch (period) {
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

/**
 * Rounds a number to two decimal places.
 *
 * @param {number} num - The number to be rounded
 * @return {number} The rounded number
 */
function gigaRound(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

/**
 * Converts a number into a string with spaces after every 3 digits.
 *
 * @param {number} x - The number to be converted.
 * @return {string} The number converted into a string with spaces.
 */
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Maps a value within a range and returns the corresponding percentage.
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @param {number} val - The value to be mapped.
 * @return {string} The percentage value of the mapped value that can be used to set the width of an element.
 */
function mapRange(min, max, val) {
  if (val >= max)
    val = max
  if (val <= min)
    val = min

  const percent = (val - min) / (max - min) * 100;
  return percent + '%'
}