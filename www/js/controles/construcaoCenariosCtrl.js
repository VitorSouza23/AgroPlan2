angular.module('starter.controllers.construcaoDeCenario', ['starter.services.construcaoDeCenario'])

.controller('CosntrucaoDeCenarioCtrl', function($scope, ConstrucaoDeCenario, $ionicHistory, $ionicPopup, $timeout){
  $scope.construcaoDeCenario = ConstrucaoDeCenario.getConstrucaoDeCenario();

  $scope.showConfirm = function() {
var confirmPopup = $ionicPopup.confirm({
  title: 'Construção de Cenários',
  template: 'É onde o usuário poderá simular valores e situações diversas para a empresa.',
  cancelText: 'Sair'
})};

  $scope.back = function(){
    $ionicHistory.goBack();
  };
});
