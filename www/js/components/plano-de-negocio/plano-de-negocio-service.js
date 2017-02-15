angular.module('starter.services.plano-de-negocios', [])

.service('ServicoPlanoDeNegocio', function() {

  return{
    novoPlanoDeNegocio: function(){
      return new PlanoDeNegocio();
    }
  }
});
