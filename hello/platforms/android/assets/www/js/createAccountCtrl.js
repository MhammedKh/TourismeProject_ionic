mymodule.controller('createAccountCtrl', function($scope, $stateParams, $http, $location) {


        function alertDismissed() {

            document.getElementById("mp").value = "";
            document.getElementById("cmp").value = "";
        }

        function serverErrorAlert() {
            $location.path("app/login");
        }

        function existAccountAlert() {
            document.getElementById("mp").value = "";
            document.getElementById("cmp").value = "";
            document.getElementById("nom").value = "";
            document.getElementById("prenom").value = "";
            document.getElementById("email").value = "";
            document.getElementById("age").value = "";

        }


        $scope.create = function(accountData) {


            if (accountData.mp != accountData.cmp) {
                navigator.notification.alert(
                    'password not equals to Confirm Password !! please try again', // message
                    alertDismissed,
                    'Error',
                    'OK'
                );
            } else {
                $http({
                    method: 'GET',
                    url: 'http://192.168.1.8:99/TourismeProject/?tag=register&nom=' + accountData.nom + '&prenom=' + accountData.prenom + '&age=' + accountData.age + '&email=' + accountData.email + '&password=' + accountData.mp
                }).
                success(function(data, status, headers, config) {
                    if (data.success == "0") {
                        navigator.notification.alert(
                            'Account with email ' + accountData.email + ' already exist !! please try again', // message
                            existAccountAlert,
                            'Error',
                            'OK'
                        );
                    } else {

                        $location.path("app/home");
                    }

                }).
                error(function(data, status, headers, config) {
                    navigator.notification.alert(
                        'Error in server  !! please try again', // message
                        serverErrorAlert,
                        'Error',
                        'OK'
                    );
                });




            }
        }


    })