function RoteiroParaColeta(){
  this.sumarioExecutivo = new Roteiro();
  this.analiseDeMercado = new Roteiro();
  this.planoDeMarketing = new Roteiro();
  this.planoOperacional = new Roteiro();
  this.planoFinanceiro = new Roteiro();
}

function Roteiro(){
  this.atividade;
  this.local;
  this.metodo;
  this.prazo;
  this.responsavel;
}
