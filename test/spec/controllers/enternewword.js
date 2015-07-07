'use strict';

describe('Controller: EnterNewWordCtrl', function () {

  // load the controller's module
  beforeEach(module('voctrainerApp'));

  var EnterNewWordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EnterNewWordCtrl = $controller('EnterNewWordCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
