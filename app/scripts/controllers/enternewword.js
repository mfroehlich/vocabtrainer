
angular.module('voctrainerApp')
  .controller('EnterNewWordCtrl', function (vocabularyResource, uuid) {
    'use strict';

    this.entry = new Entry(uuid.generateId());
    this.entry.language = 'NL';

    this.addEntry = function() {
      vocabularyResource.saveEntry(this.entry);
      this.entry = new Entry(uuid.generateId());
      this.entry.language = 'NL';
      document.getElementById('word').focus();
    };
  });
