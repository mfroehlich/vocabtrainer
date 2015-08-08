
angular.module('voctrainerApp')
  .controller('LearnVocabularyCtrl', function ($location, learning, learnSettings, learnStatistics, entryStructure) {
    'use strict';

    this.learnSettings = learnSettings;
    this.learnStatistics = learnStatistics;

    this.notification = {
      text: '',
      success: false,
      visible: false
    };

    this.upvotePreviousEntry = function() {
      if (learnSettings.previousEntry) {
        learning.updateLastAnswerToCorrect(learnSettings.previousEntry);
        learnStatistics.changeWrongToCorrect();
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

    this.getCorrectAnswersCount = function() {
      var correctAnswersCount = learnSettings.currentEntry ? entryStructure.countCorrectAnswers(learnSettings.currentEntry) : 0;
      return correctAnswersCount;
    };

    this.getAnswersCount = function() {
      var answersCount = learnSettings.currentEntry ? learnSettings.currentEntry.answers.length : 0;
      return answersCount;
    };

    this.getLastAnswerCreationDate = function() {
      var lastAnswer = learnSettings.currentEntry && learnSettings.currentEntry.answers.length > 0
        ? learnSettings.currentEntry.answers[learnSettings.currentEntry.answers.length-1] : null;
      var lastAnswerCreationDate = lastAnswer ? lastAnswer.created : '';
      return lastAnswerCreationDate;
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
          learnStatistics.answerWasCorrect();
        } else {
          this.notification.text = learnSettings.getQuestion() + ' = ' + expectedAnswer;
          this.notification.success = false;
          this.notification.visible = true;
          learnStatistics.answerWasWrong();
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

      var levels = [];
      for (var level = 1; level <= 5; level++) {
        if (learnSettings.levelsToLearn[level]) {
          levels.push(level);
        }
      }

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

    this.visible = true;

    this.previousEntry;
    this.previousLevel;

    /** @type {Entry} */
    this.currentEntry;
    this.levelsToLearn = {1 : true, 2: true, 3: true, 4: true, 5: true};
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
  })
  .service('learnStatistics', function() {
    var correct = 0;
    var wrong = 0;

    this.answerWasCorrect = function() {
      correct++;
    };
    this.answerWasWrong = function(){
      wrong++;
    };
    this.changeWrongToCorrect = function() {
      wrong--;
      correct++;
    };
    this.getCorrect = function() {
      return correct;
    };
    this.getWrong = function() {
      return wrong;
    };

  });
