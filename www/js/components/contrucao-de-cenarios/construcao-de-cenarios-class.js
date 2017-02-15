function ConstrucaoDeCenario(){
  this.provavel = new Cenario();
  this.pessimsita = new Cenario();
  this.otimista = new Cenario();
  this.desativado = false;
}

function Cenario(){
  this.receitaTotal;
  this.custoVariaveisTotais;
  this.custoComMateriais;
  this.impostoSobreVenda;
  this.gastoComVenda;
  this.margemDeContribuicao;
  this.custoFixoTotal;
  this.lucroPrejuisoOperacional;
  this.desativado = false;
}
