angular.module('starter.controllers.analiseDeMercado', ['starter.services.analiseDeMercado'])

<<<<<<< HEAD
.controller('AnaliseDeMercadoCtrl', function($scope, AnaliseDeMercado, Concorrente, Fornecedor, $ionicModal, $ionicListDelegate, $ionicHistory, $ionicPopup, $timeout) {
=======
.controller('AnaliseDeMercadoCtrl', function($scope, AnaliseDeMercado, Concorrente, Fornecedor, $ionicModal, $ionicListDelegate, $ionicHistory){
>>>>>>> 404bee94a93b31a8408be9d9ae85e13ef839fe6a
  $scope.analiseDeMercado = AnaliseDeMercado.getAnaliseDeMercado();
  $scope.editar  = AnaliseDeMercado.editar;


  $scope.addConcorrente = function(){
    if(!$scope.editar){
      $scope.analiseDeMercado.addConcorrente($scope.concorrente);
    }else{
      $scope.analiseDeMercado.editarConcorrente($scope.concorrente);
      $scope.editar = false;
      $ionicListDelegate.closeOptionButtons();
    }
    $scope.closeConcorrentes();
  }

<<<<<<< HEAD
  $scope.showConfirm = function() {
  var confirmPopup = $ionicPopup.confirm({
    title: 'Análise de Mercado',
    template: 'É onde serão inseridos os dados coletados pelo usuário em relação do seu empreendimento com o mercado.',
    cancelText: 'Sair'
  })};


=======
>>>>>>> 404bee94a93b31a8408be9d9ae85e13ef839fe6a
  $scope.botaoRemoverConcorrente = function(concorrente){
    $scope.analiseDeMercado.removerConcorrente(concorrente);
  };

  $scope.botaoEditarConcorrente = function(concorrente){
    $scope.concorrente = concorrente;
    $scope.editar = true;
    $scope.openConcorrentes();
  };

  $ionicModal.fromTemplateUrl('menus/subitens/concorrentes.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeConcorrentes = function() {
    $scope.modal.hide();
  };

  $scope.openConcorrentes = function() {
    $scope.modal.show();
    if(!$scope.editar){
      $scope.concorrente = Concorrente.novoConcorrente();
    }

  };

  $scope.addFornecedor = function(){
    if(!$scope.editar){
      $scope.analiseDeMercado.addFornecedor($scope.fornecedor);
    }else{
      $scope.analiseDeMercado.editarFornecedor($scope.fornecedor);
      $scope.editar = false;
      $ionicListDelegate.closeOptionButtons();
    }
    $scope.closeFornecedores();
  }

  $scope.botaoRemoverFornecedor = function(fornecedor){
    $scope.analiseDeMercado.removerFornecedor(fornecedor);
  };

  $scope.botaoEditarFornecedor = function(fornecedor){
    $scope.fornecedor = fornecedor;
    $scope.editar = true;
    $scope.openFornecedores();
  };

  $ionicModal.fromTemplateUrl('menus/subitens/fornecedores.html', {
    scope: $scope
  }).then(function(modale) {
    $scope.modale = modale;
  });

  $scope.closeFornecedores = function() {
    $scope.modale.hide();
  };

  $scope.openFornecedores = function() {
    $scope.modale.show();
    if(!$scope.editar){
      $scope.fornecedor = Fornecedor.novoFornecedor();
    }

  };

  $scope.back = function(){
    $ionicHistory.goBack();
  };

  $scope.mostrarReordemConcorrente = function(){
    $scope.reordenarConcorrente = !$scope.reordenarConcorrente;
  }

  $scope.moverConcorrente = function(item, fromIndex, toIndex) {
    $scope.analiseDeMercado.concorrentes.splice(fromIndex, 1);
    $scope.analiseDeMercado.concorrentes.splice(toIndex, 0, item);
  };

  $scope.mostrarReordemFornecedor = function(){
    $scope.reordenarFornecedor = !$scope.reordenarFornecedor;
  }

  $scope.moverFornecedor = function(item, fromIndex, toIndex) {
    $scope.analiseDeMercado.fornecedores.splice(fromIndex, 1);
    $scope.analiseDeMercado.fornecedores.splice(toIndex, 0, item);
  };
});
