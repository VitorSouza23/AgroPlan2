angular.module('starter.controllers.avaliacaoEstrategica', ['starter.services.avaliacaoEstrategica',
'starter.services.utilitarios'])

.controller('AvaliacaoEstrategicaCtrl', function($scope, AvaliacaoEstrategica, $ionicHistory,
  $ionicPopup, $timeout, BancoDeDados, $ionicLoading, $rootScope){
    $scope.avaliacaoEstrategica = AvaliacaoEstrategica.getAvaliacaoEstrategica();
    $scope.init = function(){
      //$rootScope.verificarSeUsuarioEstaLogado();
      console.log($rootScope.planoDeNegocioMontado.avaliacaoEstrategica);
      if($scope.avaliacaoEstrategica._id == undefined){
      $scope.avaliacaoEstrategica._id = $rootScope.planoDeNegocioMontado.avaliacaoEstrategica._id;
      $scope.avaliacaoEstrategica.forca = $rootScope.planoDeNegocioMontado.avaliacaoEstrategica.forca;
      $scope.avaliacaoEstrategica.fraquesa = $rootScope.planoDeNegocioMontado.avaliacaoEstrategica.fraquesa;
      $scope.avaliacaoEstrategica.oportunidade = $rootScope.planoDeNegocioMontado.avaliacaoEstrategica.oportunidade;
      $scope.avaliacaoEstrategica.ameaca = $rootScope.planoDeNegocioMontado.avaliacaoEstrategica.ameaca;
    }
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
        duration: 1000
      }).then(function(){
        setTimeout(function(){
          caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoEstrategica?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
          objeto = $scope.avaliacaoEstrategica;
            $scope.bancoDeDados.atualizar(caminho, objeto)

        }, 1000);
      });

      $scope.hide = function(){
        $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
        });

      };
    };
  })
