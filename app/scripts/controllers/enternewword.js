angular.module('voctrainerApp')
  .controller('EnterNewWordCtrl', function ($window, vocabularyResource, uuid, voctrainerConfig) {
    'use strict';

    this.languageKeys = Object.keys(voctrainerConfig.languages);
    this.selectedLanguageKey = 'NL';

    this.entry = new Entry(uuid.generateId());

    this.addEntry = function () {
      if (this.selectedLanguageKey) {
        this.entry.language = this.selectedLanguageKey;
        vocabularyResource.saveEntry(this.entry);

        this.entry = new Entry(uuid.generateId());
        document.getElementById('word').focus();
      } else {
        $window.alert('Please select a language.');
      }
    };

    this.getLanguageName = function (languageKey) {
      return voctrainerConfig.languages[languageKey];
    };
  });
