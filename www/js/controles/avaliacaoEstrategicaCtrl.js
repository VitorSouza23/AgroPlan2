angular.module('starter.controllers.avaliacaoEstrategica', ['starter.services.avaliacaoEstrategica'])

.controller('AvaliacaoEstrategicaCtrl', function($scope, AvaliacaoEstrategica, $ionicHistory){
  $scope.avaliacaoEstrategica = AvaliacaoEstrategica.getAvaliacaoEstrategica();

  $scope.back = function(){
  $ionicHistory.goBack();
};
})
