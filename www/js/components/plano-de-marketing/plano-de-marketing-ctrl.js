angular.module('starter.controllers.planoDeMarketing', ['starter.services.planoDeMarketing',
'starter.services.utilitarios'])

.controller('PlanoDeMarketingCtrl', function($scope, PlanoDeMarketing, Produto, $ionicListDelegate,
  $ionicHistory, $ionicPopup, $timeout, BancoDeDados,$ionicLoading, PlanoDeMarketingID, Modal,
  $rootScope, $q){
    $scope.planoDeMarketing = PlanoDeMarketing.getPlanoDeMarketing();

    $scope.init = function(){
      console.log($rootScope.planoDeNegocioMontado.planoDeMarketing);
      if($rootScope.planoDeNegocioMontado.planoDeMarketing._id != undefined){
        $scope.planoDeMarketing._id = $rootScope.planoDeNegocioMontado.planoDeMarketing._id;
        $scope.planoDeMarketing.estrategiasPromocionais = $rootScope.planoDeNegocioMontado.planoDeMarketing.estrategiasPromocionais;
        $scope.planoDeMarketing.estruturaDeComercializacao =  $rootScope.planoDeNegocioMontado.planoDeMarketing.estruturaDeComercializacao;
        $scope.planoDeMarketing.localizacaoDoNegocio = $rootScope.planoDeNegocioMontado.planoDeMarketing.localizacaoDoNegocio;
        recuperarSubitens();
      }
    }

    $scope.editar = PlanoDeMarketing.editar;
    $scope.bancoDeDados = BancoDeDados;
    $scope.planoDeMarketingID = PlanoDeMarketingID;
    Modal.init('js/components/plano-de-marketing/subitens/produtos.html', $scope).then(function(modal){
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
          $scope.produto.idUsuario = $rootScope.usuario._id;
          salvarProduto($scope.produto);
          $scope.planoDeMarketing.addProduto($scope.produto);
        }else{
          $scope.planoDeMarketing.editarProduto($scope.produto);
          console.log($scope.produto);
          atualizarProduto($scope.produto);
          $scope.editar = false;
          $ionicListDelegate.closeOptionButtons();
        }
        $scope.modalProduto.hide();
      }

      $scope.botaoRemoverProduto= function(produto){
        var pos = $scope.planoDeMarketingID.idsProdutos.indexOf(produto._id);
        $scope.planoDeMarketingID.idsProdutos.splice(pos,1);
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

      $scope.excluirProdutoPermanentemente = function(){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Excluir?',
          template: 'Deseja excluir permanentemente este item?',
          cancelText: 'Não'
        });

        confirmPopup.then(function(res) {
          if(res) {
            excluirProduto($scope.produto);
            console.log("Excluído!");
          } else {
            console.log('Não Excluído!');
          }
        });

      }

      $scope.salvar = function(){
        var caminho;
        var objeto;

        salvarLocalizacao();
        $scope.planoDeMarketingID.estrategiasPromocionais = $scope.planoDeMarketing.estrategiasPromocionais;
        $scope.planoDeMarketingID.estruturaDeComercializacao = $scope.planoDeMarketing.estruturaDeComercializacao;
        $ionicLoading.show({
          template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
          duration: 1000
        }).then(function(){
          setTimeout(function(){

            console.log($scope.planoDeMarketingID.idsProdutos);
            console.log($scope.planoDeMarketingID.idLocalizacao);
            console.log($scope.planoDeMarketingID.estrategiasPromocionais);

            caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoMarketing?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
            objeto = $scope.planoDeMarketingID;
            if($scope.planoDeMarketing._id == undefined){
              $scope.bancoDeDados.salvar(caminho, objeto).then(function(dados){
                console.log(dados.data);
                $rootScope.planoDeNegocio.planoDeMarketingID._id = dados.data._id;
              });
            }else{
              $scope.bancoDeDados.atualizar(caminho, objeto)
            }

          }, 1000);
        });

        $scope.hide = function(){
          $ionicLoading.hide().then(function(){
            console.log("The loading indicator is now hidden");
          });

        };
      };



      function salvarProduto(produto){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/produto?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        $scope.bancoDeDados.salvar(caminho, produto).then(function (dados){
          console.log(dados.data);
          $scope.produto._id = dados.data._id;
          $scope.planoDeMarketingID.idsProdutos.push(dados.data._id);
        });

      };

      function atualizarProduto(produto){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/produto?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        $scope.bancoDeDados.atualizar(caminho, produto).then(function(dados){
          console.log(dados.data);

        });
      }

      function excluirProduto(produto){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/produto?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        $scope.bancoDeDados.remover(caminho, produto).then(function(dados){
          console.log(dados.data);

        });
        $scope.botaoRemoverProduto(produto);
        $scope.modalProduto.hide();
      }


      function salvarLocalizacao(){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/localizacao?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = $scope.planoDeMarketing.localizacaoDoNegocio;
        if($scope.planoDeMarketing.localizacaoDoNegocio._id == undefined){
          $scope.bancoDeDados.salvar(caminho, objeto).then(function(response){
            $scope.planoDeMarketingID.idLocalizacao = response.data._id;
            console.log(response);
          });
        }else{
          $scope.bancoDeDados.atualizar(caminho, objeto);
        }
      }


      $scope.recuperarDadosProdutos = function(){
        $ionicLoading.show({
          template: 'Acessando Produtos... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
          duration: 1000
        }).then(function(){
          $scope.bancoDeDados.recuperarComIdUsuario('https://api.mlab.com/api/1/databases/agroplan/collections/produto?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $rootScope.usuario).then(function(dados){
            $scope.planoDeMarketing.produtos = dados.data;
            console.log(dados.data);
            $scope.planoDeMarketingID.idsProdutos = [];
            dados.data.forEach(function(dado){
              $scope.planoDeMarketingID.idsProdutos.push(dado._id);
            });
            console.log($scope.planoDeMarketingID.idsProdutos);
          });
        });
      };

      //Recuperação de dados
      var arrayPromessasProdutos = [];

      recuperarPordutos = function(){
        arrayPromessasProdutos = [];
        $scope.planoDeMarketing.produtos = [];
        $scope.planoDeMarketingID.idsProdutos = [];
        var objeto = {};
        $rootScope.planoDeNegocioMontado.planoDeMarketing.idsProdutos.forEach(function(dadoId){
          caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/produto?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
          objeto._id = dadoId;
          arrayPromessasProdutos.push(BancoDeDados.recuperarComId(caminho, objeto));
        });
        qAllProduto();
      }

      qAllProduto= function(){
        $q.all(arrayPromessasProdutos).then(function(dados){
          console.log(dados);
          dados.forEach(function (dado){
            console.log(dado.data[0]);
            $scope.planoDeMarketing.produtos.push(dado.data[0]);
            $scope.planoDeMarketingID.idsProdutos.push(dado.data[0]._id);
          });
        });
      }

      recuperarLocalizacao = function(){

        var objeto = {};
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/localizacao?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto._id = $rootScope.planoDeNegocioMontado.planoDeMarketing.idLocalizacao;
        BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
          console.log(dados);
          $scope.planoDeMarketing.localizacaoDoNegocio = dados.data[0];
          $scope.planoDeMarketingID.idLocalizacao = dados.data[0]._id;
        });

      }

      recuperarSubitens = function(){

        $ionicLoading.show({
          template: 'Recuperando Dados... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
          duration: 1000
        }).then(function(){
          recuperarPordutos();
          recuperarLocalizacao();
        });

      };


    });
