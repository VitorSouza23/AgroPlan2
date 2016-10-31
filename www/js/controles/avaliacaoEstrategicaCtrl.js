angular.module('starter.controllers.avaliacaoEstrategica', ['starter.services.avaliacaoEstrategica'])

<<<<<<< HEAD
.controller('AvaliacaoEstrategicaCtrl', function($scope, AvaliacaoEstrategica, $ionicHistory, $ionicPopup, $timeout){
=======
.controller('AvaliacaoEstrategicaCtrl', function($scope, AvaliacaoEstrategica, $ionicHistory){
>>>>>>> 404bee94a93b31a8408be9d9ae85e13ef839fe6a
  $scope.avaliacaoEstrategica = AvaliacaoEstrategica.getAvaliacaoEstrategica();

  $scope.back = function(){
  $ionicHistory.goBack();
<<<<<<< HEAD

};


$scope.showConfirm = function() {
var confirmPopup = $ionicPopup.confirm({
  title: 'Avaliação Estratégica',
  template: 'É onde o usuário fará a avaliação de suas estratégias para seu negócio através da Análise FOFA.',
  cancelText: 'Sair'
})};

=======
};
>>>>>>> 404bee94a93b31a8408be9d9ae85e13ef839fe6a
})
