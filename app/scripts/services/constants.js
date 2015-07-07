'use strict';

/**
 * @ngdoc service
 * @name voctrainerApp.constants
 * @description
 * # constants
 * Service in the voctrainerApp.
 */
angular.module('voctrainerApp')
  .constant('constants', {
    databaseName: 'voctrainerdb',
    objectStores: {
      voc : 'vocabulary'
    },
    indices: {
      voc_by_level : 'voc_by_level'
    }
  });
