angular.module('app.services', ['ngResource'])

.service('LoginService', function($q, $http) {
  var accounts_path = 'http://localhost:3000/accounts/authenticate';

  return {
    loginUser: function(name, pw) {

      var deferred = $q.defer();
      var promise = deferred.promise;

      $http({
        method: 'POST',
        url: accounts_path,
        body: {
            username: name,
            password: pw
        }
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      }, function errorCallback(response) {
        deferred.reject();
      });

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

.factory('SharedData', function() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

})

.factory('Account', function ($resource) {
  return $resource('http://getkarma.herokuapp.com/accounts/:account',{account: "@username"}, {
    update: {
      method: 'PUT'
    }   
  })  
})

.factory('User', function ($resource) {
//  $resource.addHeader("Access-Control-Allow-Origin", "*");
  return $resource('http://getkarma.herokuapp.com/users/:user',{user: "@username"}, {
    update: {
      method: 'PUT'
    }
  })
})

.factory('Users', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var users = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
