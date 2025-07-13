document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const utilityButtons = document.getElementById('utility-buttons');

  if (mobileMenuToggle && mobileMenu && utilityButtons) {
    const applyInitialVisibility = () => {
      if (window.innerWidth < 1024) { // lg breakpoint (1024px) 미만
        mobileMenu.style.display = 'none';
        utilityButtons.style.display = 'none';
      } else {
        mobileMenu.style.display = 'flex'; // 데스크톱에서는 flex로 표시
        utilityButtons.style.display = 'flex'; // 데스크톱에서는 flex로 표시
      }
    };

    applyInitialVisibility();

    mobileMenuToggle.addEventListener('click', () => {
      if (mobileMenu.style.display === 'none') {
        mobileMenu.style.display = 'flex';
        utilityButtons.style.display = 'flex';
      } else {
        mobileMenu.style.display = 'none';
        utilityButtons.style.display = 'none';
      }
    });

    window.addEventListener('resize', () => {
      applyInitialVisibility();
    });
  }
});