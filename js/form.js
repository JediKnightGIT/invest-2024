const birthInput = document.getElementById('birth');

birthInput.addEventListener('input', function() {
  const value = this.value.replace(/\D/g, ''); // Remove non-digit characters
  const formattedValue = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1.$2.$3'); // Format the value

  if (formattedValue.length > 10) {
    this.value = formattedValue.slice(0, 10); // Limit the input to 10 characters
  } else {
    this.value = formattedValue;
  }
});

birthInput.addEventListener('focus', function() {
  if (this.value === '') {
    this.value = 'DD.MM.YYYY';
  }
});

birthInput.addEventListener('blur', function() {
  if (this.value === 'DD.MM.YYYY') {
    this.value = '';
  }
});