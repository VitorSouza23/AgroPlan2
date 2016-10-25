angular.module('starter.controllers.planoDeMarketing', ['starter.services.planoDeMarketing'])

.controller('PlanoDeMarketingCtrl', function($scope, PlanoDeMarketing, Produto, $ionicModal, $ionicListDelegate, $ionicHistory){
  $scope.planoDeMarketing = PlanoDeMarketing.getPlanoDeMarketing();
  $scope.editar = PlanoDeMarketing.editar;

  $scope.addProduto = function(){
    if(!$scope.editar){
      $scope.planoDeMarketing.addProduto($scope.produto);
    }else{
      $scope.planoDeMarketing.editarProduto($scope.produto);
      $scope.editar = false;
      $ionicListDelegate.closeOptionButtons();
    }
    $scope.closeProdutos();
  }

  $scope.botaoRemoverProduto= function(produto){
    $scope.planoDeMarketing.removerProduto(produto);
  };

  $scope.botaoEditarProduto = function(produto){
    $scope.produto = produto;
    $scope.editar = true;
    $scope.openProdutos();
  };

  $scope.back = function(){
    $ionicHistory.goBack();
  };

  $ionicModal.fromTemplateUrl('menus/subitens/produtos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeProdutos = function() {
    $scope.modal.hide();
  };

  $scope.openProdutos= function() {
    $scope.modal.show();
    if(!$scope.editar){
      $scope.produto = Produto.novoProduto();
    }
  };

  $scope.mostrarReordem = function(){
    $scope.reordenar = !$scope.reordenar;
  }

  $scope.moverProduto = function(item, fromIndex, toIndex) {
    $scope.planoDeMarketing.produtos.splice(fromIndex, 1);
    $scope.planoDeMarketing.produtos.splice(toIndex, 0, item);
  };
})
