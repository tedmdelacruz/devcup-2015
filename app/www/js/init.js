// Dummy data
var APP_NAME = 'AppName';

var USER_TYPE = {
  VOLUNTEER: 1,
  ORGANIZATION: 2
};

var users = [
  {
    username: 'Ted',
    password: 'test123',
    user_type: USER_TYPE.VOLUNTEER
  },
  {
    username: 'WebGeek',
    password: 'test123',
    user_type: USER_TYPE.ORGANIZATION
  }
];

window.localStorage[APP_NAME]['users'] = JSON.stringify(users);

// Use this instead of localStorage in the app
window.dataStore = {
  put: function(key, value) {
    window.localStorage[APP_NAME][key] = value;
  },
  get: function(key) {
    return window.localStorage[APP_NAME][key];
  }
}
