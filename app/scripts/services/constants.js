'use strict';

/**
 * @ngdoc service
 * @name voctrainerApp.constants
 * @description
 * # constants
 * Service in the voctrainerApp.
 */
angular.module('voctrainerApp')
  .constant('dbConstants', {
    databaseName: 'voctrainerdb',
    objectStores: {
      voc : 'vocabulary'
    },
    indices: {
      voc_by_level : 'voc_by_level'
    }
  })
  .constant('configuration', {
    languages: [ 'ENG', 'NL' ]
  });
