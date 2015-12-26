angular.module('app.controllers', ['ionic'])

.controller('mainCtrl', function($scope, $ionicModal, LoginService, User, Account, $ionicPopup, $state, $stateParams, $http) {
  var url_domain = 'http://localhost:3000/';
  var users_path = 'users';
  var back_slash = '/';

  
  $scope.deleteUser = function(user) {
  	console.log("Trying to delete " + user);
  	var url_id = url_domain + users_path + back_slash + user;

  	$http({
  	  method: 'DELETE',
  	  url: url_id,
  	  headers: {
  	  	'safedelete': 'yes'
  	  }
  	}).then(function successCallback(response) {
  		console.log("Got a successful response");
  	    // this callback will be called asynchronously
  	    // when the response is available
  	}, function errorCallback(response) {
  		console.log(" :-( ");
  	    // called asynchronously if an error occurs
  	    // or server returns response with an error status.
  	});
  };


  $scope.newUser = {};

  $scope.addUser = function() {
    var url_id = url_domain + users_path;
    console.log("Trying to add a user with a name: " + $scope.newUser.newName);

    $http({
      method: 'POST',
      url: url_id,
      headers: {
        'username': $scope.newUser.username,
        'email': $scope.newUser.email
      }
    }).then(function successCallback(response) {
      console.log("Got a successful response");
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
      console.log(" :-( ");
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
  };


  /* Login Controller. */
  $scope.login = function() {
/*
    console.log("Params: " + $stateParams.username);
    $scope.account = Account.get({ username: $stateParams.username }); 
    console.log("Account: " + $scope.account + " LOGIN user: " + $scope.account.username + " - PW: " + $scope.account.password);
    if ($scope.account) {
      $state.go('tabs.home');
    } else {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    }
*/
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
