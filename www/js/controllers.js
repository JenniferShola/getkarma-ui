angular.module('app.controllers', ['ionic'])

.controller('mainCtrl', function($scope, $q, $ionicModal, LoginService, User, Account, $ionicPopup, $state, $stateParams, $http) {
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
      console.log("Got a successful response: " + JSON.stringify(response.data));
    }, function errorCallback(response) {
      deferred.reject();
      console.log("Got an error. :((((((  ");
    });
    return deferred.promise;
  };


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


  /* Login Controller. */
  $scope.login = function() {

    if (typeof $scope.account === "undefined") {
      console.log("Account params are undefined.");
      //trigger pop up
    } else {
      console.log("Account: " + $scope.account + " LOGIN user: " + $scope.account.username + " - PW: " + $scope.account.password);
      LoginService.loginUser($scope.account.username, $scope.account.password).success(function(account) {
        $state.go('tabs.home');
      }).error(function(account) {
        var alertPopup = $ionicPopup.alert({
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

.controller('DashCtrl', function($scope) {})

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
