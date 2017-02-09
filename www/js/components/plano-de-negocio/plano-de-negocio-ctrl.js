angular.module('starter.controllers.planoDeNegocio', ['starter.services'])

.controller('PlanoDeNegocioCtrl', function($scope, $state, $rootScope) {
  $scope.usuario = $rootScope.usuario;
  $scope.novoPlanoDeNegocio = function(){
    $state.go('tab.sumarioExecutivo');
  }
  
});
