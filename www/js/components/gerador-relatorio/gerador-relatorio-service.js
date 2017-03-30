/* global angular, pdfMake, LocalFileSystem, gotFSforRead, binaryArray */

angular.module('starter.services.gerador-relatorio', ['starter.services.plano-de-negocios', 'starter.services.utilitarios'])
        .factory('GeradorDeRelatorio', function ($cordovaPrinter, ServicoPlanoDeNegocio, $rootScope
                , RecuperarPartes, $q) {

            var binaryArray = null;
            var appDirectory = null;
            var gerarRelatorioPDF = function (planoDeNegocio) {
                //recuperarPlano(planoDeNegocio).then(function (dados) {
                //console.log(dados);
                // var planoPDF = dados.data;

                var dd = {
                    content: [
                        {text: 'Isso é um Títululo', style: 'titulo_capa'},
                        {columns: [
                                {
                                    width: 'auto',
                                    text: 'CPF: ' + $rootScope.usuario.cpf
                                },
                                {
                                    width: '*',
                                    text: 'Autor: ' + $rootScope.usuario.nome
                                }
                            ],
                            columnGap: 50,
                            style: 'colunas_capa'
                        }
                    ],
                    styles: {
                        titulo_capa: {
                            fontSize: 30,
                            bold: true,
                            margin: [0, 300, 0, 0],
                            alignment: 'center'
                        },
                        colunas_capa: {
                            margin: [0, 400, 0, 0]
                        }
                    }
                };

                //pdfMake.createPdf(dd).open();
                if (!window.cordova) {
                    pdfMake.createPdf(dd).open();

                } else {

                    pdfMake.createPdf(dd).getBuffer(function (buffer) {
                        var utf8 = new Uint8Array(buffer); // Convert to UTF-8...                
                        binaryArray = utf8.buffer; // Convert to Binary...
                        window.requestFileSystem(LocalFileSystem.PERSISTENT, 1, function (fileSys) {
                            fileSys.root.getDirectory('AgroPlanPDF', {create: true, exclusive: false}, function (directory) {
                                appDirectory = directory;
                                console.log("App directory initialized.");
                            }, fail);
                        }, fail);
                        save(binaryArray, "Test.pdf");
                    });
                }
                // });
            };

            function save(data, savefile) {
                var html = savefile;
                appDirectory.getFile(html, {create: true, exclusive: false}, function (fileEntry) {
                    fileEntry.createWriter(win, fail);
                }, fail);

                function win(writer) {
                    writer.onwriteend = function (evt) {
                        if (writer.length === 0) {
                            writer.write(data);
                        } else {
                        }
                    };
                    writer.truncate(0);
                    console.log("Write success");
                    alert("Saving is successful.");
                };
            }
            
            function fail(error) {
                alert("Writer Error: " + error.code);
            }



            var gerarRelatorio = function () {
                console.log($cordovaPrinter);
                if ($cordovaPrinter.isAvailable()) {
                    $cordovaPrinter.print('js/components/gerador-relatorio/gerador-relatorio-tamplate.html');
                }
            };

            var recuperarPlano = function (planoDeNegocioID) {
                ServicoPlanoDeNegocio.remontarPlanoDeNegocio(planoDeNegocioID);
                var planoParaRelatorio;
                var defered = $q.defer();
                setTimeout(function () {
                    planoParaRelatorio = $rootScope.planoDeNegocioMontado;
                    planoParaRelatorio.analiseDeMercado = RecuperarPartes.recuperarAnaliseDeMercado($rootScope.planoDeNegocioMontado.analiseDeMercado);
                    planoParaRelatorio.planoDeMarketing = RecuperarPartes.recuperarPlanoDeMarketing($rootScope.planoDeNegocioMontado.planoDeMarketing);
                    planoParaRelatorio.planoFinanceiro = RecuperarPartes.recuperarPlanoFinanceiro($rootScope.planoDeNegocioMontado.planoFinanceiro);
                    planoParaRelatorio.planoOperacional = RecuperarPartes.recuperarPlanoOperacional($rootScope.planoDeNegocioMontado.planoOperacional);
                    planoParaRelatorio.sumarioExecutivo = RecuperarPartes.recuperarSumarioExecutivo($rootScope.planoDeNegocioMontado.sumarioExecutivo);
                    console.log(planoParaRelatorio);
                    defered.resolve(planoParaRelatorio);
                }, 1000);
                return defered.promise;
            };
            return{
                gerarRelatorio: gerarRelatorio,
                gerarRelatorioPDF: gerarRelatorioPDF
            };
        }
        );
