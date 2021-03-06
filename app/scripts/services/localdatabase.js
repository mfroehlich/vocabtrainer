angular.module('voctrainerApp')
  .service('localDatabase', function ($log, $window, $q, dbModel) {
    'use strict';

    var deferred = $q.defer();
    var newVersion = dbModel.database.version;
    var indexedDB = $window.indexedDB;

    $log.debug('Opening database, version: ' + newVersion);
    var openRequest = indexedDB.open(dbModel.database.name, newVersion);

    openRequest.onupgradeneeded = function (evt) {

      var oldVersion = evt.oldVersion;
      $log.debug('Running onUpgradeNeeded to migrate database from version ' + oldVersion + ' to ' + newVersion);

      var database = evt.target.result;
      var transaction = evt.target.transaction;
      $log.debug('Old version is ' + oldVersion);
      if (oldVersion < 18) {
        if (database.objectStoreNames.contains(dbModel.objectStores.voc.name)) {
          database.deleteObjectStore(dbModel.objectStores.voc.name);
        }
        var vocabularyStore = database.createObjectStore(dbModel.objectStores.voc.name, dbModel.objectStores.voc.properties);
        vocabularyStore.createIndex(dbModel.objectStores.voc.indices.voc_by_level, 'level', {unique: false});
      }

      if (oldVersion < 21) {
        $log.debug('Migrating database to version 21 [final Version: ' + newVersion + ']');

        var vocObjectStore = transaction.objectStore(dbModel.objectStores.voc.name);
        $log.debug('Opened object store vocabulary', vocObjectStore);
        var vocCursor = vocObjectStore.openCursor();
        vocCursor.onsuccess = function (evt) {
          $log.debug('Successfully opened cursor.');
          var cursor = evt.target.result;
          if (cursor) {
            var vocEntry = cursor.value;
            $log.debug('Adding language to ', vocEntry);
            vocEntry.language = 'NL';
            vocObjectStore.put(vocEntry);
            cursor.continue();
          }
        };
        vocCursor.onerror = function (error) {
          $log.error('Error opening cursor on vocObjectStore to transform for version 19.', error);
        };
      }
    };

    openRequest.onsuccess = function () {
      var database = openRequest.result;
      deferred.resolve(database);
    };

    return deferred.promise;
  });
