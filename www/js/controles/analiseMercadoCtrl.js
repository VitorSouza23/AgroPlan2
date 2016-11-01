angular.module('starter.controllers.analiseDeMercado', ['starter.services.analiseDeMercado'])

.controller('AnaliseDeMercadoCtrl', function($scope, AnaliseDeMercado, Concorrente, Fornecedor, $ionicModal, $ionicListDelegate, $ionicHistory,$ionicPopup, $timeout, $http){
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

  $scope.showConfirm = function() {
 var confirmPopup = $ionicPopup.confirm({
   title: 'Análise de Mercado',
   template: 'É onde serão inseridos os dados coletados pelo usuário em relação do seu empreendimento com o mercado.',
   cancelText: 'Sair'
 })};


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

  $scope.salvar = function(){
    var json;
    var indice;
    for(indice = 0; indice < $scope.analiseDeMercado.fornecedores.length; indice++){
      json = angular.toJson($scope.analiseDeMercado.fornecedores[indice]);
      $http.post('https://api.mlab.com/api/1/databases/agroplan/collections/fornecedores?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', json).success(function(dados){
        $scope.analiseDeMercado.fornecedores[indice] = dados;
      });
    }

    for(indice = 0; indice < $scope.analiseDeMercado.concorrentes.length; indice++){
      json = angular.toJson($scope.analiseDeMercado.concorrentes[indice]);
      $http.post('https://api.mlab.com/api/1/databases/agroplan/collections/concorrente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', json).success(function(dados){
        $scope.analiseDeMercado.concorrentes[indice] = dados;
      });
    }

    json = angular.toJson($scope.analiseDeMercado.cliente);
    $http.post('https://api.mlab.com/api/1/databases/agroplan/collections/cliente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', json).success(function(dados){
      $scope.analiseDeMercado.cliente = dados;
    });

    var analiseDeMercado = $scope.analiseDeMercado;
    for(indice = 0; indice < $scope.analiseDeMercado.fornecedores.length; indice++){
      analiseDeMercado.fornecedores[indice] = $scope.analiseDeMercado.fornecedores[indice]._id;
    }
    for(indice = 0; indice < $scope.analiseDeMercado.concorrentes.length; indice++){
      analiseDeMercado.concorrentes[indice] = $scope.analiseDeMercado.concorrentes[indice]._id;
    }

    analiseDeMercado.cliente = $scope.analiseDeMercado.cliente._id;
    json = angular.toJson(analiseDeMercado);
    localStorage.setItem("analiseDeMercado", json);
    $http.post('https://api.mlab.com/api/1/databases/agroplan/collections/analiseMercado?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', json).success(function(dados){
      $scope.analiseDeMercado = dados;
    });
  }
});
