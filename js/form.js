document.addEventListener('DOMContentLoaded', () => {
  const birthInput = document.getElementById('date');
  const nameInputs = document.querySelectorAll('.name');
  const phoneInputs = document.querySelectorAll('.phone');
  const fakeDate = document.getElementById('fake-date-ios');

  const payments = document.querySelectorAll('[data-payment]');
  const citizenships = document.querySelectorAll('[data-citizen]');

  const calcForm = document.getElementById('calc-form');

  payments.forEach((item, _, array) => toggleRadio(item, 'payment', array));
  citizenships.forEach((item, _, array) => toggleRadio(item, 'citizen', array));

  nameInputs.forEach((item) => {
    item.addEventListener('input', function () {
      // Get the value of the input field
      const inputValue = this.value;

      // Check if the input value matches the allowed pattern
      const isValid = /^[ A-Za-zА-Яа-яЁё]+$/.test(inputValue);

      // If the input value is not valid, clear the input field
      if (!isValid) {
        item.value = inputValue.replace(/[^ A-Za-zА-Яа-яЁё]/g, '');
      }
    });
  });

  phoneInputs.forEach((item) => {
    item.addEventListener('focus', function () {
      // Set the value to start with '+7' when the input is in focus
      if (!item.value.startsWith('+7')) {
        item.value = '+7';
      }
    });
    item.addEventListener('input', (event) => {
      let inputValue = event.target.value;
      inputValue = inputValue.replace(/[^\d]/g, ''); // удаляем все не цифры
      if (inputValue.length > 11) {
        inputValue = inputValue.substr(0, 11); // обрезаем до 11 символов
      }
      inputValue = '+7' + inputValue.substr(1); // добавляем +7 в начало
      event.target.value = inputValue;
    });
  });

  fakeDate.addEventListener('click', function () {
    this.style.display = 'none';
    birthInput.showPicker();
  });

  // birthInput.addEventListener('input', (event) => {
  //   const value = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
  //   const formattedValue = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1.$2.$3'); // Format the value

  //   if (formattedValue.length > 10) {
  //     event.target.value = formattedValue.slice(0, 10); // Limit the input to 10 characters
  //   } else {
  //     event.target.value = formattedValue;
  //   }
  // });

  // birthInput.addEventListener('focus', clearDate);
  // birthInput.addEventListener('blur', clearDate);

  calcForm.addEventListener('submit', submitForm);

  function toggleRadio(item, dataValue, array) {
    item.addEventListener('click', () => {
      array.forEach((btn) => {
        btn.classList.remove('active');
        btn.dataset[dataValue] = '';
      });

      item.classList.add('active');
      item.dataset[dataValue] = 'active';
      document.getElementById(dataValue).value =
        item.querySelector('span').innerText;
    });
  }

  function clearDate(event) {
    if (event.target.value === 'ДД.ММ.ГГГГ') {
      event.target.value = '';
    }
  }

  async function submitForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Log the form data to the console
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    const response = await fetch('/blagodarim', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const url = response.url;
      window.location.href = url;
    }
  }
});
