// Use this instead of localStorage in the app
window.dataStore = {
  put: function(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    window.localStorage[APP_NAME + '_' + key] = value;
  },
  get: function(key) {
    return JSON.parse(window.localStorage[APP_NAME + '_' + key]);
  },
  getByField: function(key, field, query) {
    var values = JSON.parse(window.localStorage[APP_NAME + '_' + key]);
    var ii = 0
    for (ii; ii < values.length; ii++) {
      if (values[ii][field] == query) {
        return values[ii];
      }
    }
    return null;
  }
}

// Dummy data
var APP_NAME = 'Bayani';
var APP_DESC = 'Fulfill your calling now.';

var USER_TYPE = {
  VOLUNTEER: 1,
  ORGANIZATION: 2
};

var STORAGE_KEY = {
  LOGGED_USER: 'logged_user'
}

var users = [
  {
    id: 1,
    username: 'tedmdelacruz',
    password: 'test123',
    user_type: USER_TYPE.VOLUNTEER
  },
  {
    id: 2,
    username: 'webgeek',
    password: 'test123',
    user_type: USER_TYPE.ORGANIZATION
  }
]

var JOB = {
  CLERICAL: {
    id: 1,
    name: 'Clerical',
    desc: 'Clerical work, involves handling of paperwork'
  },
  LOGISTICS: {
    id: 2,
    name: 'Logistics',
    desc: 'Involves driving and delivery of goods'
  },
  MEDICAL: {
    id: 3,
    name: 'Medical',
    desc: 'Requires medical certification'
  },
  MANUAL_MANPOWER: {
    id: 4,
    name: 'Manual Manpower',
    desc: 'Physical work involving carrying and sorting of materials'
  },
};

var jobs = [
  JOB.CLERICAL,
  JOB.LOGISTICS,
  JOB.MEDICAL,
  JOB.MANUAL_MANPOWER
];

var ORGANIZATION = {
  WEBGEEK: {
    id: 1,
    name: 'WebGeek'
  },
  RED_CROSS: {
    id: 1,
    name: 'RedCross'
  }
}

var organizations = [
  ORGANIZATION.WEBGEEK,
  ORGANIZATION.RED_CROSS
];

var projects = [
  {
    id: 1,
    title: 'WebGeek DevCup',
    organizer: ORGANIZATION.WEBGEEK,
    img: 'tech01.jpg',
    jobs: [
      JOB.MANUAL_MANPOWER,
    ]
  },
  {
    id: 2,
    title: 'Red Cross Yolanda Rehabilitation',
    organizer: ORGANIZATION.RED_CROSS,
    img: 'medical01.jpg',
    jobs: [
      JOB.CLERICAL,
      JOB.LOGISTICS,
      JOB.MEDICAL,
      JOB.MANUAL_MANPOWER,
    ]
  }
];

window.dataStore.put('users', users);
window.dataStore.put('jobs', jobs);
window.dataStore.put('organizations', organizations);
window.dataStore.put('projects', projects);
