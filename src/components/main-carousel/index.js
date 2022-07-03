import $ from 'jquery';
import "slick-carousel";

$('.js-main-carousel').slick({
	lazyLoad: 'ondemand',
  dots: false,
  arrows: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  // centerMode: true,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
      }
    }
  ],
});