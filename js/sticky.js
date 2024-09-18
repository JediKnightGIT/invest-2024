if (isMobile.any()) {
  window.addEventListener('scroll', sticky);
  window.addEventListener('touchmove', sticky);
  // window.addEventListener('touchstart', sticky);
  // window.addEventListener('touchend', sticky);
  // window.addEventListener('touchcancel', sticky);

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
    const stickyElement = document.querySelector('.sticky');
    const stickyBg = document.querySelector('.sticky-bg');

    const stickyTop = parseInt(window.getComputedStyle(stickyElement).top);
    const currentTop = stickyElement.getBoundingClientRect().top;
    stickyElement.classList.toggle('stuck', currentTop === stickyTop);
    stickyBg.classList.toggle('stuck', currentTop === stickyTop);

    // const stickyRect = stickyElement.getBoundingClientRect();

    // if (
    //   stickyRect.top > 0 &&
    //   stickyElement.classList.contains('stuck') &&
    //   stickyBg.classList.contains('stuck')
    // ) {
    //   stickyElement.classList.remove('stuck');
    //   stickyBg.classList.remove('stuck');
    // } else {
    //   stickyElement.classList.add('stuck');
    //   stickyBg.classList.add('stuck');
    // }
  }
}
