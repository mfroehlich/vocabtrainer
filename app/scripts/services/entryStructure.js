angular.module('voctrainerApp')
  .service('entryStructure', function () {

    /**
     *
     * @param {Entry} entryA
     * @param {Entry} entryB
     */
    var sortByCorrectAnswersAscending = function (entryA, entryB) {
      var correctAnswersA = countCorrectAnswers(entryA);
      var correctAnswersB = countCorrectAnswers(entryB);
      return correctAnswersA - correctAnswersB;
    };

    var sortByLastAnswerTimestampAscending = function (entryA, entryB) {
      var numberOfAnswersA = entryA.answers.length;
      var numberOfAnswersB = entryB.answers.length;

      var compare = 0;
      if (numberOfAnswersA === 0) {
        compare = 1;
      } else if (numberOfAnswersB === 0) {
        compare = -1;
      } else {
        var answerA = entryA.answers[numberOfAnswersA-1];
        var answerB = entryB.answers[numberOfAnswersB-1];
        compare = answerA.created > answerB.created ? 1 : -1;
      }
      return compare;
    };

    var countCorrectAnswers = function(entry) {
      var correctAnswersCnt = entry.answers.filter(filterCorrectAnswers).length;
      return correctAnswersCnt;
    };

    /** @param {Answer} answer */
    var filterCorrectAnswers = function (answer) {
      return answer.correct === true;
    };

    var model = {
      sortByCorrectAnswersAscending:sortByCorrectAnswersAscending,
      sortByLastAnswerTimestampAscending: sortByLastAnswerTimestampAscending,

      countCorrectAnswers:countCorrectAnswers
    };

    return model;
  });