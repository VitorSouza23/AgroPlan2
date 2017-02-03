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
      console.log(dados);
      usuarios = dados.data;
      $rootScope.usuario = null;
      usuarios.forEach(function (usuario){
        if(usuario.cpf == $scope.usuario.cpf && $scope.usuario.senha == usuario.senha){
          $rootScope.usuario = $scope.usuario;
          $rootScope.isLogin = true;

        }
      });
      if($rootScope.usuario != null){
        $ionicPopup.alert({
          title: 'Bem Vindo!',
          template: 'Seja bem vindo dono do CPF: ' + $rootScope.usuario.cpf + " !"
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


.controller('CadastroCtrl', function($scope, Modal, ServicoLogin, $ionicHistory, ServicoLogin, $ionicPopup) {
  $scope.novoUsuario = {};
  Modal.init('js/components/tela-de-login/subitens/cadastro.html', $scope).then(function(modal){
    $scope.modalCadastro = modal;
    console.log($scope.modalCadastro);
  });

  $scope.abrirTela = function() {
    $scope.modalCadastro.show();
  };

  $scope.cadastrarUsuario = function(){
    ServicoLogin.cadastrarUsuario($scope.novoUsuario).then(function(dados){
      $scope.modalCadastro.hide();
      $ionicPopup.alert({
        title: 'Novo Usuário Cadastrado!',
        template: 'Seja bem vindo dono do CPF: ' + dados.data.cpf + " !"
      });
    });
  }

});
