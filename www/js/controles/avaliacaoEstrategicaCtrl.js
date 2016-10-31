angular.module('starter.controllers.avaliacaoEstrategica', ['starter.services.avaliacaoEstrategica'])

.controller('AvaliacaoEstrategicaCtrl', function($scope, AvaliacaoEstrategica, $ionicHistory, $ionicPopup, $timeout){
  $scope.avaliacaoEstrategica = AvaliacaoEstrategica.getAvaliacaoEstrategica();
$scope.showConfirm = function() {
  var confirmPopup = $ionicPopup.confirm({
  title: 'Avaliação Estratégica',
  template: 'É onde o usuário fará a avaliação de suas estratégias para seu negócio através da Análise FOFA.',
  cancelText: 'Sair'
})};

  $scope.back = function(){
  $ionicHistory.goBack();
};
})
