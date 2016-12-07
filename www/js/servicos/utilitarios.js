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
    http.put(caminho+objeto._id, objeto).then(function(dados){
      deffered.resolve(dados);
    }),function(dados){
      deffered.reject(dados + "erro!");
    }
    return deffered.promise;
  };

  var remover = function(caminho, objeto){
    deffered = $q.defer();
    http.delete(caminho+objeto._id).then(function(dados){
      deffered.resolve(dados);
    }),function(dados){
      deffered.reject(dados + "erro!");
    }
    return deffered.promise;
  };

  var pesquisar = function(caminho, parametro){
    deffered = $q.defer();
    $http.get(caminho, {cache : false, params: {par:parametro}}).then(function(dados){
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
    pesquisar:pesquisar

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
.factory('Menu', function($ionicActionSheet, $timeout, $state, $ionicHistory){
  var mostrarMenuArmazenamento = false;
  var mostrarMenusTab = true;
  var show = function() {

    // Show the action sheet
    var menu = $ionicActionSheet.show({
      buttons: [
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

        }else if(index === 1){
          $state.go('login', {}, { reload: true,
            inherit: false,
            notify: true });
          }else if(index === 2){
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
