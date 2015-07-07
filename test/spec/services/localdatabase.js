'use strict';

describe('Service: localDatabase', function () {

  // load the service's module
  beforeEach(module('voctrainerApp'));

  // instantiate service
  var localDatabase;
  beforeEach(inject(function (_localDatabase_) {
    localDatabase = _localDatabase_;
  }));

  it('should do something', function () {
    expect(!!localDatabase).toBe(true);
  });

});
