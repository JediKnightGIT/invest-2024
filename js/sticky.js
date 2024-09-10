if (isMobile.any()) {
  const stickyElement = document.querySelector('.sticky');
  const stickyBg = document.querySelector('.sticky-bg');
  window.addEventListener('scroll', () => {
    const stickyRect = stickyElement.getBoundingClientRect();

    if (stickyRect.top <= 0) {
      stickyElement.classList.add('stuck');
      stickyBg.classList.add('stuck');
    } else {
      stickyElement.classList.remove('stuck');
      stickyBg.classList.remove('stuck');
    }
  });
}
