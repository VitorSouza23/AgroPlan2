angular.module('starter.controllers.avaliacaoDoPlano', ['starter.services.avaliacaoDoPlano'])
.controller('AvaliacaoDoPlanoCtrl', function($scope, AvaliacaoDoPlano, $ionicHistory, $ionicPopup, $timeout){
  $scope.avaliacaoDoPlano = AvaliacaoDoPlano;

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
    title: 'Avaliação do Plano',
    template: 'É onde o usuário fará a avaliação do seu plano de negócios.',
    cancelText: 'Sair'
  })};

  $scope.back = function(){
  $ionicHistory.goBack();
};
})
