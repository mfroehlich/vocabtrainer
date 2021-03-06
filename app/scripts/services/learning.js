angular.module('voctrainerApp')
  .service('learning', function ($q, $log, vocabularyResource, uuid, entrySelection, entryStructure) {
    'use strict';

    function _getLowestLevelEntries(currentLevel, languageKey, levels, entryFilterFunction, returnEntriesCallback) {
      vocabularyResource.getEntriesByLevel(currentLevel, languageKey)
        .then(function (entries) {
          entries = entries.filter(entryFilterFunction);
          if (entries.length > 0) {
            returnEntriesCallback(entries);
          } else if (levels.length > 0) {
            var nextLevel = parseInt(levels[0]);
            var levelsRest = levels.slice(1);
            _getLowestLevelEntries(nextLevel, languageKey, levelsRest, entryFilterFunction, returnEntriesCallback);
          } else {
            returnEntriesCallback([]);
          }
        });
    }

    /**
     * @param {Array.<number>} levels
     */
    var getNextEntry = function (levels, languageKey) {
      var deferred = $q.defer();
      var sortedLevels = levels.sort();
      var level = parseInt(sortedLevels[0]);
      var levelsRest = levels.slice(1);
      _getLowestLevelEntries(level, languageKey, levelsRest, entryStructure.filterEntriesAskedBeforeOver5Minutes,
        function (entries) {
        var entry = selectEntryForQuestioning(entries);
        deferred.resolve(entry);
      });

      return deferred.promise;
    };

    var selectEntryForQuestioning = function (entries) {
      var entry = entrySelection.getEntryNotAskedTheLongestTime(entries);
      return entry;
    };

    /**
     * @param {Entry} entry
     * @param {string} answerText
     * @param {boolean} isAnswerCorrect
     * @param {boolean} direction
     */
    var addAnswer = function (entry, answerText, isAnswerCorrect, direction) {

      var previousLevel = entry.level;

      if (isAnswerCorrect) {
        Entry.incrementLevel(entry);
      } else {
        Entry.decrementLevel(entry);
        Entry.decrementLevel(entry);
      }

      var answer = new Answer(uuid.generateId(), answerText, isAnswerCorrect, previousLevel, entry.level, direction);
      entry.answers.push(answer);

      vocabularyResource.saveEntry(entry);
    };

    /**
     * @param {Entry} entry
     */
    var updateLastAnswerToCorrect = function (entry) {
      var lastAnswer = entry.answers[entry.answers.length - 1];
      entry.level = lastAnswer.fromLevel;
      Entry.incrementLevel(entry);
      Entry.incrementLevel(entry);
      lastAnswer.toLevel = entry.level;
      lastAnswer.correct = true;

      vocabularyResource.saveEntry(entry);
    };

    var model = {
      getNextEntry: getNextEntry,
      addAnswer: addAnswer,
      updateLastAnswerToCorrect: updateLastAnswerToCorrect
    };

    return model;
  })
;
