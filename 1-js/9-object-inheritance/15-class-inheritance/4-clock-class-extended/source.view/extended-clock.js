function extend(Child, Parent) {
  Child.prototype = inherit(Parent.prototype);
  Child.prototype.constructor = Child;
  Child.parent = Parent.prototype;
}

function inherit(proto) {
  function F() {}
  F.prototype = proto;
  return new F;
}

// ваш код