'use strict';

/**
 * @ngdoc overview
 * @name voctrainerApp
 * @description
 * # voctrainerApp
 *
 * Main module of the application.
 */
angular
  .module('voctrainerApp', [
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl',
        controllerAs: 'welcomeCtrl'
      })
      .when('/enternewword', {
        templateUrl: 'views/enternewword.html',
        controller: 'EnterNewWordCtrl',
        controllerAs: 'enterNewWordCtrl'
      })
      .when('/showvocabulary', {
        templateUrl: 'views/showvocabulary.html',
        controller: 'ShowVocabularyCtrl',
        controllerAs: 'showVocabularyCtrl'
      })
      .when('/importexport', {
        templateUrl: 'views/importexportentries.html',
        controller: 'ImportExportEntriesCtrl',
        controllerAs: 'importExportEntriesCtrl'
      })
      .when('/learnvocabulary', {
        templateUrl: 'views/learnvocabulary.html',
        controller: 'LearnVocabularyCtrl',
        controllerAs: 'learnVocabularyCtrl'
      })
      .when('/editEntry/:entryId/:referrer', {
        templateUrl: 'views/editentry.html',
        controller: 'EditEntryCtrl',
        controllerAs: 'editEntryCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
