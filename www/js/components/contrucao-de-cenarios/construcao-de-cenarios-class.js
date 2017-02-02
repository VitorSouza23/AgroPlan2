function ConstrucaoDeCenario(){
  this.provavel = new Cenario();
  this.pessimsita = new Cenario();
  this.otimista = new Cenario();
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
}
