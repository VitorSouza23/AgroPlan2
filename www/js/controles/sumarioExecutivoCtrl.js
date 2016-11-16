angular.module('starter.controllers.sumarioExecutivo', ['starter.services.sumarioExecutivo', "starter.services.utilitarios"])

.controller('SumarioExecutivoCtrl', function($scope, SumarioExecutivo, Socio, $ionicListDelegate, $ionicHistory, $ionicPopup, $timeout, BancoDeDados,$ionicLoading, SumarioExecutivoID, Modal){
  $scope.sumarioExecutivo = SumarioExecutivo.getSumarioExecutivo();
  $scope.cnpjOuCpf = SumarioExecutivo.getCnpjOuCpf();
  $scope.escolherCnpjOuCpf = SumarioExecutivo.escolherCnpjOuCpf();
  $scope.editar = SumarioExecutivo.editar;
  $scope.bancoDeDados = BancoDeDados;
  $scope.sumarioExecutivoID = SumarioExecutivoID;
  Modal.init('menus/subitens/socios.html', $scope).then(function(modal){
    $scope.modalSocio = modal;
  });

  $scope.showConfirm = function() {
  var confirmPopup = $ionicPopup.confirm({
    title: 'Sumário Executivo',
    template: 'É o resumo do Plano de Negócios, onde será descrito os pontos mais importantes do negócio.',
    cancelText: 'Sair'
  })};


  $scope.socio = Socio.getSocio();

  $scope.botaoAdicionarSocio = function(socio){
    if(!this.editar){
      $scope.sumarioExecutivo.adicionarSocio($scope.socio);
      $ionicListDelegate.closeOptionButtons();
    }else{
      $scope.sumarioExecutivo.editarSocio($scope.socio);
      $scope.editar = false;
    }
    $scope.modalSocio.hide();
  };

  $scope.botaoRemoverSocio = function(socio){
    $scope.sumarioExecutivo.removerSocio(socio);
  };

  $scope.botaoEditarSocio = function(socio){
    $scope.socio = socio;
    $scope.editar = true;
    $scope.openSocios();

  };

  $scope.openSocios = function() {
    $scope.modalSocio.show();
    if(!$scope.editar){
      $scope.socio = Socio.novoSocio();
    }
  };

  $scope.back = function(){
    $ionicHistory.goBack();
  };

  $scope.mostrarReordem = function(){
    $scope.reordenar = !$scope.reordenar;
  }

  $scope.moverSocio = function(item, fromIndex, toIndex) {
    $scope.sumarioExecutivo.socios.splice(fromIndex, 1);
    $scope.sumarioExecutivo.socios.splice(toIndex, 0, item);
  };

  $scope.salvar = function(){
    var caminho;
    var objeto;

    salvarSocios();
    $scope.sumarioExecutivoID.principaisPontos = $scope.sumarioExecutivo.principaisPontos;
    $scope.sumarioExecutivoID.dadosDoemprendimento = $scope.sumarioExecutivo.dadosDoemprendimento;
    $scope.sumarioExecutivoID.missaoDaEmpresa = $scope.sumarioExecutivo.missaoDaEmpresa;
    $scope.sumarioExecutivoID.fomaJuridica = $scope.sumarioExecutivo.fomaJuridica;
    $scope.sumarioExecutivoID.optantePeloSimples = $scope.sumarioExecutivo.optantePeloSimples;
    $scope.sumarioExecutivoID.fontesDeRecursos = $scope.sumarioExecutivo.fontesDeRecursos;
    $ionicLoading.show({
      template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
      duration: 10000
    }).then(function(){
      setTimeout(function(){

        console.log($scope.sumarioExecutivoID.idsSocios);
        json = angular.toJson($scope.sumarioExecutivoID);
        localStorage.setItem("suamarioExecutivo", json);
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/sumarioExecutivo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = $scope.sumarioExecutivoID;
        $scope.bancoDeDados.salvar(caminho, objeto);
      }, 10000);
    });

    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });

    };
  };

  function salvarSocios(){
    caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/socio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
    $scope.bancoDeDados.salvarArray(caminho, $scope.sumarioExecutivo.socios).then(function (dados){
      dados.forEach(function(dado){
        $scope.sumarioExecutivoID.idsSocios.push(dado.data._id);
        console.log(dado);
      });
    });
  }

  $scope.recuperarDadosSocios= function(){
    $ionicLoading.show({
      template: 'Acessando Socios... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
      duration: 5000
    }).then(function(){
      $scope.bancoDeDados.recuperar('https://api.mlab.com/api/1/databases/agroplan/collections/socio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff').then(function(dados){
        $scope.sumarioExecutivo.socios = dados.data;
      });
    });
  };

});
