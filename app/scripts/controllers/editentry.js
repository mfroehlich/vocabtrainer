angular.module('voctrainerApp')
  .controller('EditEntryCtrl', function ($routeParams, $location, $log, vocabularyResource) {

    var self = this;
    this.entry = {};
    var entryId = $routeParams.entryId;

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
    // TODO mfroehlich Service einführen, der hält, wo der User herkam und dorthin zurückverlinken
    this.back = function() {
      $location.path('/showvocabulary');
    };
  });