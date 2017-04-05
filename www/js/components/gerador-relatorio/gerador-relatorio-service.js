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
                                {text: planoDeNegocio.nome, style: 'tituloCapa'},
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
                                    style: 'colunasCapa'
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
                                // Fim da Análise de Mercado ---------------------------------------- //

                                // Começo do Plano de Marketing ---------------------------------------- //
                                {text: 'Plano de Marketing', style: 'titulo', alignment: 'center'},
                                {text: 'Produtos', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Nome: ' + planoPDF.planoDeMarketing.produtos[0].nome, style: 'valoresTabela'},
                                        {text: 'Ciclo de Produção: ' + planoPDF.planoDeMarketing.produtos[0].cicloDeProducao, style: 'valoresTabela'},
                                        {text: 'Preço: ' + planoPDF.planoDeMarketing.produtos[0].preco, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Estratégias e Estruturas', style: 'subtitulo'},
                                {text: 'Estratégias Promocionais: ' + planoPDF.planoDeMarketing.estrategiasPromocionais, style: 'valores'},
                                {text: 'Estrutura de Comercialização: ' + planoPDF.planoDeMarketing.estruturaDeComercializacao, style: 'valores'},
                                {text: 'Estudo da Localização', style: 'subtitulo'},
                                {text: 'Endereço: ' + planoPDF.planoDeMarketing.localizacaoDoNegocio.endereco, style: 'valores'},
                                {text: 'Bairro: ' + planoPDF.planoDeMarketing.localizacaoDoNegocio.bairro, style: 'valores'},
                                {text: 'Cidade: ' + planoPDF.planoDeMarketing.localizacaoDoNegocio.cidade, style: 'valores'},
                                {text: 'Estado: ' + planoPDF.planoDeMarketing.localizacaoDoNegocio.estado, style: 'valores'},
                                {text: 'Telefone: ' + planoPDF.planoDeMarketing.localizacaoDoNegocio.telefone, style: 'valores'},
                                {text: 'Considerações: ' + planoPDF.planoDeMarketing.localizacaoDoNegocio.consideracoes, style: 'valores', pageBreak: 'after'},
                                // Fim do Plano de Marketing ---------------------------------------- //

                                // Começo do Plano Operacional ---------------------------------------- //
                                {text: 'Plano Operacional', style: 'titulo', alignment: 'center'},
                                {text: 'Layout Físico', style: 'subtitulo'},
                                {text: 'Dados de Capacidade', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Capacidade Produtiva: ' + planoPDF.planoOperacional.capacidadeProdutiva, style: 'valoresTabela'},
                                        {text: 'Capacidade Comercial: ' + planoPDF.planoOperacional.capacidadeComercial, style: 'valoresTabela'},
                                        {text: 'Capacidade Produtiva Inicial: ' + planoPDF.planoOperacional.capacidadeComercialInicial, style: 'valoresTabela'},
                                        {text: 'Capacidade Comercial Inicial: ' + planoPDF.planoOperacional.capacidadeComercialInicial, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Processos Operacionais', style: 'subtitulo'},
                                {text: planoPDF.planoOperacional.processosOperacionais, style: 'valores'},
                                {text: 'Cargos Disponíveis', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Nome: ' + planoPDF.planoOperacional.cargos[0].nome, style: 'valoresTabela'},
                                        {text: 'Qualificações: ' + planoPDF.planoOperacional.cargos[0].qualificacoes, style: 'valoresTabela', pageBreak: 'after'}
                                    ]
                                },
                                // Fim do Plano de Marketing ---------------------------------------- //

                                // Começo do Plano Financeiro ---------------------------------------- //
                                {text: 'Plano Financeiro', style: 'titulo', alignment: 'center'},
                                {text: 'Equipamentos', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Descrição: ' + planoPDF.planoFinanceiro.estoqueInicial.equipamentos[0].descricao, style: 'valoresTabela'},
                                        {text: 'Quantidade: ' + planoPDF.planoFinanceiro.estoqueInicial.equipamentos[0].quantidade, style: 'valoresTabela'},
                                        {text: 'Valor Unitário: ' + planoPDF.planoFinanceiro.estoqueInicial.equipamentos[0].valorUnitario, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Máquinas', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Descrição: ' + planoPDF.planoFinanceiro.estoqueInicial.maquinas[0].descricao, style: 'valoresTabela'},
                                        {text: 'Quantidade: ' + planoPDF.planoFinanceiro.estoqueInicial.maquinas[0].quantidade, style: 'valoresTabela'},
                                        {text: 'Valor Unitário: ' + planoPDF.planoFinanceiro.estoqueInicial.maquinas[0].valorUnitario, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Móveis', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Descrição: ' + planoPDF.planoFinanceiro.estoqueInicial.moveis[0].descricao, style: 'valoresTabela'},
                                        {text: 'Quantidade: ' + planoPDF.planoFinanceiro.estoqueInicial.moveis[0].quantidade, style: 'valoresTabela'},
                                        {text: 'Valor Unitário: ' + planoPDF.planoFinanceiro.estoqueInicial.moveis[0].valorUnitario, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Utensílios', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Descrição: ' + planoPDF.planoFinanceiro.estoqueInicial.utensilios[0].descricao, style: 'valoresTabela'},
                                        {text: 'Quantidade: '  + planoPDF.planoFinanceiro.estoqueInicial.utensilios[0].quantidade, style: 'valoresTabela'},
                                        {text: 'Valor Unitário: ' + planoPDF.planoFinanceiro.estoqueInicial.utensilios[0].valorUnitario, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Veículos', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Descrição: ' + planoPDF.planoFinanceiro.estoqueInicial.veiculos[0].descricao, style: 'valoresTabela'},
                                        {text: 'Quantidade: ' + planoPDF.planoFinanceiro.estoqueInicial.veiculos[0].quantidade, style: 'valoresTabela'},
                                        {text: 'Valor Unitário: ' + planoPDF.planoFinanceiro.estoqueInicial.veiculos[0].valorUnitario, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Compras', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Dias de prazo de pagamento: ' + planoPDF.planoFinanceiro.compras[0].dias, style: 'valoresTabela'},
                                        {text: 'Porcentagem de compras com esse prazo: ' + planoPDF.planoFinanceiro.compras[0].porcentagem + ' %', style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Vendas', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Dias de prazo de pagamento: ' + planoPDF.planoFinanceiro.vendas[0].dias, style: 'valoresTabela'},
                                        {text: 'Porcentagem de vendas com esse prazo: ' + planoPDF.planoFinanceiro.vendas[0].porcentagem + ' %', style: 'valoresTabela', pageBreak: 'after'}
                                    ]
                                },
                                // Fim do Plano Financeiro ---------------------------------------- //

                                // Começo da Construção de Cenários ---------------------------------------- //
                                {text: 'Construção de Cenários', style: 'titulo', alignment: 'center'},
                                {text: 'Cenário Provável', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Receita Total: ' + planoPDF.construcaoDeCenarios.provavel.receitaTotal, style: 'valoresTabela'},
                                        {text: 'Custos Variáveis Totais: ' + planoPDF.construcaoDeCenarios.provavel.custosVariaveisTotais, style: 'valoresTabela'},
                                        {text: 'Imposto sobre venda: ' + planoPDF.construcaoDeCenarios.provavel.impostoSobreVenda, style: 'valoresTabela'},
                                        {text: 'Gastos com vendas: ' + planoPDF.construcaoDeCenarios.provavel.gastoComVenda, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Subtotal', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Margem de Contribuição: ' + planoPDF.construcaoDeCenarios.provavel.margemDeContribuicao, style: 'valoresTabela'},
                                        {text: 'Custo Fixo Total: ' + planoPDF.construcaoDeCenarios.provavel.custoFixoTotal, style: 'valoresTabela'},
                                        {text: 'Lucro/Prejuízo Operacional: ' + planoPDF.construcaoDeCenarios.provavel.lucroPrejuizoOperacional, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Cenário Pessimista', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Receita Total: ' + planoPDF.construcaoDeCenarios.pessimista.receitaTotal, style: 'valoresTabela'},
                                        {text: 'Custos Variáveis Totais: ' + planoPDF.construcaoDeCenarios.pessimista.custosVariaveisTotais, style: 'valoresTabela'},
                                        {text: 'Imposto sobre venda: ' + planoPDF.construcaoDeCenarios.pessimista.impostoSobreVenda, style: 'valoresTabela'},
                                        {text: 'Gastos com vendas: ' + planoPDF.construcaoDeCenarios.pessimista.gastoComvenda, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Subtotal', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Margem de Contribuição: ' + planoPDF.construcaoDeCenarios.pessimista.margemDeContribuicao, style: 'valoresTabela'},
                                        {text: 'Custo Fixo Total: ' + planoPDF.construcaoDeCenarios.pessimista.custoFixoTotal, style: 'valoresTabela'},
                                        {text: 'Lucro/Prejuízo Operacional: ' + planoPDF.construcaoDeCenarios.pessimista.lucroPrejuisoOperacional, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Cenário Otimista', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Receita Total: ' + planoPDF.construcaoDeCenarios.otimista.receitaTotal, style: 'valoresTabela'},
                                        {text: 'Custos Variáveis Totais: ' + planoPDF.construcaoDeCenarios.otimista.custosVariaveisTotais, style: 'valoresTabela'},
                                        {text: 'Imposto sobre venda: ' + planoPDF.construcaoDeCenarios.otimista.impostoSobreVenda, style: 'valoresTabela'},
                                        {text: 'Gastos com vendas: ' + planoPDF.construcaoDeCenarios.otimista.gastoComVenda, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Subtotal', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Margem de Contribuição: ' + planoPDF.construcaoDeCenarios.otimista.margemDeContribuicao, style: 'valoresTabela'},
                                        {text: 'Custo Fixo Total: ' + planoPDF.construcaoDeCenarios.otimista.custoFixoTotal, style: 'valoresTabela'},
                                        {text: 'Lucro/Prejuízo Operacional: ' + planoPDF.construcaoDeCenarios.otimista.lucroPrejuisoOperacional, style: 'valoresTabela', pageBreak: 'after'}
                                    ]
                                },
                                // Fim da Construção de Cenários ---------------------------------------- //

                                // Começo da Análise FOFA ---------------------------------------- //
                                {text: 'Análise FOFA', style: 'titulo', alignment: 'center'},
                                {text: 'Ambiente Interno', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Forças: ', style: 'valoresTabela'},
                                        {text: 'Fraquezas: ', style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Ambiente Externo', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Oportunidades: ', style: 'valoresTabela'},
                                        {text: 'Ameaças: ', style: 'valoresTabela', pageBreak: 'after'}
                                    ]
                                },
                                // Fim da Análise FOFA ---------------------------------------- //

                                // Começo do Roteiro para Coleta  ---------------------------------------- //
                                {text: 'Roteiro para Coleta de Informações', style: 'titulo', alignment: 'center'},
                                {text: 'Sumário Executivo', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'O que?: ', style: 'valoresTabela'},
                                        {text: 'Onde?: ', style: 'valoresTabela'},
                                        {text: 'Quando?: ', style: 'valoresTabela'},
                                        {text: 'Quem?: ', style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Análise de Mercado', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'O que?: ', style: 'valoresTabela'},
                                        {text: 'Onde?: ', style: 'valoresTabela'},
                                        {text: 'Quando?: ', style: 'valoresTabela'},
                                        {text: 'Quem?: ', style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Plano de Marketing', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'O que?: ', style: 'valoresTabela'},
                                        {text: 'Onde?: ', style: 'valoresTabela'},
                                        {text: 'Quando?: ', style: 'valoresTabela'},
                                        {text: 'Quem?: ', style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Plano Operacional', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'O que?: ', style: 'valoresTabela'},
                                        {text: 'Onde?: ', style: 'valoresTabela'},
                                        {text: 'Quando?: ', style: 'valoresTabela'},
                                        {text: 'Quem?: ', style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Plano Financeiro', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'O que?: ', style: 'valoresTabela'},
                                        {text: 'Onde?: ', style: 'valoresTabela'},
                                        {text: 'Quando?: ', style: 'valoresTabela'},
                                        {text: 'Quem?: ', style: 'valoresTabela', pageBreak: 'after'}
                                    ]
                                },
                                // Fim do Roteiro para Coleta  ---------------------------------------- //

                                // Começo da Avaliação do plano  ---------------------------------------- //
                                {text: 'Avaliação do Plano de Negócio', style: 'titulo', alignment: 'center'},
                                {text: ' ', style: 'valores'}



                            ],
                            styles: {
                                tituloCapa: {
                                    fontSize: 40,
                                    bold: true,
                                    margin: [0, 300, 0, 0],
                                    alignment: 'center'
                                },
                                colunasCapa: {
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
