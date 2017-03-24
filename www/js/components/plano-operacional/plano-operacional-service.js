/* global angular */

angular.module('starter.services.planoOperacional', [])
        .service('PlanoOperacional', function () {
            this.editar = false;
            this.reordenar = false;
            this.planoOperacional = new PlanoOperacional();

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

            this.getPlanoOperacional = function () {
                return this.planoOperacional;
            };
            this.setPlanoOperacional = function (planoOperacional) {
                this.planoOperacional = planoOperacional;
            };
        })

        .service('Cargo', function () {
            this.cargo = new Cargo();

            this.getCargo = function () {
                return this.cargo;
            };

            this.setCargo = function (cargo) {
                this.cargo = cargo;
            };

            this.novoCargo = function () {
                return this.cargo = new Cargo();
            };
        })

        .factory('PlanoOperacionalID', function () {
            var capacidadeProdutiva;
            var capacidadeComercial;
            var capacidadeProdutivaInicial;
            var capacidadeComercialInicial;
            var processosOperacionais;
            var idsCargos = [];
            var idImagem;
            var _id;
            return{
                capacidadeProdutiva: capacidadeProdutiva,
                capacidadeComercial: capacidadeComercial,
                capacidadeComercialInicial: capacidadeComercialInicial,
                capacidadeProdutivaInicial: capacidadeProdutivaInicial,
                processosOperacionais: processosOperacionais,
                idsCargos: idsCargos,
                idImagem: idImagem,
                _id: _id
            };
        });
