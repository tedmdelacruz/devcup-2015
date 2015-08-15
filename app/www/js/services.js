angular.module('app.services', [])

.factory('Users', function() {
  return {
    all: function() {
      return window.dataStore.get('users');
    },
    getById: function(userId) {
      return window.dataStore.getByField('users', 'id', userId);
    },
    getByUsername: function(username) {
      return window.dataStore.getByField('users', 'username', username);
    }
  };
})

.factory('Projects', function() {
  return {
    all: function() {
      return window.dataStore.get('projects');
    },
    getById: function(projectId) {
      return window.dataStore.getByField('projects', 'id', projectId);
    }
  };
});
