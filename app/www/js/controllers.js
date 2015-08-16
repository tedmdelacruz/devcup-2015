angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $state) {
  $scope.APP_NAME = APP_NAME;
  $scope.APP_DESC = APP_DESC;

  if ($state.is('index') || $state.is('login')) {
    Auth.logout();
  }
})

.controller('AuthCtrl', function($scope, Users, Auth, $state) {
  $scope.user = {};

  // FIXME
  $scope.login = function(user) {

    var _user = Users.getByUsername(user.username);
    if (_user && _user.password == user.password) {

        Auth.login({
          user_id: _user.id,
          username: _user.username,
          user_type: _user.user_type
        });
        $state.go('volunteer.dashboard');
        return;
    }

    $scope.error = "Invalid username or password";
  }
})

.controller('VolunteerCtrl', function($scope, Projects) {
  $scope.projects = Projects.all();
})

.controller('ProjectViewCtrl', function($scope, $stateParams, Projects) {
  $scope.project = Projects.getById($stateParams.projectId);
})

.controller('ProjectSignupCtrl', function($scope, $state, $stateParams, Projects, ProjectSignups, Auth) {
  $scope.project = Projects.getById($stateParams.projectId);
  $scope.signupData = {
    projectId: $scope.project.id
  };

  $scope.signup = function(signupData) {
    var loggedUser = Auth.user();
    ProjectSignups.add({
      user_id: loggedUser.user_id,
      project_id: signupData.projectId,
      jobs: Object.keys(signupData.jobs)
    });

    $state.go('project.view', {
      projectId: signupData.projectId,
      message: {type: 'success', text: "Successfully signed up for project"}
    });
  };
});
