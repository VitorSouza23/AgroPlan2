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
        })

        .factory('MonstadorPlanoOperacional', function (PlanoOperacional, PlanoOperacionalID) {
            return{
                montar: function (planoOperacionalAux) {
                    var planoOperacional = PlanoOperacional.getPlanoOperacional();
                    planoOperacional._id = planoOperacionalAux._id;
                    if (planoOperacionalAux.capacidadeProdutiva !== undefined) {
                        planoOperacional.capacidadeProdutiva = planoOperacionalAux.capacidadeProdutiva;
                    }else{
                        planoOperacional.capacidadeProdutiva = '';
                    }
                    if (planoOperacionalAux.capacidadeComercial !== undefined) {
                        planoOperacional.capacidadeComercial = planoOperacionalAux.capacidadeComercial;
                    }else{
                        planoOperacional.capacidadeComercial = '';
                    }
                    if (planoOperacionalAux.capacidadeProdutivaInicial !== undefined) {
                        planoOperacional.capacidadeProdutivaInicial = planoOperacionalAux.capacidadeProdutivaInicial;
                    }else{
                        planoOperacional.capacidadeProdutivaInicial = '';
                    }
                    if (planoOperacionalAux.capacidadeComercialInicial !== undefined) {
                        planoOperacional.capacidadeComercialInicial = planoOperacionalAux.capacidadeComercialInicial;
                    }else{
                        planoOperacional.capacidadeComercialInicial = '';
                    }
                    if (planoOperacionalAux.processosOperacionais !== undefined) {
                        planoOperacional.processosOperacionais = planoOperacionalAux.processosOperacionais;
                    }else{
                        planoOperacional.processosOperacionais = '';
                    }
                    if (planoOperacionalAux.layout !== undefined) {
                        planoOperacional.layout = planoOperacionalAux.layout;
                    }else{
                        planoOperacional.layout = {};
                    }
                    if (planoOperacionalAux.cargos !== undefined) {
                        planoOperacional.cargos = planoOperacionalAux.cargos;
                    }else{
                        planoOperacional.cargos = [];
                    }

                    return planoOperacional;
                },
                montarID: function (planoOperacionalAux) {
                    var planoOperacionalID = PlanoOperacionalID;
                    planoOperacionalID._id = planoOperacionalAux._id;
                    if (planoOperacionalAux.idImagem !== {} || planoOperacionalAux.idImagem !== undefined) {
                        planoOperacionalID.idImagem = planoOperacionalAux.idImagem;
                    }else{
                        planoOperacionalID.idImagem = {};
                    }
                    if (planoOperacionalAux.idsCargos !== undefined) {
                        planoOperacionalID.idsCargos = planoOperacionalAux.idsCargos;
                    }else{
                        planoOperacionalID.idsCargos = [];
                    }

                    return planoOperacionalID;
                }
            };
        });
