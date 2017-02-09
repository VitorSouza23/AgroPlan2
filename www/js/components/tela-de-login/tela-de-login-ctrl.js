angular.module('starter.controllers.login', ['starter.services','starter.services.utilitarios', 'starter.services.login'])

.controller('LoginCtrl', function($scope, ServicoLogin, $ionicPopup, $state, $rootScope) {
  $scope.usuario = {};

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
    if(!angular.equals($scope.usuario, {})){
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
          $state.go('planoDeNegocio');
        }else{
          var alertPopup = $ionicPopup.alert({
            title: 'Falha no Login!',
            template: 'Por favor, corrija os campos incorretos!'
          });
        }
      });
    }else{
      var alertPopup = $ionicPopup.alert({
        title: 'Falha no Login! (Campos Vazios)',
        template: 'Por favor, corrija os campos vazios!'
      });
    }

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

  $scope.cpfExistente = false;

  $scope.cadastrarUsuario = function(){

    //console.log($scope.novoUsuario.senha);
    //console.log($scope.senhaAConfirmar.senha);

    console.log($scope.cpfExistente);
    if(!angular.equals($scope.novoUsuario.senha,$scope.senhaAConfirmar.senha)){
      $ionicPopup.alert({
        title: 'As senhas não são iguais!',
        template: 'Por favor, corrija sua senha.'
      });
    }else if($scope.cpfExistente){
      $ionicPopup.alert({
        title: 'Este CPF já está cadastrado no sisitema!',
        template: 'Por favor, coloque outro CPF.'
      });
    }else if(!validarCPFReceitaFederal($scope.novoUsuario.cpf)){
      $ionicPopup.alert({
        title: 'Este CPF não é valido pela Recieta Federal!',
        template: 'Por favor, corrija o campo "CPF".'
      });
    }else{
      ServicoLogin.cadastrarUsuario($scope.novoUsuario).then(function(dados){
        $scope.modalCadastro.hide();
        $scope.novoUsuario = {};
        $scope.senhaAConfirmar = {};
        console.log(dados.data);
        $ionicPopup.alert({
          title: 'Novo Usuário Cadastrado!',
          template: 'Seja bem vindo ' + dados.data.nome + "! \n" + 'CPF: ' + dados.data.cpf
        });
      });
    }

  }

  $scope.verificarCPF = function(){
    ServicoLogin.verificarCPFJaCadastrado($scope.novoUsuario).then(function(dados){
      //console.log(dados.data);
      if(dados.data.length > 0){
        $scope.cpfExistente = true;
      }else{
        $scope.cpfExistente = false;
      }
    });
    //console.log($scope.cpfExistente);
  }

  validarCPFReceitaFederal = function(cpf){

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
    return false;
    for (i = 0; i < cpf.length - 1; i++)
    if (cpf.charAt(i) != cpf.charAt(i + 1)){
      digitos_iguais = 0;
      break;
    }
    if (!digitos_iguais){
      numeros = cpf.substring(0,9);
      digitos = cpf.substring(9);
      soma = 0;
      for (i = 10; i > 1; i--)
      soma += numeros.charAt(10 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
      return false;
      numeros = cpf.substring(0,10);
      soma = 0;
      for (i = 11; i > 1; i--)
      soma += numeros.charAt(11 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1))
      return false;
      return true;
    }else
    return false;
  }

});
