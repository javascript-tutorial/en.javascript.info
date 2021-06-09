let nativeAlert = globalThis.alert;
globalThis.alert = jasmine.createSpy();

describe("Test", function() {
  
  after(function() {
    globalThis.alert = this.alert;
  });

  it(`user and admin equal "John"`, function() {
    expect(user).toEqual("John");
    expect(admin).toEqual("John");
  });
});