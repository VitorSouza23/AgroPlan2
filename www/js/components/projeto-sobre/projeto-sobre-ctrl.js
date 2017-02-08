angular.module('starter.controllers.sobreProjeto', ["starter.services.utilitarios"])

.controller('SobreProjetoCtrl', function($scope, $ionicHistory) {

  $scope.back = function(){
    $ionicHistory.goBack();
  };

});
