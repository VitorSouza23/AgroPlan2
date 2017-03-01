angular.module('starter.services.plano-de-negocios', ['starter.services.utilitarios'])

.service('ServicoPlanoDeNegocio', function(BancoDeDados, $rootScope, $q) {

  return{
    salvarPlanoDeNegocio: function(planoDeNegocio){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoDeNegocio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = planoDeNegocio;
      var novoPlano;
      BancoDeDados.salvar(caminho, objeto).then(function(dados){
        console.log(dados.data);
        novoPlano = dados.data;
      })
      return novoPlano;
    },

    atualizarPlanoDeNegocio: function(planoDeNegocio){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoDeNegocio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = planoDeNegocio;
      BancoDeDados.atualizar(caminho, objeto).then(function(dados){
        console.log(dados.data);
      })
    },

    excluirPlanoDeNegocio: function(planoDeNegocio){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoDeNegocio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = planoDeNegocio;
      BancoDeDados.remover(caminho, objeto).then(function(dados){
        console.log(dados.data);
      })
    },

    novoPlanoDeNegocio: function(){
      return new PlanoDeNegocio();
    },

    remontarPlanoDeNegocio: function(planoDeNegocioID){
      console.log(planoDeNegocioID);
      var planoDeNegocioMontado = {};
      var caminho, objeto;

      var analiseDeMercado = {};
      var fornecedores = [];
      var concorrentes = [];
      var cliente = {};

      var avaliacaoDoPlano = {};

      var avaliacaoEstrategica = {};

      var construcaoDeCenarios = {};

      var planoDeMarketing = {};
      var produtos = [];
      var localizacao = {};

      var planoFinanceiro = {};
      var equipamentos = [];
      var maquinas = [];
      var moveis = [];
      var utensilios = [];
      var veiculos = [];
      var vendas = [];
      var compras = [];

      var planoOperacional = {};
      var cargos = [];

      var roteiroDeInformacao = {};

      var sumarioExecutivo = {};
      var socios = [];

      //analiseDeMercado
      if(planoDeNegocioID.analiseDeMercadoID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/analiseMercado?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.analiseDeMercadoID;
        analiseDeMercado = BancoDeDados.recuperarComId(caminho, objeto);
      }

      //avaliacaoDoPlano
      if(planoDeNegocioID.avaliacaoDoPlanoID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoPlano?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.avaliacaoDoPlanoID;
        avaliacaoDoPlano = BancoDeDados.recuperarComId(caminho, objeto);
      }
      //avaliacaoEstrategica
      if(planoDeNegocioID.avaliacaoEstrategicaID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoEstrategica?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.avaliacaoEstrategicaID;
        avaliacaoEstrategica = BancoDeDados.recuperarComId(caminho, objeto);
      }
      //construcaoDeCenarios
      if(planoDeNegocioID.construcaoDeCenariosID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/construcaoCenario?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.construcaoDeCenariosID;
        construcaoDeCenarios = BancoDeDados.recuperarComId(caminho, objeto);
      }
      //planoDeMarketing
      if(planoDeNegocioID.planoDeMarketingID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoMarketing?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.planoDeMarketingID;
        planoDeMarketing = BancoDeDados.recuperarComId(caminho, objeto);
      }


      //planoFinanceiro
      if(planoDeNegocioID.planoFinanceiroID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoFinanceiro?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.planoFinanceiroID;
        planoFinanceiro = BancoDeDados.recuperarComId(caminho, objeto);
      }

      //planoOperacinal
      if(planoDeNegocioID.planoOperacinalID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoOperacional?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.planoOperacionalID;
        planoOperacional = BancoDeDados.recuperarComId(caminho, objeto);
      }


      //roteiroDeInformacao
      if(planoDeNegocioID.roteiroDeInformacaoID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/roteiroInformacao?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.roteiroDeInformacaoID;
        roteiroDeInformacao = BancoDeDados.recuperarComId(caminho, objeto);
      }
      //sumarioExecutivo
      if(planoDeNegocioID.sumarioExecutivoID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/sumarioExecutivo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.sumarioExecutivoID;
        sumarioExecutivo = BancoDeDados.recuperarComId(caminho, objeto);
      }


      $q.all([analiseDeMercado, avaliacaoDoPlano, avaliacaoEstrategica, construcaoDeCenarios,
        planoDeMarketing, planoFinanceiro, planoOperacional, roteiroDeInformacao,
        sumarioExecutivo]).then(function(dados){
          console.log(dados);
          planoDeNegocioMontado.analiseDeMercado = dados[0].data[0];
          planoDeNegocioMontado.avaliacaoDoPlano = dados[1].data[0];
          planoDeNegocioMontado.avaliacaoEstrategica = dados[2].data[0];
          planoDeNegocioMontado.construcaoDeCenarios = dados[3].data[0];
          planoDeNegocioMontado.planoDeMarketing = dados[4].data[0];
          planoDeNegocioMontado.planoFinanceiro = dados[5].data[0];
          planoDeNegocioMontado.planoOperacional = dados[6].data[0];
          planoDeNegocioMontado.roteiroDeInformacao = dados[7].data[0];
          planoDeNegocioMontado.sumarioExecutivo = dados[8].data[0];
        });


        console.log(planoDeNegocioMontado);


        return planoDeNegocioMontado;
      }
    }
  });
