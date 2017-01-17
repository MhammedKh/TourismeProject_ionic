mymodule.controller('loginCtrl', function($scope, $stateParams, $ionicSideMenuDelegate, $location, $http) {

      $ionicSideMenuDelegate.canDragContent(false);

      function loginErrorAlert() {

          document.getElementById("login_email").value = "";
          document.getElementById("login_pw").value = "";
      }

      function serverErrorAlert() {
          $window.close()
      }
      $scope.createAccount = function() {



          $location.path("app/createAccount");
      }

      $scope.doLogin = function(loginData) {

          $http({
              method: 'GET',
              url: 'http://192.168.1.8:99/TourismeProject/?tag=login&email=' + loginData.email + '&password=' + loginData.pw
          }).
          success(function(data, status, headers, config) {
              if (data.success == "0") {
                  navigator.notification.alert(
                      'Incorrect email or password !! please try again',
                      loginErrorAlert,
                      'Error',
                      'OK'
                  );
              } else {

                  window.localStorage.setItem("user", data.id);

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

      var networkState = navigator.connection.type;
      if (networkState == "none") {

          navigator.notification.alert(
              'There is no internet connection',
              serverErrorAlert,
              'Error',
              'OK'
          );
      }

})