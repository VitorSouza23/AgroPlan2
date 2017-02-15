angular.module('starter.controllers.planoDeNegocio', ['starter.services', 'starter.services.plano-de-negocios'])

.controller('PlanoDeNegocioCtrl', function($scope, $state, $rootScope, ServicoPlanoDeNegocio, Modal) {
  $scope.usuario = $rootScope.usuario;
  $scope.planoDeNegocio;
  Modal.init('js/components/plano-de-negocio/subitens/criar-novo-plano.html', $scope).then(function(modal){
    $scope.modalNovoPlanoDeNegocio = modal;
  });

  $scope.novoPlanoDeNegocio = function(){
    $scope.planoDeNegocio = ServicoPlanoDeNegocio.novoPlanoDeNegocio();
    $scope.modalNovoPlanoDeNegocio.show();
  }
  $scope.criarNovoPlano = function(){
    $scope.modalNovoPlanoDeNegocio.hide();
    console.log($scope.planoDeNegocio);
    $scope.usuario.planosDeNegocio.push($scope.planoDeNegocio);
    $rootScope.usuario = $scope.usuario;
    $state.go('tab.sumarioExecutivo');
  }
  $scope.editarPlano = function(planoDeNegocio){

  }

});
