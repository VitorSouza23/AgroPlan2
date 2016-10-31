angular.module('starter.controllers.sumarioExecutivo', ['starter.services.sumarioExecutivo'])

.controller('SumarioExecutivoCtrl', function($scope, SumarioExecutivo, Socio, $ionicModal, $ionicListDelegate, $ionicHistory, $ionicPopup, $timeout){
  $scope.sumarioExecutivo = SumarioExecutivo.getSumarioExecutivo();
  $scope.cnpjOuCpf = SumarioExecutivo.getCnpjOuCpf();
  $scope.escolherCnpjOuCpf = SumarioExecutivo.escolherCnpjOuCpf();
  $scope.editar = SumarioExecutivo.editar;

  $scope.showConfirm = function() {
  var confirmPopup = $ionicPopup.confirm({
    title: 'Sumário Executivo',
    template: 'É o resumo do Plano de Negócios, onde será descrito os pontos mais importantes do negócio.',
    cancelText: 'Sair'
  })};


  $scope.socio = Socio.getSocio();

  $scope.botaoAdicionarSocio = function(socio){
    if(!this.editar){
      $scope.sumarioExecutivo.adicionarSocio($scope.socio);
      $ionicListDelegate.closeOptionButtons();
    }else{
      $scope.sumarioExecutivo.editarSocio($scope.socio);
      $scope.editar = false;
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

});
