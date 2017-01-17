mymodule.controller('mapCtrl', function($scope, $rootScope, Markers, $interval, $state, $stateParams, sessionService, $ionicPopup, $http) {
    var timer = null;
    var riderPromise;
    $scope.data = {};

    try {
        $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
            // viewData.enableBack = false;

            // $scope.doRefresh();
        });
        $scope.$on('$ionicView.beforeLeave', function(event, viewData) {
            // $interval.cancel(timer);
            $scope.map.clear();
            $scope.map.off();
            // $scope.doRefresh();
        });

        $scope.$on('$ionicView.enter', function() {

            //  $rootScope.side_menu.style.visibility = "hidden";
            $scope.data = $stateParams;
            $scope.initMap();
        });
        var posOptions = {
            // timeout: 10000,
            enableHighAccuracy: true
        };
        $scope.initMap = function() {
            try {
                $scope.data = $stateParams;
                var div = document.getElementById("map");


                if (!$scope.map)
                    $scope.map = plugin.google.maps.Map.getMap(div);



                $scope.map.clear();
                $scope.map.setDiv(div);
                $scope.map.refreshLayout();
                navigator.geolocation.getCurrentPosition(getPosReady, function(err) {
                    alert("Cant get position");
                    //getPosReady(new plugin.google.maps.LatLng(17.422858, -12.085065));
                }, posOptions);


                /*navigator.geolocation.watchPosition(
                    function(position) {
                        setMarkerPosition(position);
                    },
                    function(err) {
                        alert("Cant get position");
                    }, {
                        maximumAge: 600000,
                        // timeout: 15000,
                        enableHighAccuracy: true
                    });*/

            } catch (e) {
                alert(e);
            }
        }

      /* function setMarkerPosition(pos) {

        alert("aaa");
            $scope.myPosition = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            };

            $scope.map.setCenter(new plugin.google.maps.LatLng(
                pos.coords.latitude,
                pos.coords.longitude
            ));
            if ($scope.Mymarker)
                $scope.Mymarker.position = new plugin.google.maps.LatLng(
                    pos.coords.latitude,
                    pos.coords.longitude
                );
            else {
                $scope.map.addMarker({
                    'position': new plugin.google.maps.LatLng(
                        pos.coords.latitude,
                        pos.coords.longitude
                    ),
                    'icon': {
                        'url': 'www/img/icone-scooter.png'
                    }

                }, function(marker) {
                    $scope.Mymarker = marker;

                });

            }






        }*/


        function addImageMarker(){
         $http({
                        method: 'GET',
                        url: 'http://192.168.1.8:99/TourismeProject/?tag=getAllImage'
                    }).
                    success(function(data, status, headers, config) {
                        try {

                        var icon ;
                        for(var compt in data.images )
                                            {
                        icon= new google.maps.MarkerImage(
                            "http://192.168.1.8:99/TourismeProject/images/" + data.images[compt].image + ".jpg",


                            new google.maps.Size(50, 50)
                        );





                            $scope.map.addMarker({
                                position: new plugin.google.maps.LatLng(data.images[compt].latitude, data.images[compt].longitude),

                                    icon: icon ,

                                title: data.images[compt].titre + "\n" +
                                    ""
                            }, function(marker) {

                                $scope.riderMarker = marker;
                                google.maps.event.addDomListener(marker, 'click', function() {alert("aaa");});






                            });




                             }

                        } catch (e) {
                            alert(e);
                        }


                    }).
                    error(function(data, status, headers, config) {

                    });

        }

        function getPosReady(position) {


            try {

                $scope.myPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                $scope.map.setCenter(new plugin.google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                ));

                $scope.map.animateCamera({
                    target: new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    zoom: 3,
                    tilt: 10,
                    bearing: 10,
                    duration: 3000
                }, function() {

                    var markerSizeScale = 5;
                    var markerSize = {
                        width: parseInt(37 * markerSizeScale),
                        height: parseInt(52 * markerSizeScale)
                    };
                    $scope.map.addMarker({
                        position: new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        title: "Je suis là \n" +
                            "",
                        'icon': {
                            'url': 'www/img/icone-scooter.png'
                        }
                    }, function(marker) {
                        $scope.Mymarker = marker;
                        marker.setDraggable(false);
                        marker.on(plugin.google.maps.event.INFO_CLICK, function() {});
                    });

                });


                addImageMarker();

            } catch (e) {
                alert(e);
            }
        }



    } catch (e) {
        alert(e);
    }



})