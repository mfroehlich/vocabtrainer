angular.module('voctrainerApp')
  .controller('ShowVocabularyCtrl', function ($location, vocabularyResource, searchVocabularySearchValues) {
    'use strict';

    var self = this;

    this.totalNumberOfEntries = '';

    this.searchValues = searchVocabularySearchValues;

    this.loadEntries = function() {
      self.entries = [];
      vocabularyResource.getAllEntries()
        .then(function (allEntries) {
          self.totalNumberOfEntries = allEntries.length;
          allEntries.forEach(
            /** @param {Entry} entry */
            function (entry) {
            if (!self.searchValues.incompleteEntriesOnly ||
              (entry.word == null || entry.word.trim().length === 0 || entry.translation == null ||entry.translation.trim().length === 0)) {
              self.entries.push(entry);
            }
          });
        });
    };

    this.updateVocabulary = function() {
      var newEntries = JSON.parse(this.entriesStr);
      vocabularyResource.deleteAllEntries();
      newEntries.forEach(function(entry) {
        vocabularyResource.saveEntry(entry);
      })
    };
    this.editEntry = function(entryId) {
      $location.path('/editEntry/' + entryId);
    };

    /**
     * @param {Entry} entry
     * @returns {*}
     */
    this.filterEntries = function(entry) {
      var entryUpper = entry.word.toUpperCase() + ' ' + entry.translation.toUpperCase();
      var compare = self.searchValues.searchString.toUpperCase();
      return entryUpper.includes(compare);
    }

    this.loadEntries();
  });
