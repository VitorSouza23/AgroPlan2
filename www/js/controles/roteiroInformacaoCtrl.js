angular.module('starter.controllers.roteiroParaColeta', ['starter.services.roteiroParaColeta'])
.controller('RoteiroParaColetaCtrl', function($scope, RoteiroParaColeta, $ionicHistory){
  $scope.roteiroParaColeta = RoteiroParaColeta.getRoteiroParaColeta();

  $scope.back = function(){
  $ionicHistory.goBack();
};
})
