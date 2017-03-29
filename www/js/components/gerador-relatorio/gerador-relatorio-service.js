/* global angular, pdfMake, LocalFileSystem, gotFSforRead, binaryArray */

angular.module('starter.services.gerador-relatorio', ['starter.services.plano-de-negocios', 'starter.services.utilitarios'])
        .factory('GeradorDeRelatorio', function ($cordovaPrinter, ServicoPlanoDeNegocio, $rootScope
                , RecuperarPartes, $q) {

            var binaryArray = null;
            var currentfileEntry = null;
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
                        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
                    });
                }
                // });
            };

            function fail(error) {
                alert(error.code);
            };

            function gotFS(fileSystem) {
                var fileName = "your-file.pdf";
                fileSystem.root.getFile(fileName, {
                    create: true,
                    exclusive: false
                }, gotFileEntry, fail);
            }

            function gotFileEntry(fileEntry) {
                currentfileEntry = fileEntry;
                fileEntry.createWriter(gotFileWriter, fail);
            }

            function gotFileWriter(writer) {
                writer.onwrite = function (evt) {
                    var downloading = false;
                    alert("The file was written successfully");
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
                };
                writer.write(binaryArray);
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
