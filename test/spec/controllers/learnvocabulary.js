'use strict';

describe('Controller: LearnVocabularyCtrl', function () {

  // load the controller's module
  beforeEach(module('voctrainerApp'));

  var LearnVocabularyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LearnVocabularyCtrl = $controller('LearnVocabularyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
