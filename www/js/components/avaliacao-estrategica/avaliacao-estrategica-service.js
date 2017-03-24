/* global angular */

angular.module('starter.services.avaliacaoEstrategica', [])
        .service('AvaliacaoEstrategica', function () {
            this.editar = false;
            this.reordenar = false;
            this.avaliacaoEstrategica = new AvaliacaoEstrategica();

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

            this.getAvaliacaoEstrategica = function () {
                return this.avaliacaoEstrategica;
            };
            this.setAvaliacaoEstrategica = function (avaliacaoEstrategica) {
                this.avaliacaoEstrategica = avaliacaoEstrategica;
            };
        });
