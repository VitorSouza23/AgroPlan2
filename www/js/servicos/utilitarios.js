angular.module('starter.services.utilitarios', [])

.factory('BancoDeDados', function($http, $q){
  var deffered = $q.defer();
  var salvar = function(caminho, objeto){
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
    $http.get(caminho).then(function(dados){
      deffered.resolve(dados);
    }),function(dados){
      deffered.reject(dados + "erro!");
    }
    return deffered.promise;
  };

  var atualizar = function(caminho, objeto){
    http.put(caminho+objeto._id, objeto).then(function(dados){
      deffered.resolve(dados);
    }),function(dados){
      deffered.reject(dados + "erro!");
    }
    return deffered.promise;
  };

  var remover = function(caminho, objeto){
    http.delete(caminho+objeto._id).then(function(dados){
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
    atualizar,atualizar,
    remover:remover
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
});
