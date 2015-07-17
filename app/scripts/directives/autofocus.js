angular.module('voctrainerApp')
  .directive('mfAutoFocus', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element[0].focus();
      }
    }
  });