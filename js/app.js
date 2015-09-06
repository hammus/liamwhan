'use strict';

/**
 * @ngdoc overview
 * @name angseedApp
 * @description
 * # angseedApp
 *
 * Main module of the application.
 */
angular
  .module('liamwhanApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'Ctrl_Home'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
