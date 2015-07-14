angular.module('voctrainerApp')
  .controller('ImportExportEntriesCtrl', function (vocabularyResource) {
    var self = this;

    this.loadEntries = function () {
      self.entries = [];
      vocabularyResource.getAllEntries()
        .then(function (allEntries) {
          allEntries.forEach(
            /** @param {Entry} entry */
              function (entry) {
              self.entries.push(entry);
            });
        });
    };

    this.updateVocabulary = function () {
      var newEntries = JSON.parse(this.entriesStr);
      vocabularyResource.deleteAllEntries();
      newEntries.forEach(function (entry) {
        vocabularyResource.saveEntry(entry);
      })
    };

    this.loadEntries();
  });