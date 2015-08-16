angular.module('app', ['ionic', 'app.controllers', 'app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('index', {
      url: '/',
      templateUrl: 'templates/home.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'AuthCtrl'
    })

    .state('volunteer', {
      url: '/volunteer',
      abstract: true,
      templateUrl: 'templates/volunteer.html',
      controller: 'VolunteerCtrl'
    })

    .state('volunteer.dashboard', {
      url: '/dashboard',
      views: {
        'volunteer-dashboard': {
          templateUrl: 'templates/volunteer/dashboard.html'
        }
      }
    })

    .state('project', {
      url: '/project',
      abstract: true,
      templateUrl: 'templates/project.html',
      controller: 'VolunteerCtrl'
    })

    .state('project.view', {
      url: '/view/:projectId',
      views: {
        'project-view': {
          templateUrl: 'templates/project/view.html',
          controller: 'ProjectViewCtrl'
        }
      }
    })

    .state('project.signup', {
      url: '/signup/:projectId',
      views: {
        'project-signup': {
          templateUrl: 'templates/project/signup.html',
          controller: 'ProjectSignupCtrl'
        }
      }
    })

    .state('organization', {
      url: '/organization',
      abstract: true,
      templateUrl: 'templates/organization.html',
      controller: 'OrganizationCtrl'
    })

    .state('organization.dashboard', {
      url: '/dashboard',
      views: {
        'organization-dashboard': {
          templateUrl: 'templates/organization/dashboard.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');

});
