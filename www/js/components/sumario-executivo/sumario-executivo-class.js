function SumarioExecutivo(){
  this._id;
  this.principaisPontos;
  this.socios = [];
  this.dadosDoemprendimento = new DadosDoEmprendimento();
  this.missaoDaEmpresa;
  this.fomaJuridica;
  this.optantePeloSimples;
  this.fontesDeRecursos;
  this.desativado = false;

  this.adicionarSocio = function(socio){
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
  this._id;
  this.nome;
  this.endereco;
  this.cidade;
  this.estado;
  this.telefone;
  this.perfil;
  this.idUsuario;
  this.desativado = false;
};

function DadosDoEmprendimento(){
  this.nome;
  this.cnpj;
  this.cpf;
  this.desativado = false;
};
