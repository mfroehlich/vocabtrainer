
angular.module('voctrainerApp')
  .controller('LearnVocabularyCtrl', function ($location, learning, learnSettings) {
    'use strict';

    this.learnSettings = learnSettings;

    this.notification = {
      text: '',
      success: false,
      visible: false
    };

    this.upvotePreviousEntry = function() {
      if (learnSettings.previousEntry) {
        learning.updateLastAnswerToCorrect(learnSettings.previousEntry);
      }
      this.notification.visible = false;

      if (learnSettings.previousEntry.id === learnSettings.currentEntry.id) {
        loadNextEntry();
      }
    };

    this.getQuestion = function() {
      return learnSettings.getQuestion();
    };

    this.editPreviousEntry = function() {
      var entryId = learnSettings.previousEntry.id;
      $location.path('/editEntry/' + entryId + '/learnvocabulary');
    };

    this.editEntry = function() {
      var entryId = learnSettings.currentEntry.id;
      $location.path('/editEntry/' + entryId + '/learnvocabulary');
    };

    this.verifyAnswer = function() {
      learnSettings.updatePreviousEntry();

      if (learnSettings.currentEntry) {
        var expectedAnswer = learnSettings.direction ? learnSettings.currentEntry.translation : learnSettings.currentEntry.word;
        var correct = expectedAnswer === this.answer;
        if (correct) {
          this.notification.text = learnSettings.getQuestion() + ' = ' + expectedAnswer;
          this.notification.success = true;
          this.notification.visible = true;
        } else {
          this.notification.text = learnSettings.getQuestion() + ' = ' + expectedAnswer;
          this.notification.success = false;
          this.notification.visible = true;
        }

        learning.addAnswer(learnSettings.currentEntry, this.answer, correct, learnSettings.direction);
      }

      this.answer = '';
      loadNextEntry();
    };

    this.skip = function() {
      this.notification.visible = false;
      loadNextEntry();
    };

    var loadNextEntry = function() {

      var levels = learnSettings.levelsToLearn.replace(" ", "").split(',');
      learning.getNextEntry(levels, learnSettings.selectedLanguageKey)
        .then(function(entry) {
          learnSettings.currentEntry = entry;
        })
    };

    /*
    Lade ein Wort für die Abfrage, wenn noch keines geholt wurde.
     */
    if (!learnSettings.currentEntry) {
      loadNextEntry();
    }
  })
  .service('learnSettings', function(voctrainerConfig) {
    this.previousEntry;
    this.previousLevel;

    /** @type {Entry} */
    this.currentEntry;
    this.levelsToLearn = '1,2,3,4,5';
    this.direction = false;

    this.languageKeys = Object.keys(voctrainerConfig.languages);
    this.selectedLanguageKey = 'NL';

    this.getQuestion = function() {
      var question = '';
      if (this.currentEntry) {
        question = this.direction ? this.currentEntry.word : this.currentEntry.translation;
      }
      return question;
    };

    this.updatePreviousEntry = function() {
      this.previousEntry = this.currentEntry;
      if (this.previousEntry) {
        this.previousLevel = this.previousEntry.level;
      }
    };

    this.getLanguageName = function (languageKey) {
      return voctrainerConfig.languages[languageKey];
    };
  });
