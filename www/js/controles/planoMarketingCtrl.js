angular.module('starter.controllers.planoDeMarketing', ['starter.services.planoDeMarketing'])

<<<<<<< HEAD
.controller('PlanoDeMarketingCtrl', function($scope, PlanoDeMarketing, Produto, $ionicModal, $ionicListDelegate, $ionicPopup, $timeout, $ionicHistory){
=======
.controller('PlanoDeMarketingCtrl', function($scope, PlanoDeMarketing, Produto, $ionicModal, $ionicListDelegate, $ionicHistory){
>>>>>>> 404bee94a93b31a8408be9d9ae85e13ef839fe6a
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

<<<<<<< HEAD

    $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Plano de Marketing',
      template: 'É onde o usuário informará todos os detalhes dos itens a serem cultivados e vendidos.',
      cancelText: 'Sair'
    })};

=======
>>>>>>> 404bee94a93b31a8408be9d9ae85e13ef839fe6a
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
