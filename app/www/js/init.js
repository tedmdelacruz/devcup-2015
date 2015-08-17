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
  },
  delete: function(key) {
    window.localStorage.removeItem(key);
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
};

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
    user_type: USER_TYPE.ORGANIZATION,
    organization_id: 1 // FIXME
  },
  {
    id: 3,
    username: 'redcross',
    password: 'test123',
    user_type: USER_TYPE.ORGANIZATION,
    organization_id: 2 // FIXME
  }
];

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
    name: 'WebGeek',
  },
  RED_CROSS: {
    id: 2,
    name: 'RedCross'
  },
  PYTHON_PH: {
    id: 3,
    name: 'PythonPH'
  }
}

var organizations = [
  ORGANIZATION.WEBGEEK,
  ORGANIZATION.RED_CROSS,
  ORGANIZATION.PYTHON_PH
];

var projects = [
  {
    id: 1,
    title: 'WebGeek DevCup',
    desc: "The most anticipated developer hackathon in Manila. An annual gathering of amazing developers, designers and technology enthusiasts, which aims to spotlight the local developer talent. An amazing opportunity to showcase your skills, learn from like-minded individuals and most of all have fun while making awesome stuff.",
    organizer: ORGANIZATION.WEBGEEK,
    organization_id: ORGANIZATION.WEBGEEK.id,
    img: 'tech02.jpg',
    jobs: [
      JOB.MANUAL_MANPOWER,
    ]
  },
  {
    id: 2,
    title: 'Red Cross Yolanda Rehabilitation',
    desc: "Red Cross needs volunteers to distribute goods for the victims of Typhoon Yolanda in Leyte.",
    organizer: ORGANIZATION.RED_CROSS,
    organization_id: ORGANIZATION.RED_CROSS.id,
    img: 'medical01.jpg',
    jobs: [
      JOB.CLERICAL,
      JOB.LOGISTICS,
      JOB.MEDICAL,
      JOB.MANUAL_MANPOWER,
    ]
  },
  {
    id: 3,
    title: 'PyCon 2015',
    desc: "PyCon Philippines is a volunteer-run, not-for-profit conference centered around the Python Programming language. " +
"The main goal of this conference is to provide a venue where the Python programming language and surrounding technologies can be explored, discussed and exercised." ,
    organizer: ORGANIZATION.PYTHON_PH,
    img: 'tech01.jpg',
    jobs: [
      JOB.LOGISTICS,
      JOB.MANUAL_MANPOWER,
    ]
  }
];

window.dataStore.put('users', users);
window.dataStore.put('jobs', jobs);
window.dataStore.put('organizations', organizations);
window.dataStore.put('projects', projects);
