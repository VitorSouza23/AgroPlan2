angular.module('starter.controllers.construcaoDeCenario', [
  'starter.services.construcaoDeCenario','starter.services.utilitarios'])

  .controller('CosntrucaoDeCenarioCtrl', function($scope, ConstrucaoDeCenario,
    $ionicHistory, $ionicPopup, $timeout, BancoDeDados, $ionicLoading, $rootScope){
      $scope.construcaoDeCenario = ConstrucaoDeCenario.getConstrucaoDeCenario();

      $scope.init = function(){
        console.log($rootScope.planoDeNegocioMontado.construcaoDeCenarios);
        
        $scope.construcaoDeCenario._id = $rootScope.planoDeNegocioMontado.construcaoDeCenarios._id;
        $scope.construcaoDeCenario.provavel = $rootScope.planoDeNegocioMontado.construcaoDeCenarios.provavel;
        $scope.construcaoDeCenario.pessimsita = $rootScope.planoDeNegocioMontado.construcaoDeCenarios.pessimsita;
        $scope.construcaoDeCenario.otimista = $rootScope.planoDeNegocioMontado.construcaoDeCenarios.otimista;

    }

    $scope.bancoDeDados = BancoDeDados;

    $scope.atualizarPagina = function(){
      $scope.construcaoDeCenario._id = undefined;
      $scope.init();
      $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.showConfirm = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Construção de Cenários',
        template: 'É onde o usuário poderá simular valores e situações diversas para a empresa.',
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
            json = angular.toJson($scope.construcaoDeCenario);
            localStorage.setItem("avaliacaoEstrategica", json);
            caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/construcaoCenario?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
            objeto = $scope.construcaoDeCenario;
              $scope.bancoDeDados.atualizar(caminho, objeto);

          }, 1000);
        });

        $scope.hide = function(){
          $ionicLoading.hide().then(function(){
            console.log("The loading indicator is now hidden");
          });

        };
      };
    });
