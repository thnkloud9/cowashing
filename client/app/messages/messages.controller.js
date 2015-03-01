'use strict';

angular.module('cowashingApp')
  .controller('MessagesCtrl', function ($scope, $compile, $q, $http, $modalInstance, toaster, socket, Auth, User) {
    $scope.messages = [];
  });
