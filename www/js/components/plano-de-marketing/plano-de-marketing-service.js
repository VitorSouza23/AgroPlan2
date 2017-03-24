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
        });
