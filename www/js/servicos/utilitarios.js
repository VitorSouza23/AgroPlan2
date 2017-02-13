angular.module('starter.services.utilitarios', [])

.factory('BancoDeDados', function($http, $q){

  var salvar = function(caminho, objeto){
    deffered = $q.defer();
    $http.post(caminho, objeto)
    .then(function(dados){
      deffered.resolve(dados);
    }
    ,function(dados){
      deffered.reject(dados + "erro!");
    });

    return deffered.promise;
  };

  var salvarArray = function(caminho, array){
    var promessas = [];
    var promessa;

    array.forEach(function(objeto){
      promessa = $http.post(caminho, objeto);
      promessas.push(promessa);
    });

    return $q.all(promessas);
  };

  var recuperar = function(caminho){
    deffered = $q.defer();
    $http.get(caminho, {cache : true}).then(function(dados){
      deffered.resolve(dados);
    }),function(dados){
      deffered.reject(dados + "erro!");
    }
    return deffered.promise;
  };

  var atualizar = function(caminho, objeto){
    deffered = $q.defer();
    jsonString = JSON.stringify({_id:objeto._id});
    console.log(caminho + "&q="+jsonString);
    $http.put(caminho + "&q="+jsonString, objeto).then(function(dados){
      deffered.resolve(dados);
    }),function(dados){
      deffered.reject(dados + "erro!");
    }
    return deffered.promise;
  };

  var remover = function(caminho, objeto){
    deffered = $q.defer();
    jsonString = JSON.stringify({_id:objeto._id});
    console.log(caminho + "&q="+jsonString);
    $http.delete(caminho + "&q="+jsonString).then(function(dados){
      deffered.resolve(dados);
    }),function(dados){
      deffered.reject(dados + "erro!");
    }
    return deffered.promise;
  };

  var pesquisarUsuario = function(caminho, usuario){
    deffered = $q.defer();
    jsonString = JSON.stringify({cpf: usuario.cpf, senha: usuario.senha});
    //console.log(usuario);
    //console.log(jsonString);
    //$http.get(caminho, {cache : false, params: {cpf:usuario.cpf, senha:usuario.senha}}).then(function(dados){
    $http({
      method:'GET',
      url: caminho + "&q="+jsonString,
      cache: false,
    }).then(function(dados){
      console.log(dados);
      deffered.resolve(dados);
    },function(dados){
      deffered.reject(dados + "erro!");
    })
    return deffered.promise;
  };

  var pesquisarCPFCadastrado = function(caminho, usuario){
    //console.log(usuario);
    deffered = $q.defer();
    jsonString = JSON.stringify({cpf: usuario.cpf});
    $http({
      method:'GET',
      url: caminho + "&q="+jsonString,
      cache: false,
    }).then(function(dados){
      deffered.resolve(dados);
      //console.log(dados);

    },function(dados){
      deffered.reject(dados + "erro!");
    });
    return deffered.promise;
  };

  var recuperarComIdUsuario = function(caminho, usuario){
    deffered = $q.defer();
    jsonString = JSON.stringify({idUsuario: usuario._id.$oid});
    $http.get(caminho + "&q="+jsonString, {cache : true}).then(function(dados){
      deffered.resolve(dados);
    }),function(dados){
      deffered.reject(dados + "erro!");
    }
    return deffered.promise;
  };

  return{
    salvar:salvar,
    salvarArray:salvarArray,
    recuperar:recuperar,
    atualizar:atualizar,
    remover:remover,
    pesquisarUsuario:pesquisarUsuario,
    pesquisarCPFCadastrado:pesquisarCPFCadastrado,
    recuperarComIdUsuario:recuperarComIdUsuario
  }

})

.factory('Modal', function($ionicModal, $rootScope){
  var init = function(caminho, $scope){
    $scope = $scope || $rootScope.$new();
    var promise = $ionicModal.fromTemplateUrl(caminho, {
      scope: $scope
    }).then(function(resposta) {
      $scope.modal = resposta;
      return resposta;
    });

    return promise;
  };


  return{
    init:init
  }
})

.factory('Menu', function($ionicActionSheet, $timeout, $state, $ionicHistory, $rootScope, $window){
  var mostrarMenuArmazenamento = false;
  var mostrarMenusTab = true;
  var show = function() {

    // Show the action sheet
    var menu = $ionicActionSheet.show({
      buttons: [
        {text: 'Sobre o projeto'},
        {text: 'Configurações'},
        {text: 'Sair'},
        {text: 'Voltar'}
      ],
      titleText: 'Opções',
      cancelText: 'Cancelar',
      cancel: function() {

      },
      buttonClicked: function(index) {
        if(index === 0){
          $state.go('sobreProjeto', {}, { reload: true,
            inherit: false,
            notify: true });

        }else if(index === 2){
          $rootScope.usuario = null;
          $rootScope.isLogin = false;
          $window.location.reload(true)
          $state.go('login', {}, { reload: true,
            inherit: false,
            notify: true });
          }else if(index === 3){
            mostrarMenusTab = true;
            mostrarMenuArmazenamento = false;
            /*$state.transitionTo('tab.sumarioExecutivo', {}, { reload: true,
            inherit: false,
            notify: true });
            $state.reload();*/
            $ionicHistory.goBack();
          }
          return true;
        }
      });


      // For example's sake, hide the sheet after two seconds
      $timeout(function() {
        menu();
      }, 10000);

    };

    var getMostrarMenuArmazenamento = function(){
      return mostrarMenuArmazenamento;
    }

    var getMostrarMenusTab = function(){
      return mostrarMenusTab;
    }

    return{
      show:show,
      getMostrarMenusTab:getMostrarMenusTab,
      getMostrarMenuArmazenamento:getMostrarMenuArmazenamento
    }
  })
  ;
