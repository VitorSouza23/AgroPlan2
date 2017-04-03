/* global angular, pdfMake, LocalFileSystem, gotFSforRead, binaryArray */

angular.module('starter.services.gerador-relatorio', ['starter.services.plano-de-negocios', 'starter.services.utilitarios'])
        .factory('GeradorDeRelatorio', function ($cordovaPrinter, ServicoPlanoDeNegocio, $rootScope
                , RecuperarPartes, $q, $ionicLoading) {

            var binaryArray = null;
            var appDirectory = null;
            var dd = null;
            var gerarRelatorioPDF = function (planoDeNegocio) {
                recuperarPlano(planoDeNegocio).then(function (dados) {
                    console.log(dados);
                    var planoPDF = dados;
                    
                    setTimeout(function () {
                        console.log(planoPDF.planoOperacional.layout);
                        dd = {
                            content: [
                                {text: planoDeNegocio.nome, style: 'titulo_capa'},
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
                                },
                                //sumário executivo
                                {text: 'Sumário Executivo', style: 'titulo', alignment: 'center'},
                                {text: 'Dados do Empreendimento', style: 'subtitulo'},
                                {text: 'Nome: ' + planoPDF.sumarioExecutivo.dadosDoemprendimento.nome, style: 'valores'},
                                {text: 'CPF/CNPJ:' + planoPDF.sumarioExecutivo.dadosDoemprendimento.cpf, style: 'valores'},
                                {text: 'Principais Pontos', style: 'subtitulo'},
                                {text: planoPDF.sumarioExecutivo.principaisPontos, style: 'valores'},
                                {text: 'Missão da Empresa: ', style: 'subtitulo'},
                                {text: planoPDF.sumarioExecutivo.missaoDaEmpresa, style: 'valores'},
                                {text: 'Sócios: ', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Nome: ' + planoPDF.sumarioExecutivo.socios[0].nome, style: 'valoresTabela'},
                                        {text: 'Endereço: ' + planoPDF.sumarioExecutivo.socios[0].endereco, style: 'valoresTabela'},
                                        {text: 'Cidade: ' + planoPDF.sumarioExecutivo.socios[0].cidade, style: 'valoresTabela'},
                                        {text: 'Estado: ' + planoPDF.sumarioExecutivo.socios[0].estado, style: 'valoresTabela'},
                                        {text: 'Telefone: ' + planoPDF.sumarioExecutivo.socios[0].telefone, style: 'valoresTabela'},
                                        {text: 'Perfil do Sócio: ' + planoPDF.sumarioExecutivo.socios[0].perfil, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Forma Jurídica: ', style: 'subtitulo'},
                                {text: planoPDF.sumarioExecutivo.formaJuridica, style: 'valores'},
                                {text: 'Enquadramento Tributário: ', style: 'subtitulo'},
                                {text: 'Optante pelo SIMPLES: ' + planoPDF.sumarioExecutivo.optantePeloSimples, style: 'valores'},
                                {text: 'Fontes de Recursos: ', style: 'subtitulo'},
                                {text: planoPDF.sumarioExecutivo.fontesDeRecursos, style: 'valores', pageBreak: 'after'},
                                // Começo da Análise de Mercado ---------------------------------------- //
                                {text: 'Análise de Mercado', style: 'titulo', alignment: 'center'},
                                {text: 'Estudo de Clientes', style: 'subtitulo'},
                                {text: 'Público Alvo: ' + planoPDF.analiseDeMercado.cliente.publicoAlvo, style: 'valores'},
                                {text: 'Comportamento dos Clientes: ' + planoPDF.analiseDeMercado.cliente.comportamentoDosClientes, style: 'valores'},
                                {text: 'Área de Abrangência: ' + planoPDF.analiseDeMercado.cliente.areaDeAbrangencia, style: 'valores'},
                                {text: 'Concorrrentes', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Nome: ' + planoPDF.analiseDeMercado.concorrentes[0].nome, style: 'valoresTabela'},
                                        {text: 'Qualidade: ' + planoPDF.analiseDeMercado.concorrentes[0].qualidade, style: 'valoresTabela'},
                                        {text: 'Preço: ' + planoPDF.analiseDeMercado.concorrentes[0].preco, style: 'valoresTabela'},
                                        {text: 'Condições de Pagamento: ' + planoPDF.analiseDeMercado.concorrentes[0].condicoesDePagamento, style: 'valoresTabela'},
                                        {text: 'Endereço: ' + planoPDF.analiseDeMercado.concorrentes[0].localizacao, style: 'valoresTabela'},
                                        {text: 'Tipo de Atendimento: ' + planoPDF.analiseDeMercado.concorrentes[0].atendimento, style: 'valoresTabela'},
                                        {text: 'Serviços aos Clientes: ' + planoPDF.analiseDeMercado.concorrentes[0].servicos, style: 'valoresTabela'},
                                        {text: 'Garantias Oferecidas: ' + planoPDF.analiseDeMercado.concorrentes[0].garantias, style: 'valoresTabela'},
                                        {text: 'Observações: ' + planoPDF.analiseDeMercado.concorrentes[0].observacoes, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Fornecedores', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Nome: ' + planoPDF.analiseDeMercado.fornecedores[0].nome, style: 'valoresTabela'},
                                        {text: 'Preço: ' + planoPDF.analiseDeMercado.fornecedores[0].preco, style: 'valoresTabela'},
                                        {text: 'Condições de Pagamento: ' + planoPDF.analiseDeMercado.fornecedores[0].condicoesDePagamento, style: 'valoresTabela'},
                                        {text: 'Endereço: ' + planoPDF.analiseDeMercado.fornecedores[0].localizacao, style: 'valoresTabela'},
                                        {text: 'Prazo de Entrega: ' + planoPDF.analiseDeMercado.fornecedores[0].prazoDeEntrega, style: 'valoresTabela'},
                                        {text: 'Item a ser comprado: ' + planoPDF.analiseDeMercado.fornecedores[0].item, style: 'valoresTabela', pageBreak: 'after'}
                                    ]
                                },
                                
                            ],
                            styles: {
                                titulo_capa: {
                                    fontSize: 40,
                                    bold: true,
                                    margin: [0, 300, 0, 0],
                                    alignment: 'center'
                                },
                                colunas_capa: {
                                    margin: [0, 400, 0, 0]
                                },
                                titulo: {
                                    fontSize: 20,
                                    bold: true,
                                    margin: [20, 0, 0, 0],
                                    alignment: 'left'
                                },
                                subtitulo: {
                                    fontSize: 13,
                                    bold: true,
                                    margin: [40, 40, 0, 0],
                                    alignment: 'left'
                                },
                                valores: {
                                    fontSize: 13,
                                    margin: [40, 0, 0, 0],
                                    alignment: 'left'
                                },
                                valoresTabela: {
                                    fontSize: 13,
                                    margin: [26, 5, 0, 0],
                                    alignment: 'left'
                                }
                            }
                        };
                    }, 3000);

                    $ionicLoading.show({
                        template: 'Gerando Relatório... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                        duration: 5000
                    }).then(function () {
                        setTimeout(function () {
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
                        }, 3000);
                    });
                });

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
                        }
                    };
                    writer.truncate(0);
                    console.log("Write success");
                    alert("Saving is successful.");
                }
                ;
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
