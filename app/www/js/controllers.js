angular.module('app.controllers', [])

.controller('AppCtrl', function($scope) {
  $scope.APP_NAME = APP_NAME;
  $scope.APP_DESC = APP_DESC;
})

.controller('AuthCtrl', function($scope, Users, $state) {
  $scope.user = {};

  // FIXME
  $scope.login = function(user) {

    var _user = Users.getByUsername(user.username);
    if (_user && _user.password == user.password) {

        window.dataStore.put(STORAGE_KEY.LOGGED_USER, {
          username: _user.username,
          user_type: _user.user_type
        });
        $state.go('volunteer.dashboard');
    }

    $scope.error = "Invalid username or password";
  }
})

.controller('VolunteerCtrl', function($scope, Projects) {
  $scope.projects = Projects.all();
})

.controller('ProjectViewCtrl', function($scope, $stateParams, Projects) {
  $scope.project = Projects.getById($stateParams.projectId);
});
