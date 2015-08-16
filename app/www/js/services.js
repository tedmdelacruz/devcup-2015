angular.module('app.services', [])

.factory('Auth', function() {
  var key = 'auth';
  return {
    all: function() {
      return window.dataStore.get(key);
    },
    user: function() {
      return window.dataStore.get(STORAGE_KEY.LOGGED_USER);
    },
    login: function(userData) {
      window.dataStore.put(STORAGE_KEY.LOGGED_USER, userData);
    },
    logout: function() {
      window.dataStore.delete(STORAGE_KEY.LOGGED_USER);
    }
  };
})

.factory('Users', function() {
  var key = 'users';
  return {
    all: function() {
      return window.dataStore.get(key);
    },
    getById: function(userId) {
      return window.dataStore.getByField(key, 'id', userId);
    },
    getByUsername: function(username) {
      return window.dataStore.getByField(key, 'username', username);
    }
  };
})

.factory('Projects', function() {
  var key = 'projects';
  return {
    all: function() {
      return window.dataStore.get(key);
    },
    getByOrganizationId: function (organizationId) {
      var projects = this.all();
      var _projects = []
      var ii = 0;
      for (ii; ii < projects.length; ii++) {
        if (projects[ii].organization_id == organizationId) {
          _projects.push(projects[ii]);
        }
      }
      return _projects;
   },
    getById: function(projectId) {
      return window.dataStore.getByField(key, 'id', projectId);
    }
  };
})

.factory('ProjectSignups', function() {
  var key = 'project_signups';
  return {
    all: function() {
      return window.dataStore.get(key);
    },
    getByUserId: function(userId) {
      var signups = this.all();
      var ii = 0;
      var index = false;
      for (ii; ii < signups.length; ii++) {
        if (signups[ii].user_id == userId) {
          return signups[ii];
        }
      }
    },
    getByUserIdAndProjectId: function(userId, projectId) {
      var signups = this.all();
      var ii = 0;
      var index = false;
      for (ii; ii < signups.length; ii++) {
        if (signups[ii].user_id == userId &&
          signups[ii].project_id == projectId) {

          return signups[ii];
        }
      }
    },
    add: function(value) {
      var signups = this.all();
      var ii = 0;
      var index = false;
      for (ii; ii < signups.length; ii++) {
        if (signups[ii].user_id == value.user_id) {
          index = ii;
        }
      }
      if (index !== false) {
        signups.splice(index, 1);
      }
      signups.push(value);
      window.dataStore.put(key, signups);
    }
  };
});
