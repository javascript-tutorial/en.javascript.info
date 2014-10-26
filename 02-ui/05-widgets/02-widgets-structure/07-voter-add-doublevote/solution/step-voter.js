function StepVoter(options) {
  Voter.apply(this, arguments);
  this._step = options.step || 1;
}
StepVoter.prototype = Object.create(Voter.prototype);

StepVoter.prototype._increase = function() {
  this.setVote(this._vote + this._step);
};

StepVoter.prototype._decrease = function() {
  this.setVote(this._vote - this._step);
};