if (isMobile.any()) {
  sticky();

  window.addEventListener('scroll', () => {
    const openDepositBtn = document.getElementById('open-deposit-fixed');
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

    const observer = new IntersectionObserver(
      ([e]) => {
        e.target.classList.toggle('stuck', e.intersectionRatio < 1);
        stickyBg.classList.toggle('stuck', e.intersectionRatio < 1);
      },
      { threshold: [1] },
    );

    observer.observe(stickyElement);
  }
}
