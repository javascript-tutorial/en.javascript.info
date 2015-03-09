function StepVoter(options) {
  Voter.apply(this, arguments);
  this._step = options.step || 1;
}
StepVoter.prototype = Object.create(Voter.prototype);

StepVoter.prototype._voteIncrease = function() {
  this._voteElem.innerHTML = +this._voteElem.innerHTML + this._step;
};

StepVoter.prototype._voteDecrease = function() {
  this._voteElem.innerHTML = +this._voteElem.innerHTML - this._step;
};