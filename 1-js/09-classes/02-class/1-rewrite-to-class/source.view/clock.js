

function Clock({ template }) {
  this.template = template;
}

Clock.prototype.render = function() {
  let date = new Date();

  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;

  let mins = date.getMinutes();
  if (mins < 10) mins = '0' + mins;

  let secs = date.getSeconds();
  if (secs < 10) secs = '0' + secs;

  let output = this.template
    .replace('h', hours)
    .replace('m', mins)
    .replace('s', secs);

  console.log(output);
};

Clock.prototype.stop = function() {
  clearInterval(this.timer);
};

Clock.prototype.start = function() {
  this.render();
  this.timer = setInterval(() => this.render(), 1000);
};
