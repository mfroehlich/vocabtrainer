angular.module('voctrainerApp')
  .service('localDatabase', function ($log, $window, $q, constants) {
    'use strict';

    var deferred = $q.defer();
    var version = 18;
    var indexedDB = $window.indexedDB;
    var dbOpenRequest = indexedDB.open(constants.databaseName, version);

    dbOpenRequest.onupgradeneeded = function (evt) {

      $log.debug('Running onUpgradeNeeded...');

      var database = dbOpenRequest.result;
      if (database.objectStoreNames.contains(constants.objectStores.voc)) {
        database.deleteObjectStore(constants.objectStores.voc);
      }
      var vocabularyStore = database.createObjectStore(constants.objectStores.voc, {
        keyPath: 'id',
        autoincrement: false
      });
      vocabularyStore.createIndex(constants.indices.voc_by_level, 'level', {unique: false});
    };

    dbOpenRequest.onsuccess = function () {
      var database = dbOpenRequest.result;
      deferred.resolve(database);
    };

    return deferred.promise;
  });
