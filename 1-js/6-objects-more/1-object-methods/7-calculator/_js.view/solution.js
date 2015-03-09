var calculator = {
  sum: function() {
    return this.a + this.b;
  },

  mul: function() {
    return this.a * this.b;
  },

  read: function() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  }
}