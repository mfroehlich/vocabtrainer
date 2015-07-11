angular.module('voctrainerApp')
.service('searchVocabularySearchValues', function() {
    return {
      searchString: '',
      incompleteEntriesOnly : false
    }
  });