// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom'); //posição das abas
  $ionicConfigProvider.tabs.style('standard'); //permite que eu edite a cor no scss
})

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

  .state('tab.analiseMercado', {
    url: '/analiseMercado',
    views: {
      'tab-analiseMercado': {
        templateUrl: 'menus/analiseMercado.html',
        controller: 'AnaliseDeMercadoCtrl'
      }
    }
  })

  .state('tab.fornecedores', {
    url: '/analiseMercado/fornecedores',
    views: {
      'tab-analiseMercado': {
        templateUrl: 'menus/subitens/fornecedores.html',
        controller: 'AnaliseDeMercadoCtrl'
      }
    }
  })

  .state('tab.concorrentes', {
    url: '/analiseMercado/concorrentes',
    views: {
      'tab-analiseMercado': {
        templateUrl: 'menus/subitens/concorrentes.html',
        controller: 'AnaliseDeMercadoCtrl'
      }
    }
  })

  .state('tab.sumarioExecutivo', {
    url: '/sumarioExecutivo',
    views: {
      'tab-sumarioExecutivo': {
        templateUrl: 'menus/sumarioExecutivo.html',
        controller: 'SumarioExecutivoCtrl'
      }
    }
  })

  .state('tab.socios', {
    url: '/sumarioExecutivo/socios',
    views: {
      'tab-sumarioExecutivo': {
        templateUrl: 'menus/subitens/socios.html',
        controller: 'SumarioExecutivoCtrl'
      }
    }
  })

  .state('tab.planoMarketing', {
    url: '/planoMarketing',
    views: {
      'tab-planoMarketing': {
        templateUrl: 'menus/planoMarketing.html',
        controller: 'PlanoDeMarketingCtrl'
      }
    }
  })

  .state('tab.produtos', {
    url: '/planoMarketing/produtos',
    views: {
      'tab-planoMarketing': {
        templateUrl: 'menus/subitens/produtos.html',
        controller: 'PlanoDeMarketingCtrl'
      }
    }
  })

  .state('tab.planoOperacional', {
    url: '/planoOperacional',
    views: {
      'tab-planoOperacional': {
        templateUrl: 'menus/planoOperacional.html',
        controller: 'PlanoOperacionalCtrl'
      }
    }
  })

  .state('tab.cargos', {
    url: '/planoOperacional/cargos',
    views: {
      'tab-planoOperacional': {
        templateUrl: 'menus/subitens/cargos.html',
        controller: 'PlanoOperacionalCtrl'
      }
    }
  })

  .state('tab.planoFinanceiro', {
    url: '/planoFinanceiro',
    views: {
      'tab-planoFinanceiro': {
        templateUrl: 'menus/planoFinanceiro.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.construcaoCenarios', {
    url: '/construcaoCenarios',
    views: {
      'tab-construcaoCenarios': {
        templateUrl: 'menus/construcaoCenarios.html',
        controller: 'DashCtrl'
      }
    }
  })


  .state('tab.avaliacaoEstrategica', {
    url: '/avaliacaoEstrategica',
    views: {
      'tab-avaliacaoEstrategica': {
        templateUrl: 'menus/avaliacaoEstrategica.html',
        controller: 'AvaliacaoEstrategicaCtrl'
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
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
