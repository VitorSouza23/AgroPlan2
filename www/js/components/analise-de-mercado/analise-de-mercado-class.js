function AnaliseDeMercado() {
    this._id;
    this.cliente = new Cliente();
    this.concorrentes = [];
    this.fornecedores = [];
    this.desativado = false;

    this.addConcorrente = function (concorrente) {
        this.concorrentes.push(concorrente);
    };

    this.removerConcorrente = function (concorrente) {
        var pos = this.concorrentes.indexOf(concorrente);
        this.concorrentes.splice(pos, 1);
    };

    this.editarConcorrente = function (concorrente) {
        var pos = this.concorrentes.indexOf(concorrente);
        //concorrente._id = null;
        this.concorrentes[pos] = concorrente;
    };


    this.addFornecedor = function (fornecedor) {
        this.fornecedores.push(fornecedor);
    };


    this.removerFornecedor = function (fornecedor) {
        var pos = this.fornecedores.indexOf(fornecedor);
        this.fornecedores.splice(pos, 1);
    };

    this.editarFornecedor = function (fornecedor) {
        var pos = this.fornecedores.indexOf(fornecedor);
        //fornecedor._id = null;
        this.fornecedores[pos] = fornecedor;
    };


}
;

function Cliente() {
    this._id;
    this.publicoAlvo;
    this.comportamentoDosClientes;
    this.areaDeAbrangencia;
    this.idUsuario;
    this.desativado = false;
}
;

function Concorrente() {
    this._id;
    this.nome;
    this.qualidade;
    this.preco;
    this.condicoesDePagamento;
    this.localizacao;
    this.atendimento;
    this.servicos;
    this.garantias;
    this.observacoes;
    this.idUsuario;
    this.desativado = false;
}
;

function Fornecedor() {
    this._id;
    this.nome;
    this.preco;
    this.condicoesDePagamento;
    this.prazoDeEntrega;
    this.localizacao;
    this.item;
    this.idUsuario;
    this.desativado = false;
}
