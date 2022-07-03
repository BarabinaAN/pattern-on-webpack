//Popup
export default function popup() {
    document.addEventListener("DOMContentLoaded", function(event) {
      const [...list] = document.querySelectorAll("[data-popup]");
  
      list.forEach(el => {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          const id = '#' + e.currentTarget.dataset.popup;
          const item = document.querySelector(id);
          if (!item) return
          item.classList.add('is-show');
          closePopup(item);
        })
      })
      // close popup
      function closePopup(item) {
        const close = document.querySelector('.js-close-popup');
        close.addEventListener('click', function (e) {
          e.preventDefault();
          item.classList.remove('is-show');
        })
      }
      });
  }