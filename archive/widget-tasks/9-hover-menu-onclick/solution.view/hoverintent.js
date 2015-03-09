/**
 * Taken from jQuery UI accordion and fixed, special hoverintent event
 * http://benalman.com/news/2010/03/jquery-special-events/
 */
! function($) {


  var cfg = {
    sensitivity: 9,
    interval: 50
  };


  $.event.special.hoverintent = {
    setup: function() {
      $(this).on("mouseover", handler);
    },

    teardown: function() {
      $(this).on("mouseover", handler);
    },

    cfg: cfg
  };

  function handler(event) {

    var self = this,
      args = arguments,
      target = $(event.target),
      cX, cY, pX, pY;

    function track(event) {
      cX = event.pageX;
      cY = event.pageY;
    };
    pX = event.pageX;
    pY = event.pageY;

    function clear() {
      target.off("mousemove", track).off("mouseout", clear);
      clearTimeout(timeout);
    }

    function handler() {
      if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
        clear();
        event.type = "hoverintent";
        jQuery.event.simulate("hoverintent", event.target, $.event.fix(event), true);
      } else {
        pX = cX;
        pY = cY;
        timeout = setTimeout(handler, cfg.interval);
      }
    }
    var timeout = setTimeout(handler, cfg.interval);
    target.mousemove(track).mouseout(clear);
    return true;
  }


}(jQuery);