'use strict';

describe('Service: vocabularyResource', function () {

  // load the service's module
  beforeEach(module('voctrainerApp'));

  // instantiate service
  var vocabularyResource;
  beforeEach(inject(function (_vocabularyResource_) {
    vocabularyResource = _vocabularyResource_;
  }));

  it('should do something', function () {
    expect(!!vocabularyResource).toBe(true);
  });

});
