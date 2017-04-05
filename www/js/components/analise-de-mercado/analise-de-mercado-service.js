/* global angular */

angular.module('starter.services.analiseDeMercado', [])
        .service('AnaliseDeMercado', function () {
            this.editar = false;
            this.reordenar = false;
            this.analiseDeMercado = new AnaliseDeMercado();

            this.getEditar = function () {
                return this.editar;
            };

            this.setEditar = function (e) {
                this.editar = e;
            };

            this.getReordenar = function () {
                return this.reordenar;
            };

            this.setReordenar = function (r) {
                this.reordenar = r;
            };

            this.getAnaliseDeMercado = function () {
                return this.analiseDeMercado;
            };

            this.setAnaliseDeMercado = function (analiseDeMercado) {
                this.analiseDeMercado = analiseDeMercado;
            };

            this.novaAnaliseDeMercado = function () {
                return new AnaliseDeMercado();
            };
        })

        .service('Fornecedor', function () {
            this.fornecedor = new Fornecedor();

            this.getFornecedor = function () {
                return this.fornecedor;
            };

            this.setFornecedor = function (fornecedor) {
                this.fornecedor = fornecedor;
            };

            this.novoFornecedor = function () {
                return this.fornecedor = new Fornecedor();
            };
        })

        .service('Concorrente', function () {
            this.concorrente = new Concorrente();

            this.getConcorrente = function () {
                return this.concorrente;
            };

            this.setConcorrente = function (concorrente) {
                this.concorrente = concorrente;
            };

            this.novoConcorrente = function () {
                return this.concorrente = new Concorrente();
            };
        })

        .factory('AnaliseDeMercadoID', function () {
            var _id;
            var idCliente;
            var idsFornecedores = [];
            var idsConcorrentes = [];
            return{
                _id: _id,
                idCliente: idCliente,
                idsFornecedores: idsFornecedores,
                idsConcorrentes: idsConcorrentes
            };
        })

        .factory('MontadorAnaliseDeMercado', function (AnaliseDeMercado, AnaliseDeMercadoID) {
            return{
                montar: function (analiseDeMercadoAux) {
                    var analiseDeMercado = AnaliseDeMercado.getAnaliseDeMercado();
                    analiseDeMercado._id = analiseDeMercadoAux._id;
                    if(analiseDeMercadoAux.concorrentes !== undefined){
                        analiseDeMercado.concorrentes = analiseDeMercadoAux.concorrentes;
                    }else{
                        analiseDeMercado.concorrentes = [];
                    }
                    if(analiseDeMercadoAux.fornecedores !== undefined){
                        analiseDeMercado.fornecedores = analiseDeMercadoAux.fornecedores;
                    }else{
                        analiseDeMercado.fornecedores = [];
                    }
                    if(analiseDeMercadoAux.cliente !== undefined){
                        analiseDeMercado.novoCliente(analiseDeMercadoAux.cliente);
                    }else{
                        analiseDeMercado.cliente = new Cliente();
                    }
                    return analiseDeMercado;
                },
                montarID: function (analiseDeMercadoAux){
                    var analiseDeMercadoID = AnaliseDeMercadoID;
                    analiseDeMercadoID._id = analiseDeMercadoAux._id;
                    if(analiseDeMercadoAux.idsConcorrentes !== undefined){
                        analiseDeMercadoID.idsConcorrentes = analiseDeMercadoAux.idsConcorrentes;
                    }else{
                        analiseDeMercadoID.idsConcorrentes = [];
                    }
                    if(analiseDeMercadoAux.idsFornecedores !== undefined){
                        analiseDeMercadoID.idsFornecedores = analiseDeMercadoAux.idsFornecedores;
                    }else{
                        analiseDeMercadoID.idsFornecedores = [];
                    }
                    return analiseDeMercadoID;
                }
            };
        });
