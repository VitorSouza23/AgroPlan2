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
  .state('login', {
      url: '/login',
      templateUrl: 'js/components/tela-de-login/tela-de-login.html',
      controller: 'LoginCtrl'
  })

  .state('sobreProjeto', {
      url: '/sobreProjeto',
      templateUrl: 'js/components/projeto-sobre/projeto-sobre.html',
      controller: 'SobreProjetoCtrl'
  })

  .state('login.cadastro', {
      url: '/login/cadastro',
      templateUrl: 'js/components/tela-de-login/subitens/cadastro.html',
      controller: 'CadastroCtrl'
  })

  .state('planoDeNegocio', {
      url: '/planoDeNegocio',
      templateUrl: 'js/components/plano-de-negocio/plano-de-negocio.html',
      controller: 'PlanoDeNegocioCtrl'
  })

  .state('planoDeNegocio.novoPlano', {
      url: '/planoDeNegocio/novoPlanoDeNegocio',
      templateUrl: 'js/components/plano-de-negocio/subitens/criar-novo-plano.html',
      controller: 'PlanoDeNegocioCtrl'
  })
  .state('planoDeNegocio.menuPlano', {
      url: '/planoDeNegocio/menuPlanoDeNegocio',
      templateUrl: 'js/components/plano-de-negocio/subitens/menu-de-opcoes.html',
      controller: 'PlanoDeNegocioCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.analiseMercado', {
    url: '/analiseMercado',

    views: {
      'tab-analiseMercado': {
        templateUrl: 'js/components/analise-de-mercado/analise-de-mercado.html',
        controller: 'AnaliseDeMercadoCtrl'
      }
    }
  })

  .state('tab.fornecedores', {
    url: '/analiseMercado/fornecedores',

    views: {
      'tab-analiseMercado': {
        templateUrl: 'js/components/analise-de-mercado/subitens/fornecedores.html',
        controller: 'AnaliseDeMercadoCtrl'
      }
    }
  })

  .state('tab.concorrentes', {
    url: '/analiseMercado/concorrentes',

    views: {
      'tab-analiseMercado': {
        templateUrl: 'js/components/analise-de-mercado/subitens/concorrentes.html',
        controller: 'AnaliseDeMercadoCtrl'
      }
    }
  })

  .state('tab.sumarioExecutivo', {
    url: '/sumarioExecutivo',

    views: {
      'tab-sumarioExecutivo': {
        templateUrl: 'js/components/sumario-executivo/sumario-executivo.html',
        controller: 'SumarioExecutivoCtrl'
      }
    }
  })

  .state('tab.socios', {
    url: '/sumarioExecutivo/socios',

    views: {
      'tab-sumarioExecutivo-socios': {
        templateUrl: 'js/components/sumario-executivo/subitnes/socios.html',
        controller: 'SumarioExecutivoCtrl'
      }
    }
  })

  .state('tab.planoMarketing', {
    url: '/planoMarketing',

    views: {
      'tab-planoMarketing': {
        templateUrl: 'js/components/plano-de-marketing/plano-de-marketing.html',
        controller: 'PlanoDeMarketingCtrl'
      }
    }
  })

  .state('tab.produtos', {
    url: '/planoMarketing/produtos',

    views: {
      'tab-planoMarketing-produtos': {
        templateUrl: 'js/components/plano-de-marketing/subitens/produtos.html',
        controller: 'PlanoDeMarketingCtrl'
      }
    }
  })

  .state('tab.planoOperacional', {
    url: '/planoOperacional',

    views: {
      'tab-planoOperacional': {
        templateUrl: 'js/components/plano-operacional/plano-operacional.html',
        controller: 'PlanoOperacionalCtrl'
      }
    }
  })

  .state('tab.cargos', {
    url: '/planoOperacional/cargos',

    views: {
      'tab-planoOperacional-cargos': {
        templateUrl: 'js/components/plano-operacional/subitens/cargos.html',
        controller: 'PlanoOperacionalCtrl'
      }
    }
  })

  .state('tab.planoFinanceiro', {
    url: '/planoFinanceiro',

    views: {
      'tab-planoFinanceiro': {
        templateUrl: 'js/components/plano-financeiro/plano-financeiro.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.maquina', {
    url: '/planoFinanceiro/maquinas',

    views: {
      'tab-planoFinanceiro-maquinas': {
        templateUrl: 'js/components/plano-financeiro/subitens/maquinas.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.movel', {
    url: '/planoFinanceiro/moveis',

    views: {
      'tab-planoFinanceiro-moveis': {
        templateUrl: 'js/components/plano-financeiro/subitens/moveis.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.utensilio', {
    url: '/planoFinanceiro/utensilios',

    views: {
      'tab-planoFinanceiro-utensilios': {
        templateUrl: 'js/components/plano-financeiro/subitens/utensilios.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.veiculo', {
    url: '/planoFinanceiro/veiculos',

    views: {
      'tab-planoFinanceiro-veiculo': {
        templateUrl: 'js/components/plano-financeiro/subitens/veiculos.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.compra', {
    url: '/planoFinanceiro/compras',

    views: {
      'tab-planoFinanceiro-compras': {
        templateUrl: 'js/components/plano-financeiro/subitens/compras.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.venda', {
    url: '/planoFinanceiro/vendas',

    views: {
      'tab-planoFinanceiro-vendas': {
        templateUrl: 'js/components/plano-financeiro/subitens/vendas.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.equipamento', {
    url: '/planoFinanceiro/equipamentos',

    views: {
      'tab-planoFinanceiro-equipamentos': {
        templateUrl: 'js/components/plano-financeiro/subitens/equipamentos.html',
        controller: 'PlanoFinanceiroCtrl'
      }
    }
  })

  .state('tab.construcaoCenarios', {
    url: '/construcaoCenarios',

    views: {
      'tab-construcaoCenarios': {
        templateUrl: 'js/components/contrucao-de-cenarios/construcao-de-cenarios.html',
        controller: 'CosntrucaoDeCenarioCtrl'
      }
    }
  })


  .state('tab.avaliacaoEstrategica', {
    url: '/avaliacaoEstrategica',

    views: {
      'tab-avaliacaoEstrategica': {
        templateUrl: 'js/components/avaliacao-estrategica/avaliacao-estrategica.html',
        controller: 'AvaliacaoEstrategicaCtrl'
      }
    }
  })

  .state('tab.roteiroInformacao', {
    url: '/roteiroInformacao',

    views: {
      'tab-roteiroInformacao': {
        templateUrl: 'js/components/roteiro-de-informacao/roteiro-de-informacao.html',
        controller: 'RoteiroParaColetaCtrl'
      }
    }
  })

  .state('tab.avaliacaoDoPlano', {
    url: '/avaliacaoDoPlano',

    views: {
      'tab-avaliacaoDoPlano': {
        templateUrl: 'js/components/avaliaca-do-plano/avaliacao-do-plano.html',
        controller: 'AvaliacaoDoPlanoCtrl'
      }
    }
  })


// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/login');

});
