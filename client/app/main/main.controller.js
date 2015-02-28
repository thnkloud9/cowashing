'use strict';

angular.module('cowashingApp')
  .controller('MainCtrl', function ($scope, $http, $modal, socket, uiGmapGoogleMapApi) {
    $scope.things = [];
    $scope.markers = [];

    $http.get('/api/things').success(function(things) {
      $scope.things = things;
      socket.syncUpdates('thing', $scope.things);
      // get map coordinates
      angular.forEach($scope.things, function (thing) {
        $scope.mapThing(thing); 
      });
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $scope.newThing.booking_requests = [];
      $http.post('/api/things', $scope.newThing);
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.showMachineDetails = function (thing) {
      var modalInstance = $modal.open({
        templateUrl: 'app/thing/thing-modal.html',
        controller: 'ThingCtrl',
        size: 'small',
        resolve: {
          thing: function () {
            return thing;
          }
        }
      });
    };

    $scope.mapThing = function(thing) {
      // get coordinates for thing address
      var marker = {
        id: thing._id,
        coords: {
          latitude: thing.lat,
          longitude: thing.lng 
        },
        options: { draggable: false },
        click: function () {
          $scope.showMachineDetails(thing);
        },
        events: {}
      };
      $scope.markers.push(marker);
    };

    // load map
    uiGmapGoogleMapApi.then(function(maps) {
      $scope.options = {scrollwheel: false};
      $scope.map = { center: { latitude: 52.5036791, longitude: 13.3188364 }, zoom: 15 };
    });

  });
