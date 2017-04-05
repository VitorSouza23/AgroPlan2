/* global angular */

angular.module('starter.services.planoDeMarketing', [])
        .service('PlanoDeMarketing', function () {
            this.editar = false;
            this.reordenar = false;
            this.planoDeMarketing = new PlanoDeMarketing();

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

            this.getPlanoDeMarketing = function () {
                return this.planoDeMarketing;
            };
            this.setPlanoDeMarketing = function (planoDeMarketing) {
                this.planoDeMarketing = planoDeMarketing;
            };
        })

        .service('Produto', function () {
            this.produto = new Produto();

            this.getProduto = function () {
                return this.produto;
            };

            this.setProduto = function (produto) {
                this.produto = produto;
            };

            this.novoProduto = function () {
                return this.produto = new Produto();
            };
        })

        .factory('PlanoDeMarketingID', function () {
            var _id;
            var estrategiasPromocionais;
            var estruturaDeComercializacao;
            var idsProdutos = [];
            var idLocalizacao;


            return{
                estrategiasPromocionais: estrategiasPromocionais,
                estruturaDeComercializacao: estruturaDeComercializacao,
                idsProdutos: idsProdutos,
                idLocalizacao: idLocalizacao,
                _id: _id
            };
        })
        .factory('MontadorPlanoDeMarketing', function (PlanoDeMarketing, PlanoDeMarketingID) {
            return{
                montar: function (planoDeMarketingAux) {
                    var planoDeMarketing = PlanoDeMarketing.getPlanoDeMarketing();
                    planoDeMarketing._id = planoDeMarketingAux._id;
                    if (planoDeMarketingAux.estrategiasPromocionais !== undefined) {
                        planoDeMarketing.estrategiasPromocionais = planoDeMarketingAux.estrategiasPromocionais;
                    }else{
                        planoDeMarketing.estrategiasPromocionais = '';
                    }
                    if (planoDeMarketingAux.estruturaDeComercializacao !== undefined) {
                        planoDeMarketing.estruturaDeComercializacao = planoDeMarketingAux.estruturaDeComercializacao;
                    }else{
                        planoDeMarketing.estruturaDeComercializacao = '';
                    }
                    if (planoDeMarketingAux.localizacaoDoNegocio !== undefined) {
                        planoDeMarketing.localizacaoDoNegocio = planoDeMarketingAux.localizacaoDoNegocio;
                    }else{
                        planoDeMarketing.localizacaoDoNegocio = new LocalizacaoDoNegocio();
                    }
                    if (planoDeMarketingAux.produtos !== undefined) {
                        planoDeMarketing.produtos = planoDeMarketingAux.produtos;
                    }else{
                        planoDeMarketing.produtos = [];
                    }
                    return planoDeMarketing;
                },
                montarID: function (planoDeMarketingAux) {
                    var planoDeMarketingID = PlanoDeMarketingID;
                    planoDeMarketingID._id = planoDeMarketingAux._id;
                    if (planoDeMarketingAux.idsProdutos !== undefined) {
                        planoDeMarketingID.idsProdutos = planoDeMarketingAux.idsProdutos;
                    }
                    if (planoDeMarketingAux.idLocalizacao !== undefined) {
                        planoDeMarketingID.idLocalizacao = planoDeMarketingAux.idLocalizacao;
                    }
                    return planoDeMarketingID;
                }
            };
        });
