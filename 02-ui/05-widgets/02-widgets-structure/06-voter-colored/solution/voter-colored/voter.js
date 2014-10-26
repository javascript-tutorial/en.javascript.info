
function Voter(options) {
  var elem = this._elem = options.elem;
  this._voteElem = elem.find('.vote');
  this._vote = 0;

  elem.on('mousedown selectstart', false);

  elem.on('click', '.down', this._onDownClick.bind(this));
  elem.on('click', '.up', this._onUpClick.bind(this));
}

Voter.prototype._onDownClick = function() {
  this.setVote(this._vote - 1);
};

Voter.prototype._onUpClick = function() {
  this.setVote(this._vote + 1);
};

Voter.prototype._renderVote = function() {
  this._voteElem.html(this._vote);
};

Voter.prototype.setVote = function(vote) {
  this._vote = vote;
  this._renderVote();
};
