class ExtendedClock extends Clock {
  constructor(options) {
    super(options);
    let { precision=1000 } = options;
    this._precision = precision;
  }

  start() {
    this._render();
    this._timer = setInterval(() => this._render(), this._precision);
  }
};
