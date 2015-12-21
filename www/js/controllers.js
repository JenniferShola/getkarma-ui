angular.module('app.controllers', ['ionic'])

.controller('mainCtrl', function($scope, $ionicModal, LoginService, User, Account, $ionicPopup, $state, $stateParams, $http) {
  var url_domain = 'http://localhost:3000/';

  /* Users API. */
  $scope.users = User.query();

  $scope.deleteUser = function() {
  	console.log("Trying to delete");
  	var url_id = url_domain +'users/test11';
  	$http({
	  method: 'DELETE',
	  url: 'http://localhost:3000/users/test11',
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



/*
    if (popupService.showPopup('Really delete this?')) {
      user.$delete(function() {
        $window.location.href = ''; //redirect to home
      });
    }
*/

  };

  /*

  $scope.user = User.get({ iuser: $stateParams.username });

  $scope.addUser = function() { //create a new movie. Issues a POST to /api/movies
  	$http({
	  method: 'POST',
	  url: url_domain;
	}).then(function successCallback(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });

    $scope.user = new User();
    $scope.user.$save(function() {
      $state.go('tabs.home'); // on success go back to home i.e. movies state.
    });
  };

  $scope.updateUser = function() { //Update the edited movie. Issues a PUT to /api/movies/:id
    $scope.user.$update(function() {
      $state.go('tabs.home'); // on success go back to home i.e. movies state.
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
