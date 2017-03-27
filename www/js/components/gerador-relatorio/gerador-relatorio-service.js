/* global angular */

angular.module('starter.services.gerador-relatorio', ['starter.services.plano-de-negocios', 'starter.services.utilitarios'])
        .factory('GeradorDeRelatorio', function ($cordovaPrinter, ServicoPlanoDeNegocio, $rootScope
                , RecuperarPartes) {
            return{
                gerarRelatorio: function () {
                    console.log($cordovaPrinter);
                    if ($cordovaPrinter.isAvailable()) {
                        $cordovaPrinter.print('js/components/gerador-relatorio/gerador-relatorio-tamplate.html');
                    }
                },
                recuperarPlano: function (planoDeNegocioID) {

                    ServicoPlanoDeNegocio.remontarPlanoDeNegocio(planoDeNegocioID);
                    var planoParaRelatorio;
                    return setTimeout(function () {
                        planoParaRelatorio = $rootScope.planoDeNegocioMontado;
                        planoParaRelatorio.analiseDeMercado = RecuperarPartes.recuperarAnaliseDeMercado($rootScope.planoDeNegocioMontado.analiseDeMercado);
                        planoParaRelatorio.planoDeMarketing = RecuperarPartes.recuperarPlanoDeMarketing($rootScope.planoDeNegocioMontado.planoDeMarketing);
                        planoParaRelatorio.planoFinanceiro = RecuperarPartes.recuperarPlanoFinanceiro($rootScope.planoDeNegocioMontado.planoFinanceiro);
                        planoParaRelatorio.planoOperacional = RecuperarPartes.recuperarPlanoOperacional($rootScope.planoDeNegocioMontado.planoOperacional);
                        planoParaRelatorio.sumarioExecutivo = RecuperarPartes.recuperarSumarioExecutivo($rootScope.planoDeNegocioMontado.sumarioExecutivo);
                        console.log(planoParaRelatorio);
                        return planoParaRelatorio;
                    }, 1000);
                }
            };
        });
