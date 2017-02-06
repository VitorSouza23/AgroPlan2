angular.module('starter.controllers.login', ['starter.services','starter.services.utilitarios', 'starter.services.login'])

.controller('LoginCtrl', function($scope, ServicoLogin, $ionicPopup, $state, $rootScope) {
  $scope.usuario = new Usuario;

  $scope.init = function(){
    $scope.usuario = {};
    $rootScope.usuario = null;
    $rootScope.isLogin = false;
  }

  $scope.enter = function(evt){
    if(evt.which === 13){
      $scope.login();
    }
  }

  $scope.login = function(){
    ServicoLogin.fazerLogin($scope.usuario).then(function(dados){
      //console.log(dados);
      usuario = dados.data[0];
      //console.log(usuario);
      $rootScope.usuario = null;

        if(usuario != null){
          $rootScope.usuario = usuario;
          $rootScope.isLogin = true;
        }

      if($rootScope.usuario != null){
        $ionicPopup.alert({
          title: 'Bem Vindo!',
          template: 'Seja bem vindo ' + $rootScope.usuario.nome + "! \n" + 'CPF: ' + $rootScope.usuario.cpf
        });
        $state.go('tab.sumarioExecutivo');
      }else{
        var alertPopup = $ionicPopup.alert({
          title: 'Falha no Login!',
          template: 'Por favor, corrija os campos incorretos!'
        });
      }

    });
  }
})


.controller('CadastroCtrl', function($scope, Modal, ServicoLogin, $ionicHistory, $ionicPopup) {
  $scope.novoUsuario = {};
  $scope.senhaAConfirmar = {};
  Modal.init('js/components/tela-de-login/subitens/cadastro.html', $scope).then(function(modal){
    $scope.modalCadastro = modal;
    console.log($scope.modalCadastro);
  });

  $scope.abrirTela = function() {
    $scope.modalCadastro.show();
  };

  $scope.cadastrarUsuario = function(){
    //console.log($scope.novoUsuario.senha);
    //console.log($scope.senhaAConfirmar.senha);
    if(!angular.equals($scope.novoUsuario.senha,$scope.senhaAConfirmar.senha)){
      $ionicPopup.alert({
        title: 'As senhas não são iguais!',
        template: 'Por favor, corrija sua senha.'
      });
    }else if(ServicoLogin.verificarCPFJaCadastrado($scope.novoUsuario.cpf)){
      $ionicPopup.alert({
        title: 'Este CPF já está cadastrado no sisitema!',
        template: 'Por favor, coloque outro CPF.'
      });
    }else{
      ServicoLogin.cadastrarUsuario($scope.novoUsuario).then(function(dados){
        $scope.modalCadastro.hide();
        $ionicPopup.alert({
          title: 'Novo Usuário Cadastrado!',
          template: 'Seja bem vindo ' + dados.data.nome + "! \n" + 'CPF: ' + dados.data.cpf
        });
      });
    }

  }

});
