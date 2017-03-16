angular.module('starter.controllers.planoDeNegocio', ['starter.services',
'starter.services.plano-de-negocios'])

.controller('PlanoDeNegocioCtrl', function($scope, $state, $rootScope, ServicoPlanoDeNegocio, Modal,
   BancoDeDados, $window, $ionicPopup, $ionicLoading, GeradorPDF) {
  $scope.usuario = $rootScope.usuario;
  $scope.planoDeNegocio;
  $scope.planosDeNegocio = [];
  $scope.editar = false;

  $scope.init = function(){
    //$rootScope.verificarSeUsuarioEstaLogado();
    $scope.recuperTodosOsPlanosPorIdUsuario();
    setTimeout(function(){
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  }
  Modal.init('js/components/plano-de-negocio/subitens/criar-novo-plano.html', $scope).then(function(modal){
    $scope.modalNovoPlanoDeNegocio = modal;
  });
  Modal.init('js/components/plano-de-negocio/subitens/menu-de-opcoes.html', $scope).then(function(modal){
    $scope.modalMenuPlanoDeNegocio = modal;
  });
  $scope.novoPlanoDeNegocio = function(){
    $scope.planoDeNegocio = ServicoPlanoDeNegocio.novoPlanoDeNegocio();
    $scope.modalNovoPlanoDeNegocio.show();
  }
  $scope.criarNovoPlano = function(){
    if($scope.editar){
      var pos = $scope.planosDeNegocio.indexOf($scope.planoDeNegocio);
      $scope.planosDeNegocio[pos] = $scope.planoDeNegocio;
      ServicoPlanoDeNegocio.atualizarPlanoDeNegocio($scope.planoDeNegocio)
      $scope.modalNovoPlanoDeNegocio.hide();
      $scope.editar = false;
    }else{
      console.log($scope.planoDeNegocio);
      $scope.planoDeNegocio.desativado = false;
      esperaParaCriarERecuperarNovoPlano();
      $scope.modalNovoPlanoDeNegocio.hide();

    }

  }
  $scope.editarPlano = function(planoDeNegocio){
    console.log(planoDeNegocio);
    $rootScope.planoDeNegocio = planoDeNegocio;
    ServicoPlanoDeNegocio.remontarPlanoDeNegocio(planoDeNegocio);
    console.log($rootScope.planoDeNegocioMontado);
    $ionicLoading.show({
      template: 'Recuperando Dados... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
      duration: 5000
    }).then(function(){
    setTimeout(function(){
      console.log($rootScope.planoDeNegocio);
      $scope.fecharMenuDeOpcoesDoPlano();
      $state.go('tab.sumarioExecutivo');
    }, 5000);
  });
  }

  $scope.abrirMenuDeOpcoesDoPlano = function(planoDeNegocio){
    $scope.planoDeNegocio = planoDeNegocio;
    $scope.modalMenuPlanoDeNegocio.show();
  }

  $scope.fecharMenuDeOpcoesDoPlano = function(){
    $scope.modalMenuPlanoDeNegocio.hide();
  }

  $scope.excluirPlanoDeNegocio = function(planoDeNegocio){
    showConfirm(planoDeNegocio);
  }

  showConfirm = function(planoDeNegocio) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Excluir Plano de Negócio',
      template: 'Você tem certeza de que deseja excluir permanentemente este Plano de Negócio?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        ServicoPlanoDeNegocio.excluirPlanoDeNegocio(planoDeNegocio);
        $scope.planosDeNegocio.splice($scope.planosDeNegocio.indexOf(planoDeNegocio), 1);
        $scope.modalMenuPlanoDeNegocio.hide();
      }
    });
  };

  $scope.alterarNomeDoPlanoDeNegocio = function(planoDeNegocio){
    $scope.planoDeNegocio = planoDeNegocio;
    $scope.modalNovoPlanoDeNegocio.show();
    $scope.modalMenuPlanoDeNegocio.hide();
    $scope.editar = true;
  }

  $scope.recuperTodosOsPlanosPorIdUsuario = function(){
    caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoDeNegocio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
    BancoDeDados.recuperarComIdUsuario(caminho, $rootScope.usuario).then(function(dados){
      console.log(dados.data);
      $scope.planosDeNegocio = dados.data;
    });
  }

  esperaParaCriarERecuperarNovoPlano = function(){
    $ionicLoading.show({
      template: 'Criando Novo Plano... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
      duration: 3000
    }).then(function(){
      setTimeout(function(){
        var novoPlano = new PlanoDeNegocio();
        novoPlano.idUsuario = $rootScope.usuario._id;
        novoPlano.nome = $scope.planoDeNegocio.nome;
        ServicoPlanoDeNegocio.salvarPlanoDeNegocio(novoPlano);
      }, 2000);

      setTimeout(function(){
        $scope.recuperTodosOsPlanosPorIdUsuario();
      }, 1000);
    });

    $scope.hide = function(){
      $ionicLoading.hide();
    };
  }



  $scope.sair = function(){
    $rootScope.usuario = null;
    $rootScope.isLogin = false;
    $window.location.reload(true)
    $state.go('login', {}, { reload: true,
      inherit: false,
      notify: true });
    }


    $scope.gerarPDF = function(){
      GeradorPDF.criarPDF($scope.planoDeNegocio.nome);
    }
  });
