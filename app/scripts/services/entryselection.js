angular.module('voctrainerApp')
  .service('entrySelection', function (entryStructure) {

    var getEntryByRandom = function (entries) {
      var index = Math.floor((Math.random() * entries.length));
      var entry = entries[index];
      return entry;
    };

    var getEntryHavingLeastCorrectAnswers = function (entries) {
      var entry;
      if (entries.length > 0) {
        entries.sort(entryStructure.sortByCorrectAnswersAscending);
        entry = entries[0];
      }
      else {
        entry = null;
      }
      return entry;
    };

    var getEntryNotAskedTheLongestTime = function (entries) {
      var entry;
      if (entries.length > 0) {
        entries.sort(entryStructure.sortByLastAnswerTimestampAscending);
        entry = entries[0];
      } else {
        entry = null;
      }
      return entry;
    };

    var model = {
      getEntryByRandom: getEntryByRandom,
      getEntryHavingLeastCorrectAnswers: getEntryHavingLeastCorrectAnswers,
      getEntryNotAskedTheLongestTime: getEntryNotAskedTheLongestTime
    };

    return model;
  });