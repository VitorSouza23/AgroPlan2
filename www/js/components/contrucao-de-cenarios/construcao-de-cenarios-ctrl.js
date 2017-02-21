angular.module('starter.controllers.construcaoDeCenario', ['starter.services.construcaoDeCenario','starter.services.utilitarios'])

.controller('CosntrucaoDeCenarioCtrl', function($scope, ConstrucaoDeCenario, $ionicHistory, $ionicPopup, $timeout, BancoDeDados,$ionicLoading){
  $scope.construcaoDeCenario = ConstrucaoDeCenario.getConstrucaoDeCenario();

  $scope.init = function(){

  }

  $scope.bancoDeDados = BancoDeDados;
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
      duration: 10000
    }).then(function(){
      setTimeout(function(){
        json = angular.toJson($scope.construcaoDeCenario);
        localStorage.setItem("avaliacaoEstrategica", json);
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/construcaoCenario?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = $scope.construcaoDeCenario;
        $scope.bancoDeDados.salvar(caminho, objeto).then(function(dados){
          console.log(dados);
          $rootScope.planoDeNegocioID.construcaoCenariosID._id = dados.data._id;
        });
      }, 10000);
    });

    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });

    };
  };
});
