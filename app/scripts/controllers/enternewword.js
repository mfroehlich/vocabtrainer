angular.module('voctrainerApp')
  .controller('EnterNewWordCtrl', function ($window, enterNewWordSettings, vocabularyResource, uuid, voctrainerConfig) {
    'use strict';

    this.languageKeys = Object.keys(voctrainerConfig.languages);
    this.enterNewWordSettings = enterNewWordSettings;

    this.entry = new Entry(uuid.generateId());

    this.addEntry = function () {
      if (enterNewWordSettings.selectedLanguageKey) {
        this.entry.language = enterNewWordSettings.selectedLanguageKey;
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
  })
  .service('enterNewWordSettings', function() {
    return {
      selectedLanguageKey : 'NL'
    }
  });
