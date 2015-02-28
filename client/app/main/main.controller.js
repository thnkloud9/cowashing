'use strict';

angular.module('cowashingApp')
  .controller('MainCtrl', function ($scope, $http, $modal, socket, uiGmapGoogleMapApi) {
    $scope.things = [];
    $scope.markers = [];
    $scope.map = {};

    $http.get('/api/things').success(function(things) {
      $scope.things = things;
      socket.syncUpdates('thing', $scope.things);
      // get map coordinates
      angular.forEach($scope.things, function (thing) {
        $scope.mapThing(thing); 
      });
    });

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
      
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.updateSearch = function () {
console.log('updating search');
    };

    $scope.showSearch = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/main/search-modal.html',
        controller: 'MainCtrl',
        size: 'small',
        resolve: {}
      });
    };

    $scope.showMachineAdd = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/thing/thing-add-modal.html',
        controller: 'ThingCtrl',
        size: 'small',
        resolve: {
          thing: function () {
            return {};
          }
        }
      });
      modalInstance.result.then(function (newThing) {
        $scope.newThing = newThing;
        $scope.mapThing(newThing);
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

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
      $scope.mapOptions = {
        scrollwheel: false,
        mapTypeControl: false
      };
      $scope.map = { center: { latitude: 52.5036791, longitude: 13.3188364 }, zoom: 15 };
    });

  });
