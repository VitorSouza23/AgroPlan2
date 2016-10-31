angular.module('starter.controllers.planoOperacional', ['starter.services.planoOperacional', 'starter.services', 'ionic'])

.controller('PlanoOperacionalCtrl', function($scope, PlanoOperacional, Cargo, $ionicModal, $ionicListDelegate, $ionicHistory, $ionicPopup, $ionicPopup, $timeout){
  $scope.planoOperacional = PlanoOperacional.getPlanoOperacional();
  $scope.editar = PlanoOperacional.editar;
  $scope.imagem;

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Plano Operacional',
      template: 'É onde será informado o funcionamento de seu negócio.',
      cancelText: 'Sair'
    })};

  var tipoDestinoCaminhoFoto;
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

  function sucessoAoPegarFoto(imageData){
    if(tipoDestinoCaminhoFoto == 1 || tipoDestinoCaminhoFoto == 2){
      $scope.imagem = imageData;
    }else {
      $scope.imagem = "data:image/jpeg;base64," + imageData;
    }

  }

  function erroAoPegarFoto(erro){
    console.log(err);
    $ionicPopup.alert({
     title: 'Erro ao acessar recursos de Foto!',
     template: 'Não foi possível acessar a câmera ou a biblioteca de imagens.'
   });
  }

  function tipoDoSitema(){
    if(ionic.Platform.isAndroid()){
      tipoDestinoCaminhoFoto = 1;
    }else if(ionic.Platform.isIOS()){
      tipoDestinoCaminhoFoto = 2;
    }else if (ionic.Platform.isWebView()){
      console.log("É um navegador!");
      $ionicPopup.alert({
       title: 'Erro ao acessar recursos de Camêra!',
       template: 'Você está executando este aplicativo via Browser!, não há suporte à câmera.'
     });
    }else{
      tipoDestinoCaminhoFoto = 0;
    }
  }
  $scope.tirarFoto = function () {
    tipoDoSitema();
    navigator.camera.getPicture(sucessoAoPegarFoto, erroAoPegarFoto, {
      destinationType : tipoDestinoCaminhoFoto,
      sourceType : 1,
      encodingType: Camera.EncodingType.JPEG,
      quality : 75,
      targetWidth: 200,
      targetHeight: 200,

    });
  };

  $scope.pegarFoto = function () {
    navigator.camera.getPicture(sucessoAoPegarFoto, erroAoPegarFoto, {
      destinationType : tipoDestinoCaminhoFoto,
      sourceType : 0,
      encodingType: Camera.EncodingType.JPEG,
      quality : 75,
      targetWidth: 200,
      targetHeight: 200,

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
