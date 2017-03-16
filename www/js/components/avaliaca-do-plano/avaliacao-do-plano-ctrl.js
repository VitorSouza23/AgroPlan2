angular.module('starter.controllers.avaliacaoDoPlano', ['starter.services.avaliacaoDoPlano',
'starter.services.utilitarios'])
.controller('AvaliacaoDoPlanoCtrl', function($scope, AvaliacaoDoPlano, $ionicHistory,
  $ionicPopup, $timeout, BancoDeDados, $ionicLoading, $rootScope){
  $scope.avaliacaoDoPlano = AvaliacaoDoPlano.getAvaliacaoDoPlano();

  $scope.init = function(){
    //$rootScope.verificarSeUsuarioEstaLogado();
    console.log($rootScope.planoDeNegocioMontado.avaliacaoDoPlano);
    if($scope.avaliacaoDoPlano._id == undefined){
      $scope.avaliacaoDoPlano._id = $rootScope.planoDeNegocioMontado.avaliacaoDoPlano._id;
      $scope.avaliacaoDoPlano.avaliacao = $rootScope.planoDeNegocioMontado.avaliacaoDoPlano.avaliacao;
    }
  }
  $scope.bancoDeDados = BancoDeDados;

  $scope.atualizarPagina = function(){
    $scope.avaliacaoDoPlano._id = undefined;
    $scope.init();
    $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Avaliação do Plano',
      template: 'É onde o usuário fará a avaliação do seu plano de negócios.',
      cancelText: 'Sair'
    })};

    $scope.back = function(){
      $ionicHistory.goBack();
    };

    $scope.salvar = function(){
      var caminho;
      var objeto;
      $ionicLoading.show({
        template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 1000
      }).then(function(){
        setTimeout(function(){
          caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoPlano?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
          objeto = $scope.avaliacaoDoPlano;
            $scope.bancoDeDados.atualizar(caminho, objeto);
        }, 1000);
      });

      $scope.hide = function(){
        $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
        });

      };
    };
  })
