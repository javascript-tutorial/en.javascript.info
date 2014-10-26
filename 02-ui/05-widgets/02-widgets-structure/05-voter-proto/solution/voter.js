
function Voter(options) {
  var elem = this._elem = options.elem;
  this._voteElem = elem.find('.vote');

  elem.on('mousedown selectstart', false);

  elem.on('click', '.down', this._onDownClick.bind(this));
  elem.on('click', '.up', this._onUpClick.bind(this));
}

Voter.prototype._onDownClick = function() {
  this._voteElem.html( +this._voteElem.html() - 1 );
};

Voter.prototype._onUpClick = function() {
  this._voteElem.html( +this._voteElem.html() + 1 );
};

Voter.prototype.setVote = function(vote) {
  this._voteElem.html(vote);
};
