angular.module('starter.controllers.avaliacaoDoPlano', ['starter.services.avaliacaoDoPlano',
'starter.services.utilitarios'])
.controller('AvaliacaoDoPlanoCtrl', function($scope, AvaliacaoDoPlano, $ionicHistory,
  $ionicPopup, $timeout, BancoDeDados, $ionicLoading, $rootScope){
  $scope.avaliacaoDoPlano = AvaliacaoDoPlano.getAvaliacaoDoPlano();
  $scope.init = function(){

  }
  $scope.bancoDeDados = BancoDeDados;

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
        duration: 10000
      }).then(function(){
        setTimeout(function(){
          json = angular.toJson($scope.avaliacaoDoPlano);
          localStorage.setItem("avaliacaoEstrategica", json);
          caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoPlano?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
          objeto = $scope.avaliacaoDoPlano;
          $scope.bancoDeDados.salvar(caminho, objeto).then(function(dados){
            console.log(dados);
            $rootScope.planoDeNegocioID.avaliacaoPlanoID = dados.data._id.$oid;
          });
        }, 10000);
      });

      $scope.hide = function(){
        $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
        });

      };
    };
  })
