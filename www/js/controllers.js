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

.controller('SumarioExecutivoCtrl', function($scope, SumarioExecutivo){
  $scope.sumarioExecutivo = SumarioExecutivo
   ;
})

;
