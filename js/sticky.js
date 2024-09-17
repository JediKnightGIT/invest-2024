if (isMobile.any()) {
  const stickyElement = document.querySelector('.sticky');
  const stickyBg = document.querySelector('.sticky-bg');
  window.addEventListener('scroll', () => sticky);
  window.addEventListener('touchmove', () => sticky);

  const openDepositBtn = document.getElementById('open-deposit-fixed');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      openDepositBtn.classList.remove('hidden');
      openDepositBtn.classList.add('block');
    } else {
      openDepositBtn.classList.add('hidden');
      openDepositBtn.classList.remove('block');
    }
  });

  function sticky() {
    const stickyRect = stickyElement.getBoundingClientRect();

    if (stickyRect.top === 0) {
      stickyElement.classList.add('stuck');
      stickyBg.classList.add('stuck');
    } else {
      stickyElement.classList.remove('stuck');
      stickyBg.classList.remove('stuck');
    }
  }
}
