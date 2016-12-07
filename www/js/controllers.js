angular.module('starter.controllers', ['starter.services','starter.controllers.sumarioExecutivo','starter.controllers.analiseDeMercado', 'starter.controllers.planoFinanceiro', 'starter.controllers.planoDeMarketing', 'starter.controllers.planoOperacional', 'starter.controllers.construcaoDeCenario', 'starter.controllers.avaliacaoEstrategica','starter.controllers.roteiroParaColeta', 'starter.controllers.avaliacaoDoPlano'])


.controller('MenuCtrl', function($scope, Menu) {
  $scope.menu = Menu;
})

.controller('LoginCtrl', function($scope, ServicoLogin, $ionicPopup, $state) {
$scope.usuario = {};

  $scope.init = function(){
    $scope.usuario = {};
  }

  $scope.login = function(){
    ServicoLogin.fazerLogin($scope.usuario.cpf, $scope.usuario.senha).success(function(data) {
           $state.go('tab.sumarioExecutivo');
       }).error(function(data) {
           var alertPopup = $ionicPopup.alert({
               title: 'Falha no Login!',
               template: 'Por favor, corrija os campos incorretos!'
           });
       });
  }
})


.controller('CadastroCtrl', function($scope, Modal, ServicoLogin, $ionicHistory) {
  Modal.init('templates/cadastro.html', $scope).then(function(modal){
    $scope.modalCadastro = modal;
    console.log(modalCadastro);
  });

  $scope.abrirTela = function() {
    $scope.modalCadastro.show();
  };


})
