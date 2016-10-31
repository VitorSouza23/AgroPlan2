angular.module('starter.controllers.construcaoDeCenario', ['starter.services.construcaoDeCenario'])

<<<<<<< HEAD
.controller('CosntrucaoDeCenarioCtrl', function($scope, ConstrucaoDeCenario, $ionicListDelegate, $ionicHistory, $ionicPopup, $timeout){
=======
.controller('CosntrucaoDeCenarioCtrl', function($scope, ConstrucaoDeCenario, $ionicHistory){
>>>>>>> 404bee94a93b31a8408be9d9ae85e13ef839fe6a
  $scope.construcaoDeCenario = ConstrucaoDeCenario.getConstrucaoDeCenario();

  $scope.back = function(){
    $ionicHistory.goBack();
  };
<<<<<<< HEAD

  $scope.showConfirm = function() {
  var confirmPopup = $ionicPopup.confirm({
    title: 'Construção de Cenários',
    template: 'É onde o usuário poderá simular valores e situações diversas para a empresa.',
    cancelText: 'Sair'
  })};

})
=======
});
>>>>>>> 404bee94a93b31a8408be9d9ae85e13ef839fe6a
