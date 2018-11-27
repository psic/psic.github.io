(function() {
  var SOURCES = window.TEXT_VARIABLES.sources;
  window.Lazyload.js(SOURCES.jquery, function() {
    function swiper(options) {
      var $window = $(window), $root = this, $swiperWrapper, $swiperButtonPrev, $swiperButtonNext,
        initialSlide, animation,
        rootWidth, rootHeight, count, curIndex, translateX, CRITICAL_ANGLE = Math.PI / 3;

      function setOptions(options) {
        var _options = options || {};
        initialSlide = _options.initialSlide || 0;
        animation = _options.animation === undefined && true;
        init();
      }

      function init() {
        $swiperWrapper = $root.find('.swiper__wrapper');
        $swiperButtonPrev = $root.find('.swiper__button--prev');
        $swiperButtonNext = $root.find('.swiper__button--next');
        curIndex = initialSlide || 0;
        translateX = getTranslateXFromCurIndex();
        animation && $swiperWrapper.addClass('swiper__wrapper--animation');
      }

      function preCalc() {
        rootWidth = $root.width();
        rootHeight = $root.height();
        count = $swiperWrapper.children('.swiper__slide').length;
        if (count < 2) {
          $swiperButtonPrev.addClass('d-none');
          $swiperButtonNext.addClass('d-none');
        }
        translateX = getTranslateXFromCurIndex();
      }

      var calc = (function() {
        var preAnimation;
        return function (needPreCalc, params) {
          needPreCalc && preCalc();
          var _animation = (params && params.animation !== undefined) ? params.animation : animation;
          if (preAnimation === undefined || preAnimation !== _animation) {
            preAnimation = _animation ? $swiperWrapper.addClass('swiper__wrapper--animation') :
              $swiperWrapper.removeClass('swiper__wrapper--animation');
          }
          $swiperWrapper.css('transform', 'translate(' + translateX + 'px, 0)');
          if (count > 1) {
            if (curIndex <= 0) {
              $swiperButtonPrev.addClass('disabled');
            } else {
              $swiperButtonPrev.removeClass('disabled');
            }
            if (curIndex >= count - 1) {
              $swiperButtonNext.addClass('disabled');
            } else {
              $swiperButtonNext.removeClass('disabled');
            }
          }
        };
      })();

      function getTranslateXFromCurIndex() {
        return curIndex <= 0 ? 0 : - rootWidth * curIndex;
      }

      function moveToIndex(index ,params) {
        curIndex = index;
        translateX = getTranslateXFromCurIndex();
        calc(false, params);
      }

      function move(type) {
        var nextIndex = curIndex, unstableTranslateX;
        if (type === 'prev') {
          nextIndex > 0 && nextIndex--;
        } else if (type === 'next') {
          nextIndex < count - 1 && nextIndex++;
        }
        if (type === 'cur') {
          moveToIndex(curIndex, { animation: true });
          return;
        }
        unstableTranslateX = translateX % rootWidth !== 0;
        if (nextIndex !== curIndex || unstableTranslateX) {
          unstableTranslateX ? moveToIndex(nextIndex, { animation: true }) : moveToIndex(nextIndex);
        }
      }

      setOptions(options);
      calc(true);

      $swiperButtonPrev.on('click', function(e) {
        e.stopPropagation();
        move('prev');
      });
      $swiperButtonNext.on('click', function(e) {
        e.stopPropagation();
        move('next');
      });
      $window.on('resize', function() {
        translateX = getTranslateXFromCurIndex();
        calc(true, { animation: false });
      });

      (function() {
        var pageX, pageY, velocityX, preTranslateX = translateX, timeStamp, touching;
        $swiperWrapper.on('touchstart', function(e) {
          var point = e.touches ? e.touches[0] : e;
          pageX = point.pageX;
          pageY = point.pageY;
          velocityX = 0;
          preTranslateX = translateX;
        });
        $swiperWrapper.on('touchmove', function(e) {
          var point = e.touches ? e.touches[0] : e;
          var deltaX = point.pageX - pageX;
          var deltaY = point.pageY - pageY;
          velocityX = deltaX / (e.timeStamp - timeStamp);
          timeStamp = e.timeStamp;
          if (e.cancelable && Math.abs(Math.atan(deltaY / deltaX)) < CRITICAL_ANGLE) {
            touching = true;
            translateX += deltaX;
            calc(false, { animation: false });
          }
          pageX = point.pageX;
          pageY = point.pageY;
        });
        $swiperWrapper.on('touchend', function() {
          touching = false;
          var deltaX = translateX - preTranslateX;
          var distance = deltaX + velocityX * rootWidth;
          if (Math.abs(distance) > rootWidth / 2) {
            distance > 0 ? move('prev') : move('next');
          } else {
            move('cur');
          }
        });
        $root.on('touchmove', function(e) {
          if (e.cancelable & touching) {
            e.preventDefault();
          }
        });
      })();

      return {
        setOptions: setOptions,
        moveToIndex: moveToIndex,
        refresh: function() {
          calc(true, { animation: false });
        }
      };
    }
    $.fn.swiper = swiper;
  });
})();