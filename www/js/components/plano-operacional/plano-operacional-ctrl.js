angular.module('starter.controllers.planoOperacional', ['starter.services.planoOperacional', 'ionic', 'starter.services.utilitarios'])

.controller('PlanoOperacionalCtrl', function($scope, PlanoOperacional, Cargo, $ionicListDelegate, $ionicHistory, $ionicPopup, $ionicPopup, $timeout, BancoDeDados,$ionicLoading, PlanoOperacionalID, Modal){
  $scope.planoOperacional = PlanoOperacional.getPlanoOperacional();
  $scope.editar = PlanoOperacional.editar;
  $scope.planoOperacionalID = PlanoOperacionalID;
  $scope.bancoDeDados = BancoDeDados;
  Modal.init('js/components/plano-operacional/subitens/cargos.html', $scope).then(function(modal){
    $scope.modalCargo = modal;
  });

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
    $scope.modalCargo.hide();
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

  $scope.openCargos= function() {
    $scope.modalCargo.show();
    if(!$scope.editar){
      $scope.cargo = Cargo.novoCargo();
    }
  };

  function sucessoAoPegarFoto(imageData){
    if(tipoDestinoCaminhoFoto == 1 || tipoDestinoCaminhoFoto == 2){
      $scope.planoOperacional.layout = imageData;
    }else {
      $scope.planoOperacional.layout = "data:image/jpeg;base64," + imageData;
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

  $scope.salvar = function(){
    var caminho;
    var objeto;

    salvarCargos();
    salvarImagem();
    $scope.planoOperacionalID.capacidadeComercial = $scope.planoOperacional.capacidadeComercial;
    $scope.planoOperacionalID.capacidadeProdutiva =  $scope.planoOperacional.capacidadeProdutiva;
    $scope.planoOperacionalID.capacidadeComercialInicial = $scope.planoOperacional.capacidadeComercialInicial;
    $scope.planoOperacionalID.capacidadeProdutivaInicial =  $scope.planoOperacional.capacidadeProdutivaInicial;
    $scope.planoOperacionalID.processosOperacionais =  $scope.planoOperacional.processosOperacionais;

    $ionicLoading.show({
      template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
      duration: 10000
    }).then(function(){
      setTimeout(function(){
        console.log($scope.planoOperacionalID.idsCargos);
        console.log($scope.planoOperacionalID.idImagem);
        console.log($scope.planoOperacionalID.capacidadeProdutiva);
        json = angular.toJson($scope.PlanoOperacionalID);
        localStorage.setItem("analiseDeMercado", json);
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoOperacional?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = $scope.planoOperacionalID;
        $scope.bancoDeDados.salvar(caminho, objeto);
      }, 10000);
    });

    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });

    };
  };

  function salvarCargos(){
    caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/cargos?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
    $scope.bancoDeDados.salvarArray(caminho, $scope.planoOperacional.cargos).then(function (dados){
      dados.forEach(function(dado){
        $scope.planoOperacionalID.idsCargos.push(dado.data._id);
        console.log(dado);
      });
    });

  }


  function salvarImagem(){
    caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/imagem?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
    objeto = $scope.planoOperacional.layout;
    json = JSON.stringify($scope.planoOperacional.layout);
    $scope.bancoDeDados.salvar(caminho, json).then(function(response){
      $scope.planoOperacionalID.idImagem = response.data._id;
      console.log(response);

    });
  }

  $scope.recuperarDadosCargos = function(){
    $ionicLoading.show({
      template: 'Acessando Cargos... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
      duration: 5000
    }).then(function(){
      $scope.bancoDeDados.recuperar('https://api.mlab.com/api/1/databases/agroplan/collections/cargos?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff').then(function(dados){
        $scope.planoOperacional.cargos = dados.data;
      });
    });
  };

})
