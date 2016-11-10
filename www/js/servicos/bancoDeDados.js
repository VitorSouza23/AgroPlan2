angular.module('starter.services.bancoDeDados', [])

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

  return{
    salvar:salvar,
    salvarArray:salvarArray
  }

});
