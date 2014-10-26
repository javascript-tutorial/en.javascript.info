function Menu(state) {
  this._state = state || this.STATE_CLOSED;
};

Menu.prototype.STATE_OPEN = 1;
Menu.prototype.STATE_CLOSED = 0;

Menu.prototype.open = function() {
  this._state = this.STATE_OPEN;
};

Menu.prototype.close = function() {
  this._state = this.STATE_CLOSED;
};

Menu.prototype._stateAsString = function() {
  switch(this._state) {
    case this.STATE_OPEN:
      return 'открыто';

    case this.STATE_CLOSED:
      return 'закрыто';
  }
};

Menu.prototype.showState = function() {
  alert( this._stateAsString() );
}