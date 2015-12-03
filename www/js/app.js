// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'app.controllers', 'app.services', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('welcome', {
    url: '/login',
    templateUrl: 'templates/welcome.html',
    controller: 'mainCtrl',
    data: {
      requiredLogin: false
    }
  })

  .state('sign-up', {
    url: '/sign-up',
    templateUrl: 'templates/sign-up.html',
    controller: 'mainCtrl',
    data: {
      requiredLogin: false
    }
  })

  .state('tabs', {
    url: '/tabs',
    abstract:true,
    templateUrl: 'templates/mainTabsController.html'
  })

  .state('tabs.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'mainCtrl'
      }
    }
  })

  .state('tabs.contacts', {
    url: '/contacts',
    views: {
      'tab2': {
        templateUrl: 'templates/contacts.html',
        controller: 'mainCtrl'
      }
    }
  })

  .state('tabs.moments', {
    url: '/moments',
    views: {
      'tab3': {
        templateUrl: 'templates/profile.html',
        controller: 'mainCtrl'
      }
    }
  })

  .state('tabs.trends', {
    url: '/trends',
    views: {
      'tab4': {
        templateUrl: 'templates/welcome.html'
      }
    }
  })

  .state('tabs.settings', {
    url: '/settings',
    views: {
      'tab5': {
        templateUrl: 'templates/welcome.html'
      }
    }
  })

  .state('add-interaction', {
    url: '/add/interaction',
    templateUrl: 'templates/add-interaction.html',
    data: {
      requiredLogin: false
    }
  })

  .state('add-connection', {
    url: '/add/connection',
    templateUrl: 'templates/add-connection.html',
    controller: 'mainCtrl',
    data: {
      requiredLogin: false
    }
  })



/*
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }})


    .state('welcome', {
      url: '/login',
      templateUrl: 'templates/welcome.html',
   //   controller: 'LoginCtrl',
      data: {
        requiredLogin: false
      }
    })

    .state('sign-up', {
      url: '/sign-up',
      templateUrl: 'templates/sign-up.html',
    //  controller: 'LoginCtrl',
      data: {
        requiredLogin: false
      }
    })

    .state('splash-home', {
      url: '/splash',
      templateUrl: 'templates/splash-home.html',
    //  controller: 'LoginCtrl',
      data: {
        requiredLogin: false
      }
    })

    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
   //   controller: 'LoginCtrl',
      data: {
        requiredLogin: false
      }
    })

    .state('add-interaction', {
      url: '/add/interaction',
      templateUrl: 'templates/add-interaction.html',
    //  controller: 'LoginCtrl',
      data: {
        requiredLogin: false
      }
    })

    .state('add-connection', {
      url: '/add/connection',
      templateUrl: 'templates/add-connection.html',
    // controller: 'LoginCtrl',
      data: {
        requiredLogin: false
      }
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile.html',
    // controller: 'LoginCtrl',
      data: {
        requiredLogin: false
      }
    })

    
*/

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
