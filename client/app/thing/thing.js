'use strict';

angular.module('cowashingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('thing', {
        url: '/thing',
        templateUrl: 'app/thing/thing.html',
        controller: 'ThingCtrl'
      });
  });
