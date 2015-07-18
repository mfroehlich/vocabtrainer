angular.module('voctrainerApp')
  .controller('EditEntryCtrl', function ($routeParams, $location, $log, vocabularyResource, voctrainerConfig) {

    var self = this;
    this.entry = {};
    var entryId = $routeParams.entryId;

    // referrer-values: showvocabulary
    var referrer = $routeParams.referrer;
    if (!referrer) {
      referrer = 'showvocabulary';
    }

    vocabularyResource.getEntryById(entryId)
      .then(function (entry) {
        $log.debug('Loaded entry: ', entry);
        self.entry = entry;
      });

    this.updateEntry = function () {
      vocabularyResource.saveEntry(self.entry)
        .then(function() {
          self.back();
        })
    };

    this.back = function() {
      $location.path('/' + referrer);
    };

    this.getLanguageName = function (languageKey) {
      return voctrainerConfig.languages[languageKey];
    };

  });