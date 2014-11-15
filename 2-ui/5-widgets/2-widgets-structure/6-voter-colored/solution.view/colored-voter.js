function ColoredVoter(options) {
  Voter.apply(this, arguments);
}
ColoredVoter.prototype = Object.create(Voter.prototype);

ColoredVoter.prototype._renderVote = function() {
  Voter.prototype._renderVote.apply(this, arguments);
  this._voteElem.removeClass('positive negative');
  if (this._vote > 0) {
    this._voteElem.addClass('positive');
  }
  if (this._vote < 0) {
    this._voteElem.addClass('negative');
  }
};
