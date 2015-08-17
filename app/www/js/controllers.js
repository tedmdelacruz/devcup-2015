angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $state, Auth) {
  $scope.APP_NAME = APP_NAME;
  $scope.APP_DESC = APP_DESC;

  if ($state.is('index') || $state.is('login')) {
    Auth.logout();
  }

  $scope.logout = function () {
    Auth.logout();
    $state.go('login');
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
          user_type: _user.user_type,
          organization_id: _user.organization_id
        });

        if (_user.user_type == USER_TYPE.ORGANIZATION) {
          $state.go('organization.dashboard');
          return;
        }
        $state.go('volunteer.dashboard');
        return;
    }

    $scope.error = "Invalid username or password";
  }
})

.controller('VolunteerCtrl', function($scope, Auth, Projects, ProjectSignups) {
  $scope.user = Auth.user();
  $scope.projects = Projects.all();
  $scope.ProjectSignups = ProjectSignups; // FIXME

  $scope.isSignedUp = function(userId, projectId, ProjectSignups) {
     return Boolean(ProjectSignups.getByUserIdAndProjectId(userId, projectId));
  };

})

.controller('ProjectViewCtrl', function($scope, $stateParams, Projects, Auth, ProjectSignups) {
  $scope.project = Projects.getById($stateParams.projectId);

  $scope.isSignedUp = function(Auth, ProjectSignups, projectId) {
    var user = Auth.user();
    var signups = ProjectSignups.getByUserIdAndProjectId(user.user_id, projectId);
    return Boolean(signups);
  }(Auth, ProjectSignups, $stateParams.projectId);

   $scope.isSignedUp;
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
})

.controller('OrganizationCtrl', function($scope, Auth, Projects, ProjectSignups, Organizations) {
  $scope.user = Auth.user();
  $scope.projects = Projects.getByOrganizationId($scope.user.organization_id);
  $scope.organization = Organizations.getById($scope.user.organization_id);
})

.controller('OrgProjectViewCtrl', function($scope, $stateParams, Projects, ProjectSignups, Users) {
  $scope.project = Projects.getById($stateParams.projectId);
  var signups  = ProjectSignups.getByProjectId($scope.project.id);
  $scope.volunteers = [];

  if ( ! signups) {
    return;
  }

  var ii = 0;
  for (ii; ii < signups.length; ii++) {
    $scope.volunteers.push(Users.getById(signups[ii].user_id));
  }
});
