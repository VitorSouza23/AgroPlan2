function SumarioExecutivo(){
  this.principaisPontos;
  this.socios = new Array();
  this.dadosDoemprendimento = new DadosDoEmprendimento();
  this.missaoDaEmpresa;
  this.fomaJuridica;
  this.optantePeloSimples;
  this.fontesDeRecursos;

  this.addSocio = function(socio){
    this.socios.push(socio);
  };

  this.removerSocio = function(socio){
    var pos = this.socios.indexOf(socio);
    this.socios.splice(pos,1);
  };

  this.editarSocio = function(socio){
    var pos = this.socios.indexOf(socio);
    this.socios[pos] = socio;
  }
};

function Socio(){
  this.nome;
  this.endereco;
  this.cidade;
  this.estado;
  this.telefone;
  this.perfil;
};

function DadosDoEmprendimento(){
  this.nome;
  this.cnpj;
  this.cpf;
};
