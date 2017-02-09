angular.module('starter.services.plano-de-negocios', [])

.service('ServicoPlanoDeNegocio', function() {
  this.planoDeNegocio = {};
  return{
    adicionarAnaliseDeMercado: function(analiseDeMercado){
      this.planoDeNegocio.analiseDeMercado = analiseDeMercado;
    },
    adicionarAvaliacaoDoPlano: function(avaliacaoDoPlano){
      this.planoDeNegocio.avaliacaoDoPlano = avaliacaoDoPlano;
    },
    adicionarAvaliacaoEstrategica: function(avaliacaoEstrategica){
      this.planosDeNegocio.avaliacaoEstrategica = avaliacaoEstrategica;
    },
    adicionarContrucaoDeCenarios: function(construcaoDeCenarios){
      this.planoDeNegocio.construcaoDeCenarios = construcaoDeCenarios;
    },
    adicionarPlanoDeMarketing: function(planodeMarketing){
      this.planodeDeNegocio.planodeMarketing = planodeMarketing;
    },
    adicionarPlanoOperacional: function(planoOperacional){
      this.planoDeNegocio.planoOperacional = planoOperacional;
    },
    adicionarPlanoFinanceiro: function(planoFinanaceiro){
      this.planoDeNegocio.planoFinanaceiro = planoFinanaceiro;
    },
    adicionarRoteiroDeInformacao: function(roteiroDeInformacao){
      this.planoDeNegocio.roteiroDeInformacao = roteiroDeInformacao;
    },
    adicionarSumarioExecutivo: function(sumarioExecutivo){
      this.planoDeNegocio.sumarioExecutivo = sumarioExecutivo;
    }
  }
});
