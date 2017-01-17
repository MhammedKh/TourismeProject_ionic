mymodule.controller('homeCtrl', function($scope,   $rootScope, $ionicLoading, $http,  $state) {

  $http({
                  method: 'GET',
                  url: 'http://192.168.1.8:99/TourismeProject/?tag=getImage&user='+window.localStorage.getItem("user")
              }).
              success(function(data, status, headers, config) {
              try{

              $scope.srcs = [];
                $scope.names =[];

              for(var compt in data.images )
              {


                $scope.srcs[compt]="http://192.168.1.8:99/TourismeProject/images/"+data.images[compt].image+".jpg";
                $scope.names[compt] =data.images[compt].titre;


              }










                }catch(e){
                alert(e);
                }


              }).
              error(function(data, status, headers, config) {

              });

              })