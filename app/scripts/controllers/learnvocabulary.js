
angular.module('voctrainerApp')
  .controller('LearnVocabularyCtrl', function (learning) {
    'use strict';

    var self = this;

    this.previousEntry;

    this.currentEntry;
    this.levelsToLearn = '1,2,3,4,5';
    this.direction = false;

    this.notification = {
      text: '',
      success: false,
      visible: false
    };

    this.upvotePreviousEntry = function() {
      if (this.previousEntry) {
        learning.updateLastAnswerToCorrect(this.previousEntry);
      }

      this.notification.visible = false;

      loadNextEntry();
    };

    this.getQuestion = function() {
      var question = '';
      if (this.currentEntry) {
        question = this.direction ? this.currentEntry.word : this.currentEntry.translation;
      }
      return question;
    };

    this.verifyAnswer = function() {
      self.previousEntry = self.currentEntry;
      if (self.previousEntry) {
        self.previousLevel = self.previousEntry.level;
      }

      if (self.currentEntry) {
        var expectedAnswer = this.direction ? this.currentEntry.translation : this.currentEntry.word;
        var correct = expectedAnswer === this.answer;
        if (correct) {
          this.notification.text = 'Correct! ' + self.getQuestion() + ' = ' + expectedAnswer;
          this.notification.success = true;
          this.notification.visible = true;
        } else {
          this.notification.text = 'Incorrect. The correct answer is: ' + expectedAnswer;
          this.notification.success = false;
          this.notification.visible = true;
        }

        learning.addAnswer(self.currentEntry, this.answer, correct, this.direction);
      }

      this.answer = '';
      loadNextEntry();
    };

    this.skip = function() {
      this.notification.visible = false;
      loadNextEntry();
    };

    var loadNextEntry = function() {

      var levels = self.levelsToLearn.replace(" ", "").split(',');
      learning.getNextEntry(levels)
        .then(function(entry) {
          self.currentEntry = entry;
        })
    };

    loadNextEntry();
  });
