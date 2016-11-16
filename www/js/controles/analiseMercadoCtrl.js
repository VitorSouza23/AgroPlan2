angular.module('starter.controllers.analiseDeMercado', ['starter.services.analiseDeMercado', 'starter.services.utilitarios'])

.controller('AnaliseDeMercadoCtrl', function($scope, AnaliseDeMercado, AnaliseDeMercadoID, Concorrente, Fornecedor, $ionicListDelegate, $ionicHistory,$ionicPopup, $timeout, BancoDeDados,$ionicLoading, Modal){
  $scope.analiseDeMercado = AnaliseDeMercado.getAnaliseDeMercado();
  $scope.editar  = AnaliseDeMercado.editar;
  $scope.bancoDeDados = BancoDeDados;
  $scope.analiseDeMercadoID = AnaliseDeMercadoID;

  Modal.init('menus/subitens/concorrentes.html', $scope).then(function(modal){
    $scope.modalConcorrente = modal;
  });

  Modal.init('menus/subitens/fornecedores.html', $scope).then(function(modal){
    $scope.modalFornecedor = modal;
  });

  $scope.addConcorrente = function(){
    if(!$scope.editar){
      $scope.analiseDeMercado.addConcorrente($scope.concorrente);
    }else{
      $scope.analiseDeMercado.editarConcorrente($scope.concorrente);
      $scope.editar = false;
      $ionicListDelegate.closeOptionButtons();
    }
    $scope.modalConcorrente.hide();
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

    $scope.openConcorrentes = function() {
      $scope.modalConcorrente.show();
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
      $scope.modalFornecedor.hide();
    }

    $scope.botaoRemoverFornecedor = function(fornecedor){
      $scope.analiseDeMercado.removerFornecedor(fornecedor);
    };

    $scope.botaoEditarFornecedor = function(fornecedor){
      $scope.fornecedor = fornecedor;
      $scope.editar = true;
      $scope.openFornecedores();
    };


    $scope.openFornecedores = function() {
      $scope.modalFornecedor.show();
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

      salvarFornecedores();
      salvarConcorrentes();
      salvarCliente();

      $ionicLoading.show({
        template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 10000
      }).then(function(){
        setTimeout(function(){
          console.log("The loading indicator is now displayed");
          console.log($scope.analiseDeMercadoID.idsFornecedores);
          console.log($scope.analiseDeMercadoID.idsConcorrentes);
          console.log($scope.analiseDeMercadoID.idCliente);
          json = angular.toJson($scope.analiseDeMercadoID);
          localStorage.setItem("analiseDeMercado", json);
          caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/analiseMercado?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
          objeto = $scope.analiseDeMercadoID;
          $scope.bancoDeDados.salvar(caminho, objeto);
        }, 10000);
      });

      $scope.hide = function(){
        $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
        });

      };
    };

    function salvarFornecedores(){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/fornecedores?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      auxListaFornecedor = [];
      $scope.analiseDeMercado.fornecedores.forEach(function(fornecedor){
        if(fornecedor._id == null){
          auxListaFornecedor.push(fornecedor);
        }else{
          $scope.analiseDeMercadoID.idsFornecedores.push(fornecedor._id);
        }
      });
      $scope.bancoDeDados.salvarArray(caminho, auxListaFornecedor).then(function (dados){
        dados.forEach(function(dado){
          $scope.analiseDeMercadoID.idsFornecedores.push(dado.data._id);
          console.log(dado);
        });
      });

    };

    function salvarConcorrentes(){

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/concorrente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      auxListaConcorrente = [];
      $scope.analiseDeMercado.concorrentes.forEach(function(concorrente){
        if(concorrente._id == null){
          auxListaConcorrente.push(concorrente);
        }else{
          $scope.analiseDeMercadoID.idsConcorrentes.push(concorrente._id);
        }
      });
      $scope.bancoDeDados.salvarArray(caminho, auxListaConcorrente).then(function(dados){
        dados.forEach(function(dado){
          $scope.analiseDeMercadoID.idsConcorrentes.push(dado.data._id);
          console.log(dado);
        })
      });
    };

    function salvarCliente(){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/cliente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = $scope.analiseDeMercado.cliente;
      $scope.bancoDeDados.salvar(caminho, objeto).then(function(response){
        $scope.analiseDeMercadoID.idCliente = response.data._id;
        console.log(response);

      });
    };

    $scope.recuperarDadosFornecedores = function(){
      $ionicLoading.show({
        template: 'Acessando Fornecedores... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 5000
      }).then(function(){
        $scope.bancoDeDados.recuperar('https://api.mlab.com/api/1/databases/agroplan/collections/fornecedores?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff').then(function(dados){
          $scope.analiseDeMercado.fornecedores = dados.data;

        });

      });
    };

    $scope.recuperarDadosConcorrentes = function(){
      $ionicLoading.show({
        template: 'Acessando Concorrentes... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 5000
      }).then(function(){
        $scope.bancoDeDados.recuperar('https://api.mlab.com/api/1/databases/agroplan/collections/concorrente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff').then(function(dados){
          $scope.analiseDeMercado.concorrentes = dados.data;
          console.log(dados);
        });
      });
    };

  });
