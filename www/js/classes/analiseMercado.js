function AnaliseDeMercado(){
  this.cliente = new Cliente();
  this.concorrentes = new Array;
  this.fornecedores = new Array;

  this.addConcorrente = function(concorrente){
    this.concorrentes.push(concorrente);
  };

  this.removerConcorrente = function(concorrente){
    var pos = this.concorrentes.indexOf(concorrente);
    this.concorrentes.splice(pos,1);
  };

  this.editarConcorrente = function(concorrente){
    var pos = this.concorrentes.indexOf(concorrente);
    this.concorrentes[pos] = concorrente;
  };


  this.addFornecedor = function(fornecedor){
    this.fornecedores.push(fornecedor);
  };


  this.removerFornecedor = function(fornecedor){
      var pos = this.fornecedores.indexOf(fornecedor);
      this.fornecedores.splice(pos,1);
    };

  this.editarFornecedor = function(fornecedor){
      var pos = this.fornecedores.indexOf(fornecedor);
      this.fornecedores[pos] = fornecedor;
    };


};

function Cliente(){
  this.publicoAlvo;
  this.comportamentoDosClientes;
  this.areaDeAbrangencia;
};

function Concorrente(){
  this.nome;
  this.qualidade;
  this.preco;
  this.condicoesDePagamento;
  this.localizacao;
  this.atendimento;
  this.servicos;
  this.garantias;
  this.observacoes;
};

function Fornecedor(){
  this.nome;
  this.preco;
  this.condicoesDePagamento;
  this.prazoDeEntrega;
  this.localizacao;
  this.item;
}
