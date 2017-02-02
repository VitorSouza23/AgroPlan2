angular.module('starter.controllers.planoDeMarketing', ['starter.services.planoDeMarketing', 'starter.services.utilitarios'])

.controller('PlanoDeMarketingCtrl', function($scope, PlanoDeMarketing, Produto, $ionicListDelegate, $ionicHistory, $ionicPopup, $timeout, BancoDeDados,$ionicLoading, PlanoDeMarketingID, Modal){
  $scope.planoDeMarketing = PlanoDeMarketing.getPlanoDeMarketing();
  $scope.editar = PlanoDeMarketing.editar;
  $scope.bancoDeDados = BancoDeDados;
  $scope.planoDeMarketingID = PlanoDeMarketingID;
  Modal.init('subitens/produtos.html', $scope).then(function(modal){
    $scope.modalProduto = modal;
  });

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Plano de Marketing',
      template: 'É onde o usuário informará todos os detalhes dos itens a serem cultivados e vendidos.',
      cancelText: 'Sair'
    })};

    $scope.addProduto = function(){
      if(!$scope.editar){
        $scope.planoDeMarketing.addProduto($scope.produto);
      }else{
        $scope.planoDeMarketing.editarProduto($scope.produto);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.modalProduto.hide();
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


    $scope.openProdutos= function() {
      $scope.modalProduto.show();
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

    $scope.salvar = function(){
      var caminho;
      var objeto;

      salvarProdutos();
      salvarLocalizacao();
      $scope.planoDeMarketingID.estrategiasPromocionais = $scope.planoDeMarketing.estrategiasPromocionais;
      $scope.planoDeMarketingID.estruturaDeComercializacao = $scope.planoDeMarketing.estruturaDeComercializacao;
      $ionicLoading.show({
        template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 10000
      }).then(function(){
        setTimeout(function(){

          console.log($scope.planoDeMarketingID.idsProdutos);
          console.log($scope.planoDeMarketingID.idLocalizacao);
          console.log($scope.planoDeMarketingID.estrategiasPromocionais);
          json = angular.toJson($scope.planoDeMarketing);
          localStorage.setItem("planoDeMarketing", json);
          caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoMarketing?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
          objeto = $scope.planoDeMarketingID;
          $scope.bancoDeDados.salvar(caminho, objeto);
        }, 10000);
      });

      $scope.hide = function(){
        $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
        });

      };
    };

    function salvarProdutos(){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/produto?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvarArray(caminho, $scope.planoDeMarketing.produtos).then(function (dados){
        dados.forEach(function(dado){
          $scope.planoDeMarketingID.idsProdutos.push(dado.data._id);
          console.log(dado);
        });
      });

    }


    function salvarLocalizacao(){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/localizacao?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = $scope.planoDeMarketing.localizacaoDoNegocio;
      $scope.bancoDeDados.salvar(caminho, objeto).then(function(response){
        $scope.planoDeMarketingID.idLocalizacao = response.data._id;
        console.log(response);

      });
    }


    $scope.recuperarDadosProdutos = function(){
      $ionicLoading.show({
        template: 'Acessando Produtos... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 5000
      }).then(function(){
        $scope.bancoDeDados.recuperar('https://api.mlab.com/api/1/databases/agroplan/collections/produto?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff').then(function(dados){
          $scope.planoDeMarketing.produtos = dados.data;
        });
      });
    };
  });
