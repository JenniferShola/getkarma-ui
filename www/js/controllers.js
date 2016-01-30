angular.module('app.controllers', ['ionic'])

.controller('mainCtrl', function($scope, $q, $ionicModal, LoginService, User, Account, $ionicPopup, $state, $stateParams, $http) {

  $ionicModal.fromTemplateUrl('templates/profile.html', function(modal) {
    $scope.userProfile = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-left'
  });

  /* Open and close functions for new interaction modules. */
  $scope.showProfile = function(user) {
    $scope.profileUser = user;
    $scope.userProfile.show();
  };

    $scope.closeProfile = function() {
    $scope.userProfile.hide();
  };


  /* Login Controller. */
  $scope.login = function() {

    if (typeof $scope.account === "undefined") {
      $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    } else {
      LoginService.loginUser($scope.account.username, $scope.account.password)
        .success(function(account) {
          $state.go('tabs.home');
        })
        .error(function(account) {
          $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        });
    }
  };

  /* Modal set ups. */
  $ionicModal.fromTemplateUrl('templates/add-connection.html', function(modal) {
    $scope.connectionModule = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $ionicModal.fromTemplateUrl('templates/add-interaction.html', function(modal) {
    $scope.interactionModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  /* Open and close functions for new interaction modules. */
  $scope.openAddInteractionModule = function() {
    $scope.interactionModal.show();
  };

  $scope.closeAddInteractionModule = function() {
    $scope.interactionModal.hide();
  };

  /* Open and close functions for new conenction modules. */
  $scope.openAddConnectionModule = function() {
    $scope.connectionModule.show();
  };

  $scope.closeAddConnectionModule = function() {
    $scope.connectionModule.hide();
  };

  $scope.back = function() {
    window.history.back();
  };

})








/*********************************************** Task Code. ***********************************************/

.controller('tasksCtrl', function($scope, $q, $ionicModal, $ionicPopup, $state, $stateParams, $http) {
  var tasks_path = 'http://localhost:3000/tasks/';
  var detailed_path = 'detailed/';
  var user_path = 'user/';
  var back_slash = '/';

  $scope.tasks = [];

  $scope.getTasks = function() {
    var custom_url = tasks_path + user_path + '567ef4d85d9c991537da3dc3' + back_slash + detailed_path;
    var deferred = $q.defer();

    console.log("Trying to get tasks. ");
    
    $http({
      method: 'GET',
      url: custom_url
    }).then(function successCallback(response) {
      deferred.resolve(response.data);
      console.log("Got a successful response! ");
    }, function errorCallback(response) {
      deferred.reject();
      console.log("Got an error. :((((((  ");
    });
    return deferred.promise;
  }

  $scope.task_refresh = function() {
    $scope.getTasks()
        .then(function (data) {
          $scope.tasks = data;
        })   
  }

  $scope.task_refresh();



  $scope.newTask = {};

  $scope.addTask = function() {
    console.log("Trying to add a task with a title: " + $scope.newTask.title);

    var action_constants = ["Email", "Tweet", "Text", "Call"];
    var at_constants = ["20 Minutes", "1 Day", "2 Days"];

    $http({
      method: 'POST',
      url: tasks_path,
      headers: {
        'to_user_id': $scope.newTask.to_user_id,
        'connection_id': $scope.newTask.connection_id,
        'title': $scope.newTask.title,
        'action': action_constants.indexOf($scope.newTask.action),
        'action_time': at_constants.indexOf($scope.newTask.action_time),
        'location': $scope.newTask.location,
        'notes': $scope.newTask.notes
      }
    }).then(function successCallback(response) {
      console.log("Got a successful response");
    }, function errorCallback(response) {
      console.log("Got an error. :-( ");
    });

    //$scope.taskModal.hide();
    $scope.newTask.to_user_id = null;
    $scope.newTask.connection_id = null;
    $scope.newTask.title = null;
    $scope.newTask.action = null;
    $scope.newTask.action_time = null;
    $scope.newTask.location = null;
    $scope.newTask.notes = null;

    $scope.task_refresh();
  };

})













/*********************************************** Interaction Code. ***********************************************/

.controller('interactionsCtrl', function($scope, $q, $ionicModal, $ionicPopup, $state, $stateParams, $http) {
  var interactions_path = 'http://localhost:3000/interactions/';
  var detailed_path = 'detailed/';
  var user_path = 'user/';
  var back_slash = '/';

  $scope.moments = [];
  $scope.interactions = [];

  $scope.getMoments = function() {
    var custom_url = interactions_path + user_path + '567ef4d85d9c991537da3dc3' + back_slash + detailed_path;
    var deferred = $q.defer();

    console.log("Trying to get moments. ");
    
    $http({
      method: 'GET',
      url: custom_url
    }).then(function successCallback(response) {
      deferred.resolve(response.data);
      console.log("Got a successful response! ");
    }, function errorCallback(response) {
      deferred.reject();
      console.log("Got an error. :((((((  ");
    });
    return deferred.promise;
  }

  $scope.getInteractions = function() {
    var deferred = $q.defer();

    console.log("Trying to get interactions. ");
    
    $http({
      method: 'GET',
      url: interactions_path,
    }).then(function successCallback(response) {
      deferred.resolve(response.data);
      //console.log("Got a successful response: " + JSON.stringify(response.data));
      console.log("Got a successful response! ");
    }, function errorCallback(response) {
      deferred.reject();
      console.log("Got an error. :((((((  ");
    });
    return deferred.promise;
  }

  $scope.printInteractions = function() {
    var printable = $scope.getInteractions();
    console.log(printable);
  }

  $scope.int_refresh = function() {
    $scope.getMoments()
        .then(function (data) {
          $scope.moments = data;
        })   
  }

  $scope.int_refresh();



  $scope.newInteraction = {};

  $scope.addInteraction = function() {
    var url_id = url_domain + interactions_path;
    console.log("Trying to add an interaction with a title: " + $scope.newInteraction.title);

    var action_constants = ["Email", "Tweet", "Text", "Call"];
    var at_constants = ["20 Minutes", "1 Day", "2 Days"];

    $http({
      method: 'POST',
      url: url_id,
      headers: {
        'to_user_id': $scope.newInteraction.to_user_id,
        'connection_id': $scope.newInteraction.connection_id,
        'title': $scope.newInteraction.title,
        'description': $scope.newInteraction.description,
        'action': action_constants.indexOf($scope.newInteraction.action),
        'action_time': at_constants.indexOf($scope.newInteraction.action_time),
        'tags': $scope.newInteraction.tags,
        'location': $scope.newInteraction.location,
        'notes': $scope.newInteraction.notes
      }
    }).then(function successCallback(response) {
      console.log("Got a successful response");
    }, function errorCallback(response) {
      console.log("Got an error. :-( ");
    });

    $scope.interactionModal.hide();
    $scope.newInteraction.to_user_id = null;
    $scope.newInteraction.connection_id = null;
    $scope.newInteraction.title = null;
    $scope.newInteraction.description = null;
    $scope.newInteraction.action = null;
    $scope.newInteraction.action_time = null;
    $scope.newInteraction.location = null;
    $scope.newInteraction.tags = null;
    $scope.newInteraction.notes = null;

    $scope.int_refresh();
  };

})













/*********************************************** Users Code. ***********************************************/

.controller('contactsCtrl', function($scope, $q, $ionicModal, LoginService, User, Account, $ionicPopup, $state, $stateParams, $http) {
  var url_domain = 'http://localhost:3000/';
  var users_path = 'users';
  var back_slash = '/';

  $scope.users = [];

  $scope.getUsers = function() {
    var url_id = url_domain + users_path;
    var deferred = $q.defer();

    console.log("Trying to get users. ");
    
    $http({
      method: 'GET',
      url: url_id
    }).then(function successCallback(response) {
      deferred.resolve(response.data);
      //console.log("Got a successful response: " + JSON.stringify(response.data));
      console.log("Got a successful response! ");
    }, function errorCallback(response) {
      deferred.reject();
      console.log("Got an error. :((((((  ");
    });
    return deferred.promise;
  };

  $scope.printUsers = function() {
    var printable = $scope.getUsers();
    console.log(printable);
  }

  $scope.refresh = function() {
    $scope.getUsers()
        .then(function (data) {
          $scope.users = data;
        })   
    }
    
  $scope.refresh();


  $scope.toBeDeletedUser = {};

  $scope.deleteUser = function() {
    var user = $scope.toBeDeletedUser.username;
    var url_id = url_domain + users_path + back_slash + user;

    console.log("Trying to delete " + user);
    
    $http({
      method: 'DELETE',
      url: url_id,
      headers: {
        'safedelete': $scope.toBeDeletedUser.safekey
      }
    }).then(function successCallback(response) {
      console.log("Got a successful response");
    }, function errorCallback(response) {
      console.log("Got an error. :-( ");
    });
    $scope.toBeDeletedUser.username = null;
    $scope.toBeDeletedUser.safekey = null;
  };


  $scope.newUser = {};

  $scope.addUser = function() {
    var url_id = url_domain + users_path;
    var strength_file = "";
    console.log("Trying to add a user with a name: " + $scope.newUser.newName);

    if ($scope.newUser.contact_type == "Gold") {
      strength_file = "../img/strength-green.png";
    } else if ($scope.newUser.contact_type == "Silver") {
      strength_file = "../img/strength-yellow.png";
    } else if ($scope.newUser.contact_type == "Bronze") {
      strength_file = "../img/strength-red.png";
    }
    

    $http({
      method: 'POST',
      url: url_id,
      headers: {
        'name': $scope.newUser.newName,
        'email': $scope.newUser.email,
        'username': $scope.newUser.username,
        'contact_type': strength_file,
        'phone_number': $scope.newUser.phone_number,
        'profession': $scope.newUser.profession,
        'location': $scope.newUser.location,
        'photo': $scope.newUser.photo
      }
    }).then(function successCallback(response) {
      console.log("Got a successful response");
    }, function errorCallback(response) {
      console.log("Got an error. :-( ");
    });

    $scope.connectionModule.hide();
    $scope.newUser.username = null;
    $scope.newUser.email = null;
    $scope.newUser.newName = null;
    $scope.newUser.contact_type = null;
    $scope.newUser.phone_number = null;
    $scope.newUser.profession = null;
    $scope.newUser.location = null;
    $scope.newUser.photo = null;

    $scope.refresh();
  };

  $scope.profileUser = {};

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
