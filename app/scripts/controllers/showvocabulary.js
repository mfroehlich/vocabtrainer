angular.module('voctrainerApp')
  .controller('ShowVocabularyCtrl', function (vocabularyResource) {
    'use strict';

    var self = this;
    this.entries = [];
    vocabularyResource.getAllEntries()
      .then(function (allEntries) {
        allEntries.forEach(function (entry) {
          self.entries.push(entry);
        });
      });

    this.updateVocabulary = function() {
      var newEntries = JSON.parse(this.entriesStr);
      vocabularyResource.deleteAllEntries();
      newEntries.forEach(function(entry) {
        vocabularyResource.saveEntry(entry);
      })
    }
  });
