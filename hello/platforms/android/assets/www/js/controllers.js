var mymodule = angular.module('starter.controllers', [])

.controller('menucontroller', function($scope, $ionicModal, $http, $ionicHistory, $rootScope, $ionicPopup, sessionService, $ionicSideMenuDelegate, user, sessionService, $state) {
    try {

        document.addEventListener("deviceready", function() {
            FCMPlugin.onNotification(
                function(data) {

                     if(data.wasTapped){
                       //Notification was received on device tray and tapped by the user.
                       alert( JSON.stringify(data) );

                     }else{
                       //Notification was received in foreground. Maybe the user needs to be notified.
                       alert( JSON.stringify(data) );

                     }
                },
                function(msg) {
                    console.log('onNotification callback successfully registered: ' + msg);
                },
                function(err) {
                    console.log('Error registering onNotification callback: ' + err);
                }
            );
        }, false);

        function backgroundposition(value) {
            /* var bgGeo = window.BackgroundGeolocation;
             var myNum=sessionService.getNum();
             $scope.item={};
             //This callback will be executed every time a geolocation is recorded in the background.
             var callbackFn = function(location, taskId) {
              var coords = location.coords;
             $scope.item.lat=coords.latitude ;
             $scope.item.lng=coords.longitude;
             $scope.item.checked=1;
             var actifPromise =  user.setActif($scope.item,myNum);
             actifPromise.then(function(response){  },function(error){alert(error);});

             // Must signal completion of your callbackFn.
             bgGeo.finish(taskId);
             };
            */
            // The plugin is typically toggled with some button on your UI.

            //Make sure to get at least one GPS coordinate in the foreground before starting background services
            var myNum = sessionService.getNum();

            navigator.geolocation.getCurrentPosition(function(pos) {
                $scope.item = {};
                var location = pos.coords;
                $scope.item.lat = location.latitude;
                $scope.item.lng = location.longitude;
                $scope.item.checked = 1;
                var actifPromise = user.setActif($scope.item, myNum);
                actifPromise.then(function(response) {}, function(error) {
                    alert(error);
                });

                console.log("Succesfully retreived our GPS position, we can now start our background tracker.");
            }, function(err) {
                alert("Cant get position");

            });



            //Get plugin
            var bgLocationServices = window.plugins.backgroundLocationServices;

            //Congfigure Plugin
            bgLocationServices.configure({
                //Both
                desiredAccuracy: 20, // Desired Accuracy of the location updates (lower means more accurate but more battery consumption)
                distanceFilter: 1, // (Meters) How far you must move from the last point to trigger a location update
                debug: true, // <-- Enable to show visual indications when you receive a background location update
                interval: 9000, // (Milliseconds) Requested Interval in between location updates.
                useActivityDetection: true, // Uses Activitiy detection to shut off gps when you are still (Greatly enhances Battery Life)

                //Android Only
                notificationTitle: 'beeride', // customize the title of the notification
                notificationText: 'Tracking', //customize the text of the notification
                fastestInterval: 5000 // <-- (Milliseconds) Fastest interval your app / server can handle updates

            });

            //Register a callback for location updates, this is where location objects will be sent in the background
            bgLocationServices.registerForLocationUpdates(function(location) {
                console.log("xx " + location.longitude + "We got an BG Update" + JSON.stringify(location));

                $scope.item = {};
                $scope.item.lat = location.latitude;
                $scope.item.lng = location.longitude;
                $scope.item.checked = 1;
                var actifPromise = user.setActif($scope.item, myNum);
                actifPromise.then(function(response) {}, function(error) {
                    alert(error);
                });
            }, function(err) {
                console.log("Error: Didnt get an update", err);
            });

             bgLocationServices.registerForActivityUpdates(function(activities) {
                console.log("We got an activity update" + activities);
            }, function(err) {
                console.log("Error: Something went wrong", err);
            });
            if (value == "1") {
                bgLocationServices.start();
            } else {
                bgLocationServices.stop();
            }


        }



        $rootScope.side_menu = document.getElementsByTagName("ion-side-menu")[0];



        // Options: throw an error if no update is received every 30 seconds.
        //
        var watchID;



        $scope.$watch(function() {
            return $ionicSideMenuDelegate.getOpenRatio();
        }, function(newValue, oldValue) {
            if (newValue == 0) {
                $scope.hideLeft = true;
            } else {
                $scope.hideLeft = false;
            }
        });

        $scope.logout = function() {
            sessionService.destroy("riderstate");
            sessionService.destroy("riderpic");
            sessionService.destroy("ridernom");
            sessionService.destroy("riderrndm");
            $state.go('app.login');
        }


    } catch (e) {
        alert(e);
    }

});