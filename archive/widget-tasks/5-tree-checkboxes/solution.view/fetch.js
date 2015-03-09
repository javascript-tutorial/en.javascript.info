var result = {
  0: {
    children: []
  }
};

$('div[id^="region"]').each(function() {
  el = $(this);
  var id = el.attr('id').slice(6);
  result[id] = {
    title: el.children('label').html(),
    children: [],
    id: id
  };

  var parent = el.parent().closest('div[id^="region"]');
  if (parent.length) {
    var pid = parent.attr('id').slice(6);
  } else {
    pid = 0;
  }

  result[pid].children.push(+id);

});