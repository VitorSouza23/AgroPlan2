angular.module('starter.controllers.sumarioExecutivo', ['starter.services.sumarioExecutivo',
"starter.services.utilitarios"])

.controller('SumarioExecutivoCtrl', function($scope, SumarioExecutivo, Socio, $ionicListDelegate,
  $ionicHistory, $ionicPopup, $timeout, BancoDeDados,$ionicLoading, SumarioExecutivoID, Modal,
  $rootScope, $q){



  $scope.sumarioExecutivo = SumarioExecutivo.getSumarioExecutivo();
  $scope.cnpjOuCpf = SumarioExecutivo.getCnpjOuCpf();
  $scope.escolherCnpjOuCpf = SumarioExecutivo.escolherCnpjOuCpf();

  ionic.on('$locationChangeSuccess', function(){
    $scope.init();
  })

  /*ionic.on('$locationChangeStart', function(){
    $scope.init();
  })*/

  $scope.init = function(){
    //$rootScope.verificarSeUsuarioEstaLogado();
    console.log($rootScope.planoDeNegocioMontado.sumarioExecutivo);

      $scope.sumarioExecutivo._id = $rootScope.planoDeNegocioMontado.sumarioExecutivo._id;
      $scope.sumarioExecutivoID._id = $rootScope.planoDeNegocioMontado.sumarioExecutivo._id;

      $scope.sumarioExecutivo.dadosDoemprendimento = $rootScope.planoDeNegocioMontado.sumarioExecutivo.dadosDoemprendimento;
      $scope.sumarioExecutivo.principaisPontos = $rootScope.planoDeNegocioMontado.sumarioExecutivo.principaisPontos;
      $scope.sumarioExecutivo.missaoDaEmpresa = $rootScope.planoDeNegocioMontado.sumarioExecutivo.missaoDaEmpresa;

      if($scope.sumarioExecutivo.dadosDoemprendimento.cpf == undefined){
        $scope.escolherCnpjOuCpf = true;
      }else{
        $scope.escolherCnpjOuCpf = false;
      }

      $scope.sumarioExecutivo.formaJuridica = $rootScope.planoDeNegocioMontado.sumarioExecutivo.formaJuridica;
      $scope.sumarioExecutivo.optantePeloSimples = $rootScope.planoDeNegocioMontado.sumarioExecutivo.optantePeloSimples;
      $scope.sumarioExecutivo.fontesDeRecursos = $rootScope.planoDeNegocioMontado.sumarioExecutivo.fontesDeRecursos;
      recuperarSubitens();

  }

  $scope.atualizarPagina = function(){
    $scope.sumarioExecutivo._id = undefined;
    $scope.init();
    $scope.$broadcast('scroll.refreshComplete');
  }


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
      $scope.socio.idUsuario = $rootScope.usuario._id;
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
    var pos = $scope.sumarioExecutivoID.idsSocios.indexOf(socio._id);
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
    $scope.sumarioExecutivoID.formaJuridica = $scope.sumarioExecutivo.formaJuridica;
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
        $scope.bancoDeDados.atualizar(caminho, objeto);
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
      $scope.sumarioExecutivoID.idsSocios.push(dados.data._id);
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
          $scope.sumarioExecutivoID.idsSocios.push(dado._id);
        });
        console.log($scope.sumarioExecutivo.socios);
      });
    });
  };

  //Recuperação de dados
  var arrayPromessasSocios = [];


  recuperarSocios = function(){
    arrayPromessasSocios= [];
    $scope.sumarioExecutivo.socios = [];
    $scope.sumarioExecutivoID.idsSocios = [];
    var objeto = {};
    $rootScope.planoDeNegocioMontado.sumarioExecutivo.idsSocios.forEach(function(dadoId){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/socio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto._id = dadoId;
      arrayPromessasSocios.push(BancoDeDados.recuperarComId(caminho, objeto));
    });
    qAllSocio();
  }


  qAllSocio = function(){
    $q.all(arrayPromessasSocios).then(function(dados){
      console.log(dados);
      dados.forEach(function (dado){
        console.log(dado.data[0]);
        $scope.sumarioExecutivo.socios.push(dado.data[0]);
        $scope.sumarioExecutivoID.idsSocios.push(dado.data[0]._id);
      });
    });
  }


  recuperarSubitens = function(){

      $ionicLoading.show({
        template: 'Carregando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 1000
      }).then(function(){
        recuperarSocios();
      });

  };


});
