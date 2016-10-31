angular.module('starter.controllers.sumarioExecutivo', ['starter.services.sumarioExecutivo'])

<<<<<<< HEAD
.controller('SumarioExecutivoCtrl', function($scope, SumarioExecutivo, Socio, $ionicModal, $ionicPopup, $timeout, $ionicListDelegate, $ionicHistory){
=======
.controller('SumarioExecutivoCtrl', function($scope, SumarioExecutivo, Socio, $ionicModal, $ionicListDelegate, $ionicHistory){
>>>>>>> 404bee94a93b31a8408be9d9ae85e13ef839fe6a
  $scope.sumarioExecutivo = SumarioExecutivo.getSumarioExecutivo();
  $scope.cnpjOuCpf = SumarioExecutivo.getCnpjOuCpf();
  $scope.escolherCnpjOuCpf = SumarioExecutivo.escolherCnpjOuCpf();
  $scope.editar = SumarioExecutivo.editar;


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

<<<<<<< HEAD
    $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Sumário Executivo',
      template: 'É o resumo do Plano de Negócios, onde será descrito os pontos mais importantes do negócio.',
      cancelText: 'Sair'
    })};

=======
>>>>>>> 404bee94a93b31a8408be9d9ae85e13ef839fe6a
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
