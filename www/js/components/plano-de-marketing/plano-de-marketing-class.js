function PlanoDeMarketing(){
  this.produtos = [];
  this.estrategiasPromocionais;
  this.estruturaDeComercializacao;
  this.localizacaoDoNegocio = new LocalizacaoDoNegocio();

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
}

function LocalizacaoDoNegocio(){
  this.endereco;
  this.bairro;
  this.cidade;
  this.estado;
  this.telefone;
  this.consideracoes;
}
