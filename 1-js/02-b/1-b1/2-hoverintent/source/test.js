import HoverIntent from './hoverIntent.js';

describe("hoverIntent", function() {
  function mouse(eventType, x, y, options) {
    let eventOptions = Object.assign({
      bubbles: true,
      clientX: x,
      clientY: y,
      pageX: x,
      pageY: y,
      target: elem
    }, options || {});

    elem.dispatchEvent(new MouseEvent(eventType, eventOptions));
  }


  let isOver;
  let hoverIntent;
  let clock;


  beforeAll(function() {
    clock = jasmine.clock().install();
  });

  afterAll(function() {
    clock.uninstall();
  });


  beforeEach(function() {
    isOver = false;

    hoverIntent = new HoverIntent({
      elem: elem,
      over: function() {
        isOver = true;
      },
      out: function() {
        isOver = false;
      }
    });
  })

  afterEach(function() {
    if (hoverIntent) {
      hoverIntent.destroy();
    }
  })

  it("mouseover -> when the pointer just arrived, no tooltip", function() {
    mouse('mouseover', 10, 10);
    expect(isOver).toBeFalse();
  });

  it("mouseover -> after a delay, the tooltip shows up", function() {
    mouse('mouseover', 10, 10);
    clock.tick(100);
    expect(isOver).toBeTrue();
  });

  it("mouseover -> followed by fast mouseout leads doesn't show tooltip", function() {
    mouse('mouseover', 10, 10);
    setTimeout(
      () => mouse('mouseout', 300, 300, { relatedTarget: document.body}),
      30
    );
    clock.tick(100);
    expect(isOver).toBeFalse();
  });


  it("mouseover -> slow move -> tooltips", function() {
    mouse('mouseover', 10, 10);
    for(let i=10; i<200; i+= 10) {
      setTimeout(
        () => mouse('mousemove', i/5, 10),
        i
      );
    }
    clock.tick(200);
    expect(isOver).toBeTrue();
  });

  it("mouseover -> fast move -> no tooltip", function() {
    mouse('mouseover', 10, 10);
    for(let i=10; i<200; i+= 10) {
      setTimeout(
        () => mouse('mousemove', i, 10),
        i
      );
    }
    clock.tick(200);
    expect(isOver).toBeTrue();
  });

});
