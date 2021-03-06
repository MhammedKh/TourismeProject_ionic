// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//Stripe.setPublishableKey('fillMePlease');
document.addEventListener("deviceready", function() {
    navigator.splashscreen.hide();


}, false);
var mymodule = angular.module('starter', ['ionic', 'ionic-ratings', 'starter.controllers', 'ngCordova', 'vsGoogleAutocomplete', 'angular-svg-round-progress', 'ion-datetime-picker'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {



            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        //$ionicConfigProvider.backButton.text('').icon('ion-ios7-arrow-left');
        if (!ionic.Platform.isIOS()) {
            $ionicConfigProvider.scrolling.jsScrolling(false);
        }
        // $ionicConfigProvider.views.maxCache(0);
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'menucontroller'
            })




            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller: 'loginCtrl'
                    }
                }
            })

            .state('app.camera', {
                            url: '/camera',
                            views: {
                                'menuContent': {
                                    templateUrl: 'templates/camera.html',
                                    controller: 'cameraCtrl'
                                }
                            }
                        })

            .state('app.createAccount', {
                            url: '/createAccount',
                            views: {
                                'menuContent': {
                                    templateUrl: 'templates/createAccount.html',
                                    controller: 'createAccountCtrl'
                                }
                            }
                        })

             .state('app.home', {
                                        url: '/home',
                                        views: {
                                            'menuContent': {
                                                templateUrl: 'templates/home.html',
                                                controller: 'homeCtrl'
                                            }
                                        }
                                    })

            .state('app.map', {
                url: '/map/:id/:photo/:tel',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/map.html',
                        controller: "mapCtrl"
                    }
                }
            })

            .state('app.avis2', {
                url: '/avis2/:typeR',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/avis2.html',
                        controller: "avis2Ctrl"
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/login');
    });