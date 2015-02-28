'use strict';

angular.module('cowashingApp')
  .controller('ThingCtrl', function ($scope, $q, $http, $modalInstance, thing, toaster, socket, Auth, User) {
    $scope.thing = thing;
    $scope.events = [];
    $scope.hstep = 1;
    $scope.mstep = 1;
    $scope.request = {};
    $scope.validRequestDate = false;
    $scope.newThing = {};

    if ($scope.thing.booking_requests) {
      angular.forEach($scope.thing.booking_requests, function (booking) {
        $scope.events.push({
          start: booking.date,
          title: 'b'
        });
      });
    }

    $scope.addThing = function () {
      if($scope.newThing === '') {
        return;
      }
      $scope.newThing.booking_requests = [];
      $scope.newThing.city = "Berlin";
      $scope.newThing.country = "DE";
      $scope.newThing.postal_code = "10623";
      $http.post('/api/things', $scope.newThing).then(function (response) {
        toaster.pop('success', 'Machine Added', 'Your new machine has been added'); 
        $scope.newThing = response.data;
        $modalInstance.close($scope.newThing);
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.setDate = function(date) {
      $scope.request = {
        user: Auth.getCurrentUser()._id,
        accepted: false, 
        date: date,
      }
      $scope.validRequestDate = true;
    };

    $scope.sendRequest = function() {
      var thing = $scope.thing;

      thing.booking_requests.push($scope.request);
      $http.put('/api/things/'+ thing._id, thing).then(function (response) {
        $scope.thing = response.data;
        toaster.pop('success', 'Sent', 'Your request has been sent');
        $scope.events.push({
          start: $scope.request.date,
          title: 'b'
        });
      });
    };

    // calendar config
    $scope.uiConfig = {
      calendar:{
        aspectRatio: 1.5,
        editable: true,
        header:{
          left: '',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.setDate,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

    $scope.eventSources = [$scope.events];
  });
