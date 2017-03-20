// <td> under the mouse right now (if any)
let currentElem = null;

table.onmouseover = function(event) {
  if (currentElem) {
    // before entering a new element, the mouse always leaves the previous one
    // if we didn't leave <td> yet, then we're still inside it, so can ignore the event
    return;
  }

  let target = event.target.closest('td');
  if (!target || !table.contains(target)) return;

  // yeah we're inside <td> now
  currentElem = target;
  target.style.background = 'pink';
};


table.onmouseout = function(event) {
  // if we're outside of any <td> now, then ignore the event
  if (!currentElem) return;

  // we're leaving the element -- where to? Maybe to a child element?
  let relatedTarget = event.relatedTarget;
  if (relatedTarget) { // possible: relatedTarget = null
    while (relatedTarget) {
      // go up the parent chain and check -- if we're still inside currentElem
      // then that's an internal transition -- ignore it
      if (relatedTarget == currentElem) return;
      relatedTarget = relatedTarget.parentNode;
    }
  }

  // we left the element. really.
  currentElem.style.background = '';
  currentElem = null;
};
