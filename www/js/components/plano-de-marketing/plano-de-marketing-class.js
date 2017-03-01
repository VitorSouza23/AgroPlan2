function PlanoDeMarketing(){
  this._id;
  this.produtos = [];
  this.estrategiasPromocionais;
  this.estruturaDeComercializacao;
  this.localizacaoDoNegocio = new LocalizacaoDoNegocio();
  this.desativado = false;

  this.addProduto = function(produto){
    this.produtos.push(produto);
  };

  this.removerProduto = function(produto){
    var pos = this.produtos.indexOf(produto);
    this.produtos.splice(pos,1);
  };

  this.editarProduto = function(produto){
    var pos = this.produtos.indexOf(produto);
    this.produtos[pos] = produto;
  }
}

function Produto(){
  this._id;
  this.nome;
  this.cicloDeProducao;
  this.preco;
  this.idUsuario;
  this.desativado = false;
}

function LocalizacaoDoNegocio(){
  this._id;
  this.endereco;
  this.bairro;
  this.cidade;
  this.estado;
  this.telefone;
  this.consideracoes;
  this.desativado = false;
}
