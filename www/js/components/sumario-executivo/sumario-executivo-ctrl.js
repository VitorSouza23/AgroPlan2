angular.module('starter.controllers.sumarioExecutivo', ['starter.services.sumarioExecutivo',
"starter.services.utilitarios"])

.controller('SumarioExecutivoCtrl', function($scope, SumarioExecutivo, Socio, $ionicListDelegate,
  $ionicHistory, $ionicPopup, $timeout, BancoDeDados,$ionicLoading, SumarioExecutivoID, Modal,
  $rootScope){

  $scope.sumarioExecutivo = SumarioExecutivo.getSumarioExecutivo();

  $scope.init = function(){

  }

  $scope.cnpjOuCpf = SumarioExecutivo.getCnpjOuCpf();
  $scope.escolherCnpjOuCpf = SumarioExecutivo.escolherCnpjOuCpf();
  $scope.editar = SumarioExecutivo.editar;
  $scope.bancoDeDados = BancoDeDados;
  $scope.sumarioExecutivoID = SumarioExecutivoID;
  Modal.init('js/components/sumario-executivo/subitnes/socios.html', $scope).then(function(modal){
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
      $scope.socio.idUsuario = $rootScope.usuario._id.$oid;
      salvarSocio($scope.socio);
      $scope.sumarioExecutivo.adicionarSocio($scope.socio);
      $ionicListDelegate.closeOptionButtons();
    }else{
      $scope.sumarioExecutivo.editarSocio($scope.socio);
      atualizarSocio($scope.socio);
      $scope.editar = false;
    }
    $scope.modalSocio.hide();
  };

  $scope.botaoRemoverSocio = function(socio){
    var pos = $scope.sumarioExecutivoID.idsSocios.indexOf(socio._id.$oid);
    $scope.sumarioExecutivoID.idsSocios.splice(pos,1);
    $scope.sumarioExecutivo.removerSocio(socio);

  };

  $scope.botaoEditarSocio = function(socio){
    $scope.socio = socio;
    $scope.editar = true;
    $scope.openSocios();

  };

  $scope.excluirSocioPermanentemente = function(){
    var confirmPopup = $ionicPopup.confirm({
      title: 'Excluir?',
      template: 'Deseja excluir permanentemente este item?',
      cancelText: 'Não'
    });

    confirmPopup.then(function(res) {
      if(res) {
        excluirSocio($scope.socio);
        console.log("Excluído!");
      } else {
        console.log('Não Excluído!');
      }
    });
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

    $scope.sumarioExecutivoID.principaisPontos = $scope.sumarioExecutivo.principaisPontos;
    $scope.sumarioExecutivoID.dadosDoemprendimento = $scope.sumarioExecutivo.dadosDoemprendimento;
    $scope.sumarioExecutivoID.missaoDaEmpresa = $scope.sumarioExecutivo.missaoDaEmpresa;
    $scope.sumarioExecutivoID.fomaJuridica = $scope.sumarioExecutivo.fomaJuridica;
    $scope.sumarioExecutivoID.optantePeloSimples = $scope.sumarioExecutivo.optantePeloSimples;
    $scope.sumarioExecutivoID.fontesDeRecursos = $scope.sumarioExecutivo.fontesDeRecursos;
    $ionicLoading.show({
      template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
      duration: 1000
    }).then(function(){
      setTimeout(function(){

        console.log($scope.sumarioExecutivoID.idsSocios);
        json = angular.toJson($scope.sumarioExecutivoID);
        localStorage.setItem("suamarioExecutivo", json);
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/sumarioExecutivo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = $scope.sumarioExecutivoID;
        $scope.bancoDeDados.salvar(caminho, objeto).then(function(dados){
          console.log(dados.data);
          $rootScope.planoDeNegocioID.sumarioExecutivoID = dados.data._id.$oid;
        });
      }, 1000);
    });

    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });

    };
  };



  function salvarSocio(socio){
    caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/socio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
    $scope.bancoDeDados.salvar(caminho, socio).then(function (dados){
      console.log(dados.data);
      $scope.socio._id = dados.data._id;
      $scope.sumarioExecutivoID.idsSocios.push(dados.data._id.$oid);
    });

  };

  function atualizarSocio(socio){
    caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/socio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
    $scope.bancoDeDados.atualizar(caminho, socio).then(function(dados){
      console.log(dados.data);
    });
  }

  function excluirSocio(socio){
    caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/socio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
    $scope.bancoDeDados.remover(caminho, socio).then(function(dados){
      console.log(dados.data);
    });
    $scope.botaoRemoverSocio(socio);
    $scope.modalSocio.hide();
  }

  $scope.recuperarDadosSocios= function(){
    $ionicLoading.show({
      template: 'Acessando Socios... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
      duration: 1000
    }).then(function(){
      $scope.bancoDeDados.recuperarComIdUsuario('https://api.mlab.com/api/1/databases/agroplan/collections/socio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $rootScope.usuario).then(function(dados){
        $scope.sumarioExecutivo.socios = dados.data;
        $scope.sumarioExecutivoID.idsSocios = [];
        dados.data.forEach(function(dado){
          $scope.sumarioExecutivoID.idsSocios.push(dado._id.$oid);
        });
        console.log($scope.sumarioExecutivo.socios);
      });
    });
  };

});