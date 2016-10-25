angular.module('starter.controllers.avaliacaoDoPlano', ['starter.services.avaliacaoDoPlano'])
.controller('AvaliacaoDoPlanoCtrl', function($scope, AvaliacaoDoPlano, $ionicHistory){
  $scope.avaliacaoDoPlano = AvaliacaoDoPlano;

  $scope.back = function(){
  $ionicHistory.goBack();
};
})
