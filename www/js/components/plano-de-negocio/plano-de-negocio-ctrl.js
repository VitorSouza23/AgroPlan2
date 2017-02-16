angular.module('starter.controllers.planoDeNegocio', ['starter.services', 'starter.services.plano-de-negocios'])

.controller('PlanoDeNegocioCtrl', function($scope, $state, $rootScope, ServicoPlanoDeNegocio, Modal, BancoDeDados) {
  $scope.usuario = $rootScope.usuario;
  $scope.planoDeNegocio;
  $scope.planosDeNegocio = [];
  Modal.init('js/components/plano-de-negocio/subitens/criar-novo-plano.html', $scope).then(function(modal){
    $scope.modalNovoPlanoDeNegocio = modal;
  });
  Modal.init('js/components/plano-de-negocio/subitens/menu-de-opcoes.html', $scope).then(function(modal){
    $scope.modalMenuPlanoDeNegocio = modal;
  });
  $scope.novoPlanoDeNegocio = function(){
    $scope.planoDeNegocio = ServicoPlanoDeNegocio.novoPlanoDeNegocio();
    $scope.modalNovoPlanoDeNegocio.show();
  }
  $scope.criarNovoPlano = function(){
    $scope.modalNovoPlanoDeNegocio.hide();
    console.log($scope.planoDeNegocio);
    $scope.planoDeNegocio.desativado = false;
    $scope.planoDeNegocio = ServicoPlanoDeNegocio.salvarPlanoDeNegocio($scope.planoDeNegocio);
    $rootScope.planoDeNegocioID = $scope.planoDeNegocio;
    $scope.planosDeNegocio.push($scope.planoDeNegocio);
    $state.go('tab.sumarioExecutivo');
  }
  $scope.editarPlano = function(planoDeNegocio){
    $rootScope.planoDeNegocioID = planoDeNegocio;
    console.log($rootScope.planoDeNegocioID);
    $scope.fecharMenuDeOpcoesDoPlano();
    $state.go('tab.sumarioExecutivo');
  }

  $scope.abrirMenuDeOpcoesDoPlano = function(planoDeNegocio){
    $scope.planoDeNegocio = planoDeNegocio;
    $scope.modalMenuPlanoDeNegocio.show();
  }

  $scope.fecharMenuDeOpcoesDoPlano = function(){
    $scope.modalMenuPlanoDeNegocio.hide();
  }

  $scope.recuperTodosOsPlanosPorIdUsuario = function(){
    caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoDeNegocio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
    BancoDeDados.recuperarComIdUsuario(caminho, $rootScope.usuario).then(function(dados){
      console.log(dados.data);
      $scope.planosDeNegocio = dados.data;
    });
  }
});
