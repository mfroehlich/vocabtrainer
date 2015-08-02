'use strict';

/**
 * @ngdoc service
 * @name voctrainerApp.vocabularyResource
 * @description
 * # vocabularyResource
 * Service in the voctrainerApp.
 */
angular.module('voctrainerApp')
  .service('vocabularyResource', function ($q, $log, localDatabase, dbModel) {

    var model;

    /** @param {uuid} entryId*/
    var getEntryById = function (entryId) {
      var deferred = $q.defer();
      localDatabase.then(function (dbInstance) {
        var tx = dbInstance.transaction(dbModel.objectStores.voc.name, dbModel.accessTypes.readonly);
        var vocObjStore = tx.objectStore(dbModel.objectStores.voc.name);
        var getRequest = vocObjStore.get(entryId);
        getRequest.onerror = function(error) {
          $log.error(error);
        };
        getRequest.onsuccess = function(evt) {
          var loadedEntry = evt.target.result;
          deferred.resolve(loadedEntry);
        }
      });
      return deferred.promise;
    };

    /** @param {Entry} entry */
    var saveEntry = function (entry) {
      var deferred = $q.defer();
      localDatabase.then(function (databaseSession) {
        var tx = databaseSession.transaction(dbModel.objectStores.voc.name, dbModel.accessTypes.readwrite);
        var vocObjectStore = tx.objectStore(dbModel.objectStores.voc.name);
        $log.debug("Adding new item into the object store");
        vocObjectStore.put(entry);
        tx.oncomplete = function () {
          deferred.resolve();
        }
      });
      return deferred.promise;
    };

    var deleteAllEntries = function () {
      var deferred = $q.defer();
      localDatabase.then(function (databaseSession) {
        var tx = databaseSession.transaction(dbModel.objectStores.voc.name, dbModel.accessTypes.readwrite);
        var vocObjectStore = tx.objectStore(dbModel.objectStores.voc.name);
        $log.debug("Deleting all items from the object store");
        vocObjectStore.clear();
        tx.oncomplete = function () {
          deferred.resolve();
        }
      });
      return deferred.promise;
    };

    var getEntriesByLevel = function (level, languageKey) {
      var deferred = $q.defer();
      localDatabase.then(function (databaseSession) {
        var tx = databaseSession.transaction(dbModel.objectStores.voc.name, dbModel.accessTypes.readonly);
        var vocObjectStore = tx.objectStore(dbModel.objectStores.voc.name);
        var vocByLevelIndex = vocObjectStore.index(dbModel.objectStores.voc.indices.voc_by_level);
        var cursorRequest = vocByLevelIndex.openCursor(IDBKeyRange.only(level));

        var entries = [];
        cursorRequest.onerror = function (error) {
          $log.error(error);
        };
        cursorRequest.onsuccess = function (evt) {
          var cursor = evt.target.result;
          if (cursor) {
            var entry = cursor.value;
            if (entry.language === languageKey) {
              entries.push(entry);
            }
            cursor.continue();
          }
        };

        tx.oncomplete = function (evt) {
          deferred.resolve(entries);
        };
      });

      return deferred.promise;
    };

    var getAllEntries = function () {
      var deferred = $q.defer();
      localDatabase.then(function (databaseSession) {
        var tx = databaseSession.transaction(dbModel.objectStores.voc.name, dbModel.accessTypes.readonly);
        var vocObjectStore = tx.objectStore(dbModel.objectStores.voc.name);
        var entries = [];

        tx.oncomplete = function (evt) {
          deferred.resolve(entries);
        };

        var cursorRequest = vocObjectStore.openCursor();
        cursorRequest.onerror = function (error) {
          $log.error(error);
        };
        cursorRequest.onsuccess = function (evt) {
          var cursor = evt.target.result;
          if (cursor) {
            entries.push(cursor.value);
            cursor.continue();
          }
        };
      });
      return deferred.promise;
    };

    model = {
      getEntryById: getEntryById,
      saveEntry: saveEntry,
      deleteAllEntries:deleteAllEntries,
      getAllEntries: getAllEntries,
      getEntriesByLevel: getEntriesByLevel
    };

    return model;
  });
