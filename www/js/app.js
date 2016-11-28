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
  $ionicConfigProvider.views.maxCache(0);
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
      'tab-sumarioExecutivo-socios': {
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
      'tab-planoMarketing-produtos': {
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
      'tab-planoOperacional-cargos': {
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
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.maquina', {
    url: '/planoFinanceiro/maquinas',

    views: {
      'tab-planoFinanceiro-maquinas': {
        templateUrl: 'menus/subitens/maquinas.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.movel', {
    url: '/planoFinanceiro/moveis',

    views: {
      'tab-planoFinanceiro-moveis': {
        templateUrl: 'menus/subitens/moveis.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.utensilio', {
    url: '/planoFinanceiro/utensilios',

    views: {
      'tab-planoFinanceiro-utensilios': {
        templateUrl: 'menus/subitens/utensilios.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.veiculo', {
    url: '/planoFinanceiro/veiculos',

    views: {
      'tab-planoFinanceiro-veiculo': {
        templateUrl: 'menus/subitens/veiculos.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.compra', {
    url: '/planoFinanceiro/compras',

    views: {
      'tab-planoFinanceiro-compras': {
        templateUrl: 'menus/subitens/compras.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.venda', {
    url: '/planoFinanceiro/vendas',

    views: {
      'tab-planoFinanceiro-vendas': {
        templateUrl: 'menus/subitens/vendas.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.equipamento', {
    url: '/planoFinanceiro/equipamentos',

    views: {
      'tab-planoFinanceiro-equipamentos': {
        templateUrl: 'menus/subitens/equipamentos.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.construcaoCenarios', {
    url: '/construcaoCenarios',

    views: {
      'tab-construcaoCenarios': {
        templateUrl: 'menus/construcaoCenarios.html',
        controller: 'CosntrucaoDeCenarioCtrl'
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

  .state('tab.roteiroInformacao', {
    url: '/roteiroInformacao',

    views: {
      'tab-roteiroInformacao': {
        templateUrl: 'menus/roteiroInformacao.html',
        controller: 'RoteiroParaColetaCtrl'
      }
    }
  })

  .state('tab.avaliacaoDoPlano', {
    url: '/avaliacaoDoPlano',

    views: {
      'tab-avaliacaoDoPlano': {
        templateUrl: 'menus/avaliacaoPlano.html',
        controller: 'AvaliacaoDoPlanoCtrl'
      }
    }
  })

  .state('menu', {
      url: "/menu",
      templateUrl: "menus/armazenamento/menuAbstract.html",

    })

  .state('menu.menuArmazenamento', {
    url: '/menuArmazenamento',

    views: {
      'menu-menuArmazenamento': {
        templateUrl: 'menus/armazenamento/menuArmazenamento.html',
        controller: 'MenuArmazenamentoCtrl'
      }
    }
  })

  .state('menu.menuArmazenamento.sumarioExecutivo', {
    url: '/menuArmazenamento/0',

    views: {
      'menu-menuArmazenamento': {
        templateUrl: 'menus/armazenamento/armazenamentoSumarioExecutivo.html',
        controller: 'MenuArmazenamentoCtrl'
      }
    }
  })

  .state('menu.menuArmazenamento.analiseDeMercado', {
    url: '/menuArmazenamento/1',

    views: {
      'menu-menuArmazenamento': {
        templateUrl: 'menus/armazenamento/armazenamentoAnaliseDeMercado.html',
        controller: 'MenuArmazenamentoCtrl'
      }
    }
  })

  .state('menu.menuArmazenamento.planoDeMarketing', {
    url: '/menuArmazenamento/2',

    views: {
      'menu-menuArmazenamento': {
        templateUrl: 'menus/armazenamento/armazenamentoPlanoDeMarketing.html',
        controller: 'MenuArmazenamentoCtrl'
      }
    }
  })

  .state('menu.menuArmazenamento.planoOperacional', {
    url: '/menuArmazenamento/3',

    views: {
      'menu-menuArmazenamento': {
        templateUrl: 'menus/armazenamento/armazenamentoPlanoOperacional.html',
        controller: 'MenuArmazenamentoCtrl'
      }
    }
  })

  .state('menu.menuArmazenamento.planoFinanceiro', {
    url: '/menuArmazenamento/4',

    views: {
      'menu-menuArmazenamento': {
        templateUrl: 'menus/armazenamento/armazenamentoPlanoFinanceiro.html',
        controller: 'MenuArmazenamentoCtrl'
      }
    }
  })


// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/tab/sumarioExecutivo');

});
