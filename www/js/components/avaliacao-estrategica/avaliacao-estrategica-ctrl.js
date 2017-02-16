angular.module('starter.controllers.avaliacaoEstrategica', ['starter.services.avaliacaoEstrategica',
 'starter.services.utilitarios'])

.controller('AvaliacaoEstrategicaCtrl', function($scope, AvaliacaoEstrategica, $ionicHistory,
  $ionicPopup, $timeout, BancoDeDados, $ionicLoading, $rootScope){
  $scope.avaliacaoEstrategica = AvaliacaoEstrategica.getAvaliacaoEstrategica();
  $scope.init = function(){

  }
  $scope.bancoDeDados = BancoDeDados;
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Avaliação Estratégica',
      template: 'É onde o usuário fará a avaliação de suas estratégias para seu negócio através da Análise FOFA.',
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
          json = angular.toJson($scope.avaliacaoEstrategica);
          localStorage.setItem("avaliacaoEstrategica", json);
          caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoEstrategica?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
          objeto = $scope.avaliacaoEstrategica;
          $scope.bancoDeDados.salvar(caminho, objeto).then(function(dados){
            console.log(dados);
            $rootScope.planoDeNegocioID.avaliacaoEstrategicaID = dados.data._id.$oid;
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
