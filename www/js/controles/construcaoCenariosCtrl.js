angular.module('starter.controllers.construcaoDeCenario', ['starter.services.construcaoDeCenario'])

.controller('CosntrucaoDeCenarioCtrl', function($scope, ConstrucaoDeCenario, $ionicHistory){
  $scope.construcaoDeCenario = ConstrucaoDeCenario.getConstrucaoDeCenario();

  $scope.back = function(){
    $ionicHistory.goBack();
  };
});
