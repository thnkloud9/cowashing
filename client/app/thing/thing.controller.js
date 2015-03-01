'use strict';

angular.module('cowashingApp')
  .controller('ThingCtrl', function ($scope, $compile, $q, $http, $modalInstance, thing, toaster, socket, Auth, User) {
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
          allDay: true,
          color: 'red',
          rendering: 'background'
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
          allDay: true,
          rendering: 'background'
        });
      });
    };

    $scope.eventRender = function( event, element, view ) {
      var left = parseInt(element.css('left'));
      var top = parseInt(element.css('top'));
      var width = parseInt(element.css('width'));
      var height = parseInt(element.css('height'));
      element.css({
        'opacity': '0.2',
        'left': left - 3,
        'width': width + 5,
        'top': top - 22,
        'height': 24
      });
      $compile(element)($scope);
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
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    $scope.eventSources = [$scope.events];
  });
