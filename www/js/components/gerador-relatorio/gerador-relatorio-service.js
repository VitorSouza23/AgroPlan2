/* global angular, pdfMake, LocalFileSystem, gotFSforRead, binaryArray */

angular.module('starter.services.gerador-relatorio', ['starter.services.plano-de-negocios', 'starter.services.utilitarios'])
        .factory('GeradorDeRelatorio', function ($cordovaPrinter, ServicoPlanoDeNegocio, $rootScope
                , RecuperarPartes, $q, $ionicLoading, $cordovaFile) {

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
                            info: {
                                title: planoDeNegocio.nome
                            },
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
                                    ul: formatarSocios(planoPDF.sumarioExecutivo.socios)
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
                                    ul: formatarConcorrentes(planoPDF.analiseDeMercado.concorrentes)
                                },
                                {text: 'Fornecedores', style: 'subtitulo'},
                                {
                                    ul: formatarFornecedores(planoPDF.analiseDeMercado.fornecedores)
                                },
                                // Fim da Análise de Mercado ---------------------------------------- //

                                // Começo do Plano de Marketing ---------------------------------------- //
                                {text: 'Plano de Marketing', style: 'titulo', alignment: 'center'},
                                {text: 'Produtos', style: 'subtitulo'},
                                {
                                    ul: formatarProdutos(planoPDF.planoDeMarketing.produtos)
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
                                    ul: formatarCargos(planoPDF.planoOperacional.cargos)
                                },
                                {text: '', pageBreak: 'after'},
                                // Fim do Plano de Marketing ---------------------------------------- //

                                // Começo do Plano Financeiro ---------------------------------------- //
                                {text: 'Plano Financeiro', style: 'titulo', alignment: 'center'},
                                {text: 'Equipamentos', style: 'subtitulo'},
                                {
                                    ul: formatarItensFinanceiro(planoPDF.planoFinanceiro.estoqueInicial.equipamentos)
                                },
                                {text: 'Máquinas', style: 'subtitulo'},
                                {
                                    ul: formatarItensFinanceiro(planoPDF.planoFinanceiro.estoqueInicial.maquinas)
                                },
                                {text: 'Móveis', style: 'subtitulo'},
                                {
                                    ul: formatarItensFinanceiro(planoPDF.planoFinanceiro.estoqueInicial.moveis)
                                },
                                {text: 'Utensílios', style: 'subtitulo'},
                                {
                                    ul: formatarItensFinanceiro(planoPDF.planoFinanceiro.estoqueInicial.utensilios)
                                },
                                {text: 'Veículos', style: 'subtitulo'},
                                {
                                    ul: formatarItensFinanceiro(planoPDF.planoFinanceiro.estoqueInicial.veiculos)
                                },
                                {text: 'Compras', style: 'subtitulo'},
                                {
                                    ul: formatarCompras(planoPDF.planoFinanceiro.compras)
                                },
                                {text: 'Vendas', style: 'subtitulo'},
                                {
                                    ul: formatarVendas(planoPDF.planoFinanceiro.vendas)
                                },
                                {text: '', pageBreak: 'after'},
                                // Fim do Plano Financeiro ---------------------------------------- //

                                // Começo da Construção de Cenários ---------------------------------------- //
                                {text: 'Construção de Cenários', style: 'titulo', alignment: 'center'},
                                {text: 'Cenário Provável', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Receita Total: ' + planoPDF.construcaoDeCenarios.provavel.receitaTotal, style: 'valoresTabela'},
                                        {text: 'Custos Variáveis Totais: ' + planoPDF.construcaoDeCenarios.provavel.custoVariaveisTotais, style: 'valoresTabela'},
                                        {text: 'Imposto sobre venda: ' + planoPDF.construcaoDeCenarios.provavel.impostoSobreVenda, style: 'valoresTabela'},
                                        {text: 'Gastos com vendas: ' + planoPDF.construcaoDeCenarios.provavel.gastoComVenda, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Subtotal', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Margem de Contribuição: ' + planoPDF.construcaoDeCenarios.provavel.margemDeContribuicao, style: 'valoresTabela'},
                                        {text: 'Custo Fixo Total: ' + planoPDF.construcaoDeCenarios.provavel.custoFixoTotal, style: 'valoresTabela'},
                                        {text: 'Lucro/Prejuízo Operacional: ' + planoPDF.construcaoDeCenarios.provavel.lucroPrejuisoOperacional, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Cenário Pessimista', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Receita Total: ' + planoPDF.construcaoDeCenarios.pessimista.receitaTotal, style: 'valoresTabela'},
                                        {text: 'Custos Variáveis Totais: ' + planoPDF.construcaoDeCenarios.pessimista.custoVariaveisTotais, style: 'valoresTabela'},
                                        {text: 'Imposto sobre venda: ' + planoPDF.construcaoDeCenarios.pessimista.impostoSobreVenda, style: 'valoresTabela'},
                                        {text: 'Gastos com vendas: ' + planoPDF.construcaoDeCenarios.pessimista.gastoComVenda, style: 'valoresTabela'}
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
                                        {text: 'Custos Variáveis Totais: ' + planoPDF.construcaoDeCenarios.otimista.custoVariaveisTotais, style: 'valoresTabela'},
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
                                        {text: 'Forças: ' + planoPDF.avaliacaoEstrategica.forca, style: 'valoresTabela'},
                                        {text: 'Fraquezas: ' + planoPDF.avaliacaoEstrategica.fraquesa, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Ambiente Externo', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'Oportunidades: ' + planoPDF.avaliacaoEstrategica.oportunidade, style: 'valoresTabela'},
                                        {text: 'Ameaças: ' + planoPDF.avaliacaoEstrategica.ameaca, style: 'valoresTabela', pageBreak: 'after'}
                                    ]
                                },
                                // Fim da Análise FOFA ---------------------------------------- //

                                // Começo do Roteiro para Coleta  ---------------------------------------- //
                                {text: 'Roteiro para Coleta de Informações', style: 'titulo', alignment: 'center'},
                                {text: 'Sumário Executivo', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'O que?: ' + planoPDF.roteiroDeInformacao.sumarioExecutivo.atividade, style: 'valoresTabela'},
                                        {text: 'Onde?: ' + planoPDF.roteiroDeInformacao.sumarioExecutivo.local, style: 'valoresTabela'},
                                        {text: 'Quando?: ' + planoPDF.roteiroDeInformacao.sumarioExecutivo.prazo, style: 'valoresTabela'},
                                        {text: 'Quem?: ' + planoPDF.roteiroDeInformacao.sumarioExecutivo.responsavel, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Análise de Mercado', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'O que?: ' + planoPDF.roteiroDeInformacao.analiseDeMercado.atividade, style: 'valoresTabela'},
                                        {text: 'Onde?: ' + planoPDF.roteiroDeInformacao.analiseDeMercado.local, style: 'valoresTabela'},
                                        {text: 'Quando?: ' + planoPDF.roteiroDeInformacao.analiseDeMercado.prazo, style: 'valoresTabela'},
                                        {text: 'Quem?: ' + planoPDF.roteiroDeInformacao.analiseDeMercado.responsavel, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Plano de Marketing', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'O que?: ' + planoPDF.roteiroDeInformacao.planoDeMarketing.atividade, style: 'valoresTabela'},
                                        {text: 'Onde?: ' + planoPDF.roteiroDeInformacao.planoDeMarketing.local, style: 'valoresTabela'},
                                        {text: 'Quando?: ' + planoPDF.roteiroDeInformacao.planoDeMarketing.prazo, style: 'valoresTabela'},
                                        {text: 'Quem?: ' + planoPDF.roteiroDeInformacao.planoDeMarketing.responsavel, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Plano Operacional', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'O que?: ' + planoPDF.roteiroDeInformacao.planoOperacional.atividade, style: 'valoresTabela'},
                                        {text: 'Onde?: ' + planoPDF.roteiroDeInformacao.planoOperacional.local, style: 'valoresTabela'},
                                        {text: 'Quando?: ' + planoPDF.roteiroDeInformacao.planoOperacional.prazo, style: 'valoresTabela'},
                                        {text: 'Quem?: ' + planoPDF.roteiroDeInformacao.planoOperacional.responsavel, style: 'valoresTabela'}
                                    ]
                                },
                                {text: 'Plano Financeiro', style: 'subtitulo'},
                                {
                                    ul: [
                                        {text: 'O que?: ' + planoPDF.roteiroDeInformacao.planoFinanceiro.atividade, style: 'valoresTabela'},
                                        {text: 'Onde?: ' + planoPDF.roteiroDeInformacao.planoFinanceiro.local, style: 'valoresTabela'},
                                        {text: 'Quando?: ' + planoPDF.roteiroDeInformacao.planoFinanceiro.prazo, style: 'valoresTabela'},
                                        {text: 'Quem?: ' + planoPDF.roteiroDeInformacao.planoFinanceiro.responsavel, style: 'valoresTabela', pageBreak: 'after'}
                                    ]
                                },
                                // Fim do Roteiro para Coleta  ---------------------------------------- //

                                // Começo da Avaliação do plano  ---------------------------------------- //
                                {text: 'Avaliação do Plano de Negócio', style: 'titulo', alignment: 'center'},
                                {text: planoPDF.avaliacaoDoPlano.avaliacao, style: 'valores'}



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

                    function formatarSocios(socios) {
                        var listaSocios = [];
                        socios.forEach(function (socio) {
                            listaSocios.push({text: 'Nome: ' + socio.nome, style: 'valoresTabela'},
                            {text: 'Endereço: ' + socio.endereco, style: 'valoresTabela'},
                            {text: 'Cidade: ' + socio.cidade, style: 'valoresTabela'},
                            {text: 'Estado: ' + socio.estado, style: 'valoresTabela'},
                            {text: 'Telefone: ' + socio.telefone, style: 'valoresTabela'},
                            {text: 'Perfil do Sócio: ' + socio.perfil, style: 'valoresTabela'},
                            {text: '', style: 'valoresTabela'});
                        });
                        return listaSocios;
                    }

                    function formatarConcorrentes(concorrentes) {
                        var listaConcorrentes = [];
                        concorrentes.forEach(function (concorrente) {
                            listaConcorrentes.push({text: 'Nome: ' + concorrente.nome, style: 'valoresTabela'},
                            {text: 'Qualidade: ' + concorrente.qualidade, style: 'valoresTabela'},
                            {text: 'Preço: ' + concorrente.preco, style: 'valoresTabela'},
                            {text: 'Condições de Pagamento: ' + concorrente.condicoesDePagamento, style: 'valoresTabela'},
                            {text: 'Endereço: ' + concorrente.localizacao, style: 'valoresTabela'},
                            {text: 'Tipo de Atendimento: ' + concorrente.atendimento, style: 'valoresTabela'},
                            {text: 'Serviços aos Clientes: ' + concorrente.servicos, style: 'valoresTabela'},
                            {text: 'Garantias Oferecidas: ' + concorrente.garantias, style: 'valoresTabela'},
                            {text: 'Observações: ' + concorrente.observacoes, style: 'valoresTabela'});
                        });
                        return listaConcorrentes;
                    }

                    function formatarFornecedores(fornecedores) {
                        var listaFornecedores = [];
                        fornecedores.forEach(function (fornecedor) {
                            listaFornecedores.push({text: 'Nome: ' + fornecedor.nome, style: 'valoresTabela'},
                            {text: 'Preço: ' + fornecedor.preco, style: 'valoresTabela'},
                            {text: 'Condições de Pagamento: ' + fornecedor.condicoesDePagamento, style: 'valoresTabela'},
                            {text: 'Endereço: ' + fornecedor.localizacao, style: 'valoresTabela'},
                            {text: 'Prazo de Entrega: ' + fornecedor.prazoDeEntrega, style: 'valoresTabela'},
                            {text: 'Item a ser comprado: ' + fornecedor.item, style: 'valoresTabela', pageBreak: 'after'});
                        });
                        return listaFornecedores;
                    }

                    function formatarProdutos(produtos) {
                        var listaProdutos = [];
                        produtos.forEach(function (produto) {
                            listaProdutos.push({text: 'Nome: ' + produto.nome, style: 'valoresTabela'},
                            {text: 'Ciclo de Produção: ' + produto.cicloDeProducao, style: 'valoresTabela'},
                            {text: 'Preço: ' + produto.preco, style: 'valoresTabela'});
                        });
                        return listaProdutos;
                    }

                    function formatarCargos(cargos) {
                        var listaCargos = [];
                        cargos.forEach(function (cargo) {
                            listaCargos.push({text: 'Nome: ' + cargo.nome, style: 'valoresTabela'},
                            {text: 'Qualificações: ' + cargo.qualificacoes, style: 'valoresTabela'});
                        });
                        return listaCargos;
                    }

                    function formatarItensFinanceiro(itens) {
                        var listaItens = [];
                        itens.forEach(function (item) {
                            listaItens.push({text: 'Descrição: ' + item.descricao, style: 'valoresTabela'},
                            {text: 'Quantidade: ' + item.quantidade, style: 'valoresTabela'},
                            {text: 'Valor Unitário: ' + item.valorUnitario, style: 'valoresTabela'});
                        });
                        return listaItens;
                    }

                    function formatarCompras(compras) {
                        var listaCompras = [];
                        compras.forEach(function (compra) {
                            listaCompras.push({text: 'Dias de prazo de pagamento: ' + compra.dias, style: 'valoresTabela'},
                            {text: 'Porcentagem de compras com esse prazo: ' + compra.porcentagem + ' %', style: 'valoresTabela'});
                        });
                        return listaCompras;
                    }
                    function formatarVendas(vendas) {
                        var listaVendas = [];
                        vendas.forEach(function (venda) {
                            listaVendas.push({text: 'Dias de prazo de pagamento: ' + venda.dias, style: 'valoresTabela'},
                            {text: 'Porcentagem de vendas com esse prazo: ' + venda.porcentagem + ' %', style: 'valoresTabela'});
                        });
                        return listaVendas;
                    }

                    $ionicLoading.show({
                        template: 'Gerando Relatório... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                        duration: 5000
                    }).then(function () {
                        setTimeout(function () {
                            if (!window.cordova) {
                                pdfMake.createPdf(dd).open();
                            } else {
                                var pdfFinal = pdfMake.createPdf(dd);
                                pdfFinal.getDataUrl(function (dataUrl) {
                                    window.open(dataUrl, '_system', 'location=yes');
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
