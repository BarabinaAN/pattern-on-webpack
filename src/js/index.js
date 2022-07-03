// Глобальное состояние
import 'core-js/features/regexp';
import 'core-js/features/promise';
import 'core-js/features/object';
import 'core-js/features/string';
import 'core-js/features/url';

//библитотеки
import $ from 'jquery';


window.$ = $
window.jQuery = $

// компоненты
import '../components';

// common
import scrollTop from './common/scrollTop';

// Кнопка вверх
scrollTop();