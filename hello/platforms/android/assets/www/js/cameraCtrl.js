 mymodule.controller('cameraCtrl', function($scope, $stateParams, $location, $http) {
  function saccesCapture() {
            alert("kk");
          $location.path("app/home");
       };


        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            targetWidth: 512,
            targetHeight: 512,
            destinationType: Camera.DestinationType.DATA_URL,
            correctOrientation: true
        });

        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;


        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

        $scope.upload = function(titre, desc) {



            $scope.titre = "";
            $scope.desc = "";
            if (titre != undefined) {
                $scope.titre = titre;
            }
            if (desc != undefined) {
                $scope.desc = desc;
            }
            $http({
                method: 'GET',
                url: 'http://192.168.1.8:99/TourismeProject/?tag=CountImages'
            }).
            success(function(data, status, headers, config) {
                var imageURI = document.getElementById('myImage').getAttribute("src");
                if (!imageURI) {
                    alert('Please select an image first.');
                    return;
                }
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                var params = new Object();
                params.name = "image_" + data.count;
                options.params = params;
                options.chunkedMode = false;
                var ft = new FileTransfer();
                ft.upload(imageURI, encodeURI("http://192.168.1.8:99/TourismeProject/upload.php"), win($scope.titre, $scope.desc, params.name), fail, options);
                 navigator.notification.alert(
                                                                                    'Picker saved successfully', // message
                                                                                    saccesCapture,
                                                                                    'Succes',
                                                                                    'OK'
                                                                                );
            });

        }

        function successGeo(position) {

            window.localStorage.setItem("latitude", position.coords.latitude);
            window.localStorage.setItem("longitude", position.coords.longitude);

        }

        function failGeo(message) {
            console.log('Failed because: ' + message);
        }

        function win(titre, desc, imageName, r) {



            navigator.geolocation.getCurrentPosition(successGeo, failGeo);



            $http({
                method: 'GET',
                url: 'http://192.168.1.8:99/TourismeProject/?tag=registerImage&titre=' + titre + '&desc=' + desc + '&langitude=' + window.localStorage.getItem("longitude") + '&latitude=' + window.localStorage.getItem("latitude") + '&image=' + imageName + '&user=' + window.localStorage.getItem("user")
            }).
            success(function(data, status, headers, config) {
            });

        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }



    })