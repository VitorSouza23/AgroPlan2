angular.module('starter.services.plano-de-negocios', ['starter.services.utilitarios'])

.service('ServicoPlanoDeNegocio', function(BancoDeDados, $rootScope, $q) {

  return{
    salvarPlanoDeNegocio: function(planoDeNegocio){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoDeNegocio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = planoDeNegocio;
      var novoPlano;
      objeto.idUsuario = $rootScope.usuario._id;
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
      var fornecedores = {};
      var concorrentes = {};
      var cliente = {};

      var avaliacaoDoPlano = {};

      var avaliacaoEstrategica = {};

      var construcaoDeCenarios = {};

      var planoDeMarketing = {};
      var produtos = {};
      var localizacao = {};

      var planoFinanceiro = {};
      var equipamentos = {};
      var maquinas = {};
      var moveis = {};
      var utensilios = {};
      var veiculos = {};
      var vendas = {};
      var compras = {};

      var planoOperacional = {};
      var cargos = {};

      var roteiroDeInformacao = {};

      var sumarioExecutivo = {};
      var socios = {};

      //analiseDeMercado
      if(planoDeNegocioID.analiseMercadoID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/analiseMercado?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.analiseMercadoID;
        analiseDeMercado = BancoDeDados.recuperarComId(caminho, objeto);
      }


      /*planoDeNegocioMontado.analiseMercado.idsFornecedores.forEach(function(dados){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/fornecedores?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = dados;
      BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
      planoDeNegocioMontado.analiseMercado.fornecedores.push(dados.data);
    });
  });*/

  /*planoDeNegocioMontado.analiseMercado.idsConcorrentes.forEach(function(dados){
  caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/concorrente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
  objeto = dados;
  BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
  planoDeNegocioMontado.analiseMercado.concorrentes.push(dados.data);
});
});*/

/*caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/cliente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
objeto = planoDeNegocioMontado.analiseMercado.idCliente;
BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
planoDeNegocioMontado.analiseMercado.cliente = dados.data;
});*/

//avaliacaoDoPlano
if(planoDeNegocioID.analiseMercadoID != undefined){
  caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoPlano?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
  objeto = planoDeNegocioID.avaliacaoPlanoID;
  avaliacaoDoPlano = BancoDeDados.recuperarComId(caminho, objeto);
}
//avaliacaoEstrategica
if(planoDeNegocioID.analiseMercadoID != undefined){
  caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoEstrategica?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
  objeto = planoDeNegocioID.avaliacaoEstrategicaID;
  avaliacaoEstrategica = BancoDeDados.recuperarComId(caminho, objeto);
}
//construcaoDeCenarios
if(planoDeNegocioID.analiseMercadoID != undefined){
  caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/construcaoCenario?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
  objeto = planoDeNegocioID.construcaoCenariosID;
  construcaoDeCenarios = BancoDeDados.recuperarComId(caminho, objeto);
}
//planoDeMarketing
if(planoDeNegocioID.analiseMercadoID != undefined){
  caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoMarketing?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
  objeto = planoDeNegocioID.planoDeMarketingID;
  planoDeMarketingID = BancoDeDados.recuperarComId(caminho, objeto);
}
/*planoDeNegocioMontado.planoDeMarketing.idsProdutos.forEach(function(dados){
caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/produto?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
objeto = dados;
BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
planoDeNegocioMontado.planoDeMarketing.produtos.push(dados.data);
});
});*/

/*caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/localizacao?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
objeto = planoDeNegocioMontado.planoDeMarketing.idLocalizacao;
BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
planoDeNegocioMontado.planoDeMarketing.localizacao = dados.data;
});*/

//planoFinanceiro
if(planoDeNegocioID.analiseMercadoID != undefined){
  caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoFinanceiro?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
  objeto = planoDeNegocioID.planoFinanceiroID;
  planoFinanceiro = BancoDeDados.recuperarComId(caminho, objeto);
}
/*planoDeNegocioMontado.planoFinanceiro.idsEquipamentos.forEach(function(dados){
caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/equipamento?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
objeto = dados;
BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
planoDeNegocioMontado.planoFinanceiro.equipamentos.push(dados.data);
});
});

planoDeNegocioMontado.planoFinanceiro.idsMaquinas.forEach(function(dados){
caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/maquina?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
objeto = dados;
BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
planoDeNegocioMontado.planoFinanceiro.maquinas.push(dados.data);
});
});

planoDeNegocioMontado.planoFinanceiro.idsMoveis.forEach(function(dados){
caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/movel?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
objeto = dados;
BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
planoDeNegocioMontado.planoFinanceiro.moveis.push(dados.data);
});
});

planoDeNegocioMontado.planoFinanceiro.idsUtensilios.forEach(function(dados){
caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/utensilio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
objeto = dados;
BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
planoDeNegocioMontado.planoFinanceiro.utensilios.push(dados.data);
});
});

planoDeNegocioMontado.planoFinanceiro.idsVeiculos.forEach(function(dados){
caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/veiculo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
objeto = dados;
BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
planoDeNegocioMontado.planoFinanceiro.veiculos.push(dados.data);
});
});

planoDeNegocioMontado.planoFinanceiro.idsCompras.forEach(function(dados){
caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/compra?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
objeto = dados;
BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
planoDeNegocioMontado.planoFinanceiro.compras.push(dados.data);
});
});

planoDeNegocioMontado.planoFinanceiro.idsVendas.forEach(function(dados){
caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/venda?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
objeto = dados;
BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
planoDeNegocioMontado.planoFinanceiro.vendas.push(dados.data);
});
});*/

//planoOperacinal
if(planoDeNegocioID.analiseMercadoID != undefined){
  caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoOperacional?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
  objeto = planoDeNegocioID.planoOperacionalID;
  planoOperacional = BancoDeDados.recuperarComId(caminho, objeto);
}
/*planoDeNegocioMontado.planoOperacional.idsCargos.forEach(function(dados){
caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/cargos?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
objeto = dados;
BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
planoDeNegocioMontado.planoOperacional.cargos.push(dados.data);
});
});*/

//roteiroDeInformacao
if(planoDeNegocioID.analiseMercadoID != undefined){
  caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/roteiroInformacao?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
  objeto = planoDeNegocioID.roteiroDeInformacaoID;
  roteiroDeInformacao = BancoDeDados.recuperarComId(caminho, objeto);
}
//sumarioExecutivo
if(planoDeNegocioID.analiseMercadoID != undefined){
  caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/sumarioExecutivo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
  objeto = planoDeNegocioID.sumarioExecutivoID;
  sumarioExecutivo = BancoDeDados.recuperarComId(caminho, objeto);
}
/*planoDeNegocioMontado.sumarioExecutivo.idsSocios.forEach(function(dados){
caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/socio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
objeto = dados;
BancoDeDados.recuperarComId(caminho, objeto).then(function(dados){
planoDeNegocioMontado.sumarioExecutivo.socio.push(dados.data);
});
});
console.log(planoDeNegocioMontado);*/

$q.all([analiseDeMercado, avaliacaoDoPlano, avaliacaoEstrategica, construcaoDeCenarios,
  planoDeMarketing, planoFinanceiro, planoOperacional, roteiroDeInformacao,
  sumarioExecutivo]).then(function(dados){
    console.log(dados);
    planoDeNegocioMontado.analiseDeMercado = dados[0];
    planoDeNegocioMontado.avaliacaoDoPlano = dados[1];
    planoDeNegocioMontado.avaliacaoEstrategica = dados[2];
    planoDeNegocioMontado.construcaoDeCenarios = dados[3];
    planoDeNegocioMontado.planoDeMarketing = dados[4];
    planoDeNegocioMontado.planoFinanceiro = dados[5];
    planoDeNegocioMontado.planoOperacional = dados[6];
    planoDeNegocioMontado.roteiroDeInformacao = dados[7];
    planoDeNegocioMontado.sumarioExecutivo = dados[8];
  })


  return planoDeNegocioMontado;
}
}
});
