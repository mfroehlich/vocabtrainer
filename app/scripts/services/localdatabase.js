angular.module('voctrainerApp')
  .service('localDatabase', function ($log, $window, $q, dbConstants) {
    'use strict';

    var deferred = $q.defer();
    var version = 18;
    var indexedDB = $window.indexedDB;
    var openRequest = indexedDB.open(dbConstants.databaseName, version);

    openRequest.onupgradeneeded = function (evt) {

      $log.debug('Running onUpgradeNeeded...');

      var database = openRequest.result;
      if (database.objectStoreNames.contains(dbConstants.objectStores.voc)) {
        database.deleteObjectStore(dbConstants.objectStores.voc);
      }
      var vocabularyStore = database.createObjectStore(dbConstants.objectStores.voc, {
        keyPath: 'id',
        autoincrement: false
      });
      vocabularyStore.createIndex(dbConstants.indices.voc_by_level, 'level', {unique: false});
    };

    openRequest.onsuccess = function () {
      var database = openRequest.result;
      deferred.resolve(database);
    };

    return deferred.promise;
  });
