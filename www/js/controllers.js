angular.module('starter.controllers', ['starter.services'])


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
})

.controller('AvaliacaoEstrategicaCtrl', function($scope, AvaliacaoEstrategica){
  $scope.avaliacaoEstrategica = AvaliacaoEstrategica;
})

.controller('AnaliseDeMercadoCtrl', function($scope, AnaliseDeMercado){
  $scope.analiseDeMercado = AnaliseDeMercado;
})

.controller('AvaliacaoDoPlanoCtrl', function($scope, AvaliacaoDoPlano){
  $scope.avaliacaoDoPlano = AvaliacaoDoPlano;
})

.controller('CosntrucaoDeCenarioCtrl', function($scope, ConstrucaoDeCenario){
  $scope.construcaoDeCenario = ConstrucaoDeCenario;
})

.controller('PlanoFinanceiroCtrl', function($scope, PlanoFinanceiro){
  $scope.planoFinanceiro = PlanoFinanceiro;
})
.controller('PlanoDeMarketingCtrl', function($scope, PlanoDeMarketing){
  $scope.planoDeMarketing = PlanoDeMarketing;
})

.controller('PlanoOperacionalCtrl', function($scope, PlanoOperacional){
  $scope.planoOperacional = PlanoOperacional;
})

.controller('RoteiroParaColetaCtrl', function($scope, RoteiroParaColeta){
  $scope.roteiroParaColeta = RoteiroParaColeta;
})

.controller('SumarioExecutivoCtrl', function($scope, SumarioExecutivo, Socio, $ionicModal, $ionicListDelegate, $ionicHistory){
  $scope.sumarioExecutivo = SumarioExecutivo.getSumarioExecutivo();
  $scope.cnpjOuCpf = SumarioExecutivo.getCnpjOuCpf();
  $scope.escolherCnpjOuCpf = SumarioExecutivo.escolherCnpjOuCpf();
  $scope.edutar = SumarioExecutivo.editar;
  $scope.socio = Socio.getSocio();

  $scope.botaoAdicionarSocio = function(){
    if(!$scope.editar){
      $scope.sumarioExecutivo.adicionarSocio($scope.socio);
    }else{
      $scope.sumarioExecutivo.editarSocio($scope.socio);
      $sope.editar = false;
      $ionicListDelegate.closeOptionButtons();
    }
    $scope.closeSocios();
  };

  $scope.botaoRemoverSocio = function(socio){
    $scope.sumarioExecutivo.removerSocio(socio);
  };

  $scope.botaoEditarSocio = function(socio){
    $scope.socio = socio;
    $scope.editar = true;
    $scope.openSocios();

  };

  $ionicModal.fromTemplateUrl('menus/subitens/socios.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeSocios = function() {
    $scope.modal.hide();
  };

  $scope.openSocios = function() {
    $scope.modal.show();
    if(!$scope.editar){
      $scope.socio = Socio.novoSocio();
    }
  };

  $scope.back = function(){
    $ionicHistory.goBack();
  };

  $scope.mostrarReordem = function(){
    $scope.reordenar = !$scope.reordenar;
  }

  $scope.moverSocio = function(item, fromIndex, toIndex) {
    $scope.sumarioExecutivo.socios.splice(fromIndex, 1);
    $scope.sumarioExecutivo.socios.splice(toIndex, 0, item);
  };



})

;
