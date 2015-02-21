function Menu(options) {
  var elem = options.elem;
  var self = this;

  var activeLi;

  elem.on('click', 'a.title', onTitleClick);

  // item clicks are all inside ol
  elem.on('click', 'ol a', onLiClick);

  // I use "a" here instead of LI, because hover on LI also works if going over it's child container OL
  // child container may have paddings etc, so the click may happen on that OL, outside of this item
  elem.on('hoverintent', 'ol a', onLiHoverIntent);

  // ----------------------

  function onLiClick(e) {
    
    close();

    var li = $(e.currentTarget).closest('li');

    $(self).triggerHandler({
      type: 'select',
      value: getLiValue(li)
    });

    return false;    
  }

  function onTitleClick() {
    if (elem.hasClass('open')) {
      close();
    } else {
      open();
    }
  }

  function onLiHoverIntent(e) {
    var li = $(this).closest('li');

    if (isActiveLi(li)) return;

    activateLi(li);
    openChildren();
  }

  // ----------------------

  function isActiveLi(li) {
    if (activeLi && activeLi[0] == li[0]) return true;
    return false;
  }


  function close(argument) {
    
    elem.removeClass('open');

    if (activeLi) {
      activeLi.parentsUntil(elem).andSelf().removeClass('active');
      activeLi = null;
    }

    $(document).off('.menu-nested');
  }

  function getLiValue(li) {
    if (!li.length) return null;
    return li.children('a').attr('href').slice(2);
  }

  function open() {

    elem.addClass('open');

    // TODO: close menu on document click outside of it
    $(document).on('click.menu-nested', function(e) {
      if ( $(e.target).closest(elem).length ) return;
      close();
    });
  }

  function getParentLi(li) {
    return li.parent().parent();
  }

  function activateLi(li) {

    if (activeLi && getParentLi(li)[0] != activeLi[0]) { // if (new li is not child of activeLi)
      // not a child item, then need to close currently active ones
      // collapse parents of last active until container of new element
      collapseActiveUntil(li);
    }
      
    activeLi = li;
    activeLi.addClass("active");
  }

  function collapseActiveUntil(li) {

    var el = activeLi;
    for(;;) {
      el.removeClass('active');
      if (el[0].parentNode == li[0].parentNode) break;
      el = getParentLi(el);
    }

  }

  function openChildren() {        
    var subcontainer = activeLi.children('ol');
    if (!subcontainer.length) return;

    // show children
    
    var left = activeLi.width(); // to the right of the parent 
    var top = activeLi.position().top; // at same height as current parent

    // lift it up, so that first subchild will be aligned with the parent
    top -= subcontainer.children('li').position().top;
    top -= subcontainer.prop('clientTop')

    subcontainer.css({
      left: left,
      top: top
    })
  }

}