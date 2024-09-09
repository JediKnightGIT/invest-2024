if (isMobile.any()) {
  const stickyElement = document.querySelector('.sticky');
  // const stickyColors = document.querySelectorAll('.sticky-color');
  window.addEventListener('scroll', () => {
    const stickyRect = stickyElement.getBoundingClientRect();

    if (stickyRect.top <= 0) {
      stickyElement.classList.add('stuck');
      // stickyColors.forEach((item) => item.classList.remove('text-white/[80%]'));
      // stickyColors.forEach((item) => item.classList.add('text-black/80'));
    } else {
      stickyElement.classList.remove('stuck');
      // stickyColors.forEach((item) => item.classList.remove('text-black/80'));
      // stickyColors.forEach((item) => item.classList.add('text-white/[80%]'));
    }
  });
}
