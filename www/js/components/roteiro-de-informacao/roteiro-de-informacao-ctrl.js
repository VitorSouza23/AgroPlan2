angular.module('starter.controllers.roteiroParaColeta', ['starter.services.roteiroParaColeta',
'starter.services.utilitarios'])
.controller('RoteiroParaColetaCtrl', function($scope, RoteiroParaColeta, $ionicHistory,
  $ionicPopup, $timeout, BancoDeDados, $ionicLoading, $rootScope){
  $scope.roteiroParaColeta = RoteiroParaColeta.getRoteiroParaColeta();

  $scope.init = function(){

  }

  $scope.bancoDeDados = BancoDeDados;

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Roteiro para Coleta de Informação',
      template: 'É o questionário que o usuário fará para coleta de informações.',
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
          json = angular.toJson($scope.roteiroParaColeta);
          localStorage.setItem("avaliacaoEstrategica", json);
          caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/roteiroInformacao?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
          objeto = $scope.roteiroParaColeta;
          $scope.bancoDeDados.salvar(caminho, objeto).then(function(dados){
            console.log(dados)
            $rootScope.planoDeNegocioID.roteiroDeInformacaoID._id = dados.data._id;;
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
