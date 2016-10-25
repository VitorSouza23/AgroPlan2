angular.module('starter.controllers.planoOperacional', ['starter.services.planoOperacional'])

.controller('PlanoOperacionalCtrl', function($scope, PlanoOperacional, Cargo, $ionicModal, $ionicListDelegate, $ionicHistory){
  $scope.planoOperacional = PlanoOperacional.getPlanoOperacional();
  $scope.editar = PlanoOperacional.editar;

  $scope.addCargo = function(){
    if(!$scope.editar){
      $scope.planoOperacional.addCargo($scope.cargo);
    }else{
      $scope.planoOperacional.editarCargo($scope.cargo);
      $scope.editar = false;
      $ionicListDelegate.closeOptionButtons();
    }
    $scope.closeCargos();
  };

  $scope.botaoRemoverCargo = function(cargo){
    $scope.planoOperacional.removerCargo(cargo);
  };

  $scope.botaoEditarCargo = function(cargo){
    $scope.cargo = cargo;
    $scope.editar = true;
    $scope.openCargos();
  };

  $scope.back = function(){
    $ionicHistory.goBack();
  };

  $ionicModal.fromTemplateUrl('menus/subitens/cargos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeCargos = function() {
    $scope.modal.hide();
  };

  $scope.openCargos= function() {
    $scope.modal.show();
    if(!$scope.editar){
      $scope.cargo = Cargo.novoCargo();
    }
  };

  $scope.takePicture = function () {

    var options = {
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      quality : 75,
      targetWidth: 200,
      targetHeight: 200,
      sourceType: 1
    };

    Camera.getPicture(options).then(function(imageData) {
      $scope.picture = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      console.log(err);
    });

  };

  $scope.getPicture = function () {

    var options = {
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      quality : 75,
      targetWidth: 200,
      targetHeight: 200,
      sourceType: 0
    };

    Camera.getPicture(options).then(function(imageData) {
      $scope.picture = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      console.log(err);
    });
  };

  $scope.mostrarReordem = function(){
    $scope.reordenar = !$scope.reordenar;
  }

  $scope.moverCargo = function(item, fromIndex, toIndex) {
    $scope.planoOperacional.cargos.splice(fromIndex, 1);
    $scope.planoOperacional.cargos.splice(toIndex, 0, item);
  };


})
