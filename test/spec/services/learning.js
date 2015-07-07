'use strict';

describe('Service: learning', function () {

  // load the service's module
  beforeEach(module('voctrainerApp'));

  // instantiate service
  var learning;
  beforeEach(inject(function (_learning_) {
    learning = _learning_;
  }));

  it('should do something', function () {
    expect(!!learning).toBe(true);
  });

});
