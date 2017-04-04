/* global angular */

angular.module('starter.services.sumarioExecutivo', [])
        .service('SumarioExecutivo', function () {
            this.editar = false;
            this.cnpjOuCpf = false;
            this.reordenar = false;
            this.sumarioExecutivo = new SumarioExecutivo();

            this.escolherCnpjOuCpf = function () {
                this.cnpjOuCpf = !this.cnpjOuCpf;
            };

            this.getCnpjOuCpf = function () {
                return this.cnpjOuCpf;
            };

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

            this.getSumarioExecutivo = function () {
                return this.sumarioExecutivo;
            };
            this.setSumarioExecutivio = function (sumarioExecutivo) {
                this.sumarioExecutivo = sumarioExecutivo;
            };


        })

        .service('Socio', function () {
            this.socio = new Socio();

            this.getSocio = function () {
                return this.socio;
            };

            this.setSocio = function (socio) {
                this.socio = socio;
            };

            this.novoSocio = function () {
                return this.socio = new Socio();
            };

        })

        .factory('SumarioExecutivoID', function () {
            var principaisPontos;
            var dadosDoemprendimento;
            var missaoDaEmpresa;
            var formaJuridica;
            var optantePeloSimples;
            var fontesDeRecursos;
            var idsSocios = [];
            var _id;
            return{
                principaisPontos: principaisPontos,
                dadosDoemprendimento: dadosDoemprendimento,
                missaoDaEmpresa: missaoDaEmpresa,
                formaJuridica: formaJuridica,
                optantePeloSimples: optantePeloSimples,
                fontesDeRecursos: fontesDeRecursos,
                idsSocios: idsSocios,
                _id: _id
            };
        })

        .factory('MontadorSumarioExecutivo', function (SumarioExecutivo, SumarioExecutivoID) {
            return{
                montar: function (sumarioExecutivoAux) {
                    var sumarioExecutivo = SumarioExecutivo.getSumarioExecutivo();
                    sumarioExecutivo._id = sumarioExecutivoAux._id;

                    if (sumarioExecutivoAux.dadosDoemprendimento !== undefined) {
                        sumarioExecutivo.dadosDoemprendimento = sumarioExecutivoAux.dadosDoemprendimento;
                    }else{
                        sumarioExecutivo.dadosDoemprendimento = '';
                    }
                    if (sumarioExecutivoAux.principaisPontos !== undefined) {
                        sumarioExecutivo.principaisPontos = sumarioExecutivoAux.principaisPontos;
                    }else{
                        sumarioExecutivo.principaisPontos = '';
                    }
                    if (sumarioExecutivoAux.missaoDaEmpresa !== undefined) {
                        sumarioExecutivo.missaoDaEmpresa = sumarioExecutivoAux.missaoDaEmpresa;
                    }else{
                        sumarioExecutivo.missaoDaEmpresa = '';
                    }
                    if (sumarioExecutivoAux.formaJuridica !== undefined) {
                        sumarioExecutivo.formaJuridica = sumarioExecutivoAux.formaJuridica;
                    }else{
                        sumarioExecutivo.formaJuridica = '';
                    }
                    if (sumarioExecutivoAux.optantePeloSimples !== undefined) {
                        sumarioExecutivo.optantePeloSimples = sumarioExecutivoAux.optantePeloSimples;
                    }else{
                        sumarioExecutivo.optantePeloSimples = '';
                    }
                    if (sumarioExecutivoAux.fontesDeRecursos !== undefined) {
                        sumarioExecutivo.fontesDeRecursos = sumarioExecutivoAux.fontesDeRecursos;
                    }else{
                        sumarioExecutivo.fontesDeRecursos = '';
                    }
                    if (sumarioExecutivoAux.socios !== undefined) {
                        sumarioExecutivo.socios = sumarioExecutivoAux.socios;
                    }else{
                        sumarioExecutivo.socios = '';
                    }
                    return sumarioExecutivo;
                },
                montarID: function (sumarioExecutivoAux) {
                    var sumarioExecutivoID = SumarioExecutivoID;
                    sumarioExecutivoID._id = sumarioExecutivoAux._id;
                    if(sumarioExecutivoAux.idSocios !== undefined){
                        sumarioExecutivoID.idsSocios = sumarioExecutivoAux.idSocios;
                    }
                    return sumarioExecutivoID;
                }
            }
        });
