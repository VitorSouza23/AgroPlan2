angular.module('starter.controllers.roteiroParaColeta', ['starter.services.roteiroParaColeta'])
.controller('RoteiroParaColetaCtrl', function($scope, RoteiroParaColeta, $ionicHistory, $ionicPopup, $timeout){
  $scope.roteiroParaColeta = RoteiroParaColeta.getRoteiroParaColeta();
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
    title: 'Roteiro para Coleta de Informação',
    template: 'É o questionário que o usuário fará para coleta de informações.',
    cancelText: 'Sair'
  })};

  $scope.back = function(){
  $ionicHistory.goBack();
};
})
