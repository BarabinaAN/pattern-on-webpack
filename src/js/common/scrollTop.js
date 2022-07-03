//scrollTop
export default function scrollTop() {
  document.addEventListener("DOMContentLoaded", function(event) {

    const goTopBtn = document.querySelector('.js-btn-up');
    window.addEventListener('scroll', checkPosition);

    function checkPosition() {
      const scrolled = window.pageYOffset;
      const coords = document.documentElement.clientHeight;

      if (scrolled > coords) {
        goTopBtn.classList.add('has-show');
      }
      if (scrolled < coords) {
        goTopBtn.classList.remove('has-show');
      }
    }

	});
}