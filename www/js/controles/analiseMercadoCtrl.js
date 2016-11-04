angular.module('starter.controllers.analiseDeMercado', ['starter.services.analiseDeMercado', 'starter.services'])

.controller('AnaliseDeMercadoCtrl', function($scope, AnaliseDeMercado, AnaliseDeMercadoID, BancoDeDados, Concorrente, Fornecedor, $ionicModal, $ionicListDelegate, $ionicHistory,$ionicPopup, $timeout, $http){
  $scope.analiseDeMercado = AnaliseDeMercado.getAnaliseDeMercado();
  $scope.editar  = AnaliseDeMercado.editar;
  $scope.bancoDeDados = BancoDeDados;
  $scope.analiseDeMercadoID = AnaliseDeMercadoID.novaAnaliseDeMercadoID();
  $scope._id;
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

      var caminho;
      var objeto;

      for(indice = 0; indice < $scope.analiseDeMercado.fornecedores.length; indice++){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/fornecedores?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = $scope.analiseDeMercado.fornecedores[indice];
        $scope.bancoDeDados.salvar(caminho, objeto).then(function(dados){
          $scope._id = dados._id;
          $scope.salvarIdFornecedor(indice);
          console.log(dados);

        });
        console.log($scope.analiseDeMercadoID.idsFornecedores[indice]);
      }



      for(indice = 0; indice < $scope.analiseDeMercado.concorrentes.length; indice++){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/concorrente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = $scope.analiseDeMercado.concorrentes[indice];
        /*$scope.bancoDeDados.salvar(caminho, objeto).success(function(dados){
          $scope.analiseDeMercadoID.idsConcorrentes[indice] = dados._id;
        });*/
      }

      json = angular.toJson();
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/cliente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = $scope.analiseDeMercado.cliente;
      /*$scope.bancoDeDados.salvar(caminho, objeto).success(function(dados){
        $scope.analiseDeMercadoID.idCliente = dados._id;
      });*/

      console.log($scope.analiseDeMercadoID.idsFornecedores[0]);
      json = angular.toJson(this.analiseDeMercadoID);
      localStorage.setItem("analiseDeMercado", json);
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/analiseMercado?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = $scope.analiseDeMercadoID;
      $scope.bancoDeDados.salvar(caminho, objeto);
    }

    $scope.salvarIdFornecedor = function(indice){
      console.log($scope._id);
      $scope.analiseDeMercadoID.idsFornecedores[indice] = $scope._id;
      console.log($scope.analiseDeMercadoID.idsFornecedores[indice]);
    }
  });
