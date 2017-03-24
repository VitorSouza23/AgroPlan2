/* global angular */

angular.module('starter.services.roteiroParaColeta', [])
        .service('RoteiroParaColeta', function () {
            this.editar = false;
            this.reordenar = false;
            this.roteiroParaColeta = new RoteiroParaColeta();

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

            this.getRoteiroParaColeta = function () {
                return this.roteiroParaColeta;
            };
            this.setRoteiroParaColeta = function (roteiroParaColeta) {
                this.roteiroParaColeta = roteiroParaColeta;
            };
        });
