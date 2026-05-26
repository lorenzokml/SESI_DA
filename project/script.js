let listaProdutos = [];
let listaVendas = [];
let carrinhoCompras = [];

function fazerLogin() {
    const usuarioDigitado = document.getElementById('usuario').value;
    const senhaDigitada = document.getElementById('senha').value;

    if (usuarioDigitado === 'admin' && senhaDigitada === 'admin') {
        document.getElementById('tela-login').style.display = 'none';
        document.getElementById('painel-controle').style.display = 'flex';
        mostrarTela('inicio');
    } else {
        const erro = document.getElementById('erro-login');
        erro.style.display = 'block';
        setTimeout(() => erro.style.display = 'none', 3000);
    }
}

function fazerLogout() {
    document.getElementById('tela-login').style.display = 'flex';
    document.getElementById('painel-controle').style.display = 'none';
}

function mostrarTela(nomeTela) {
    document.querySelectorAll('.item-menu').forEach(item => item.classList.remove('ativo'));
    const itemMenu = document.getElementById(`menu-${nomeTela}`);
    if (itemMenu) itemMenu.classList.add('ativo');

    const area = document.getElementById('area-conteudo');
    
    if (nomeTela === 'inicio') renderizarInicio(area);
    else if (nomeTela === 'produtos') renderizarProdutos(area);
    else if (nomeTela === 'vendas') renderizarVendas(area);
    else if (nomeTela === 'relatorios') renderizarRelatorios(area);
}

function renderizarInicio(area) {
    const faturamentoTotal = listaVendas.reduce((total, venda) => total + venda.valorTotal, 0);
    area.innerHTML = `
        <h2 class="titulo-secao">Resumo Geral</h2>
        <div class="grade-estatisticas">
            <div class="cartao-estatistica">
                <div class="info-estatistica"><h4>Faturamento</h4><span>R$ ${faturamentoTotal.toFixed(2)}</span></div>
            </div>
            <div class="cartao-estatistica">
                <div class="info-estatistica"><h4>Vendas Hoje</h4><span>${listaVendas.length}</span></div>
            </div>
            <div class="cartao-estatistica">
                <div class="info-estatistica"><h4>Itens em Estoque</h4><span>${listaProdutos.length}</span></div>
            </div>
        </div>
        <div class="cartao">
            <h3>Bem-vindo ao Mercado</h3>
            <p class="margem-topo-20">Utilize o menu lateral para gerenciar seu estoque, realizar novas vendas e acompanhar seus relatórios em tempo real.</p>
        </div>
    `;
}

function renderizarProdutos(area) {
    area.innerHTML = `
        <h2 class="titulo-secao">Gestão de Estoque</h2>
        <div class="cartao">
            <h3 class="margem-baixo-20">Novo Produto</h3>
            <div class="grade-formulario">
                <div class="grupo-input">
                    <label>Nome do Produto</label>
                    <input type="text" id="nome-prod" placeholder="Ex: Arroz Integral 1kg">
                </div>
                <div class="grupo-input">
                    <label>Preço Unitário (R$)</label>
                    <input type="number" id="preco-prod" placeholder="0.00">
                </div>
            </div>
            <button class="botao-primario" onclick="salvarNovoProduto()">Cadastrar no Sistema</button>
        </div>

        <div class="cartao">
            <h3>Produtos Cadastrados</h3>
            <table>
                <thead><tr><th>Produto</th><th>Preço Unitário</th></tr></thead>
                <tbody>${listaProdutos.length ? listaProdutos.map(p => `<tr><td>${p.nome}</td><td><strong>R$ ${p.preco.toFixed(2)}</strong></td></tr>`).join('') : '<tr><td colspan="2">Nenhum produto no estoque.</td></tr>'}</tbody>
            </table>
        </div>
    `;
}

function salvarNovoProduto() {
    const nomeInput = document.getElementById('nome-prod').value;
    const precoInput = parseFloat(document.getElementById('preco-prod').value);
    if (nomeInput && !isNaN(precoInput)) {
        listaProdutos.push({ nome: nomeInput, preco: precoInput });
        mostrarTela('produtos');
    }
}

function renderizarVendas(area) {
    const opcoes = listaProdutos.map((p, i) => `<option value="${i}">${p.nome} - R$ ${p.preco.toFixed(2)}</option>`).join('');
    area.innerHTML = `
        <h2 class="titulo-secao">Ponto de Venda (PDV)</h2>
        <div class="cartao">
            <div class="grade-formulario">
                <div class="grupo-input">
                    <label>Selecionar Item</label>
                    <select id="venda-item"><option value="">Selecione um produto...</option>${opcoes}</select>
                </div>
                <div class="grupo-input">
                    <label>Quantidade</label>
                    <input type="number" id="venda-quantidade" value="1">
                </div>
            </div>
            <button class="botao-primario" onclick="adicionarNoCarrinho()">Adicionar ao Carrinho</button>
        </div>

        <div class="container-venda">
            <div class="cartao">
                <h3>Carrinho Atual</h3>
                <table>
                    <thead><tr><th>Item</th><th>Qtd</th><th>Subtotal</th></tr></thead>
                    <tbody>${carrinhoCompras.length ? carrinhoCompras.map(i => `<tr><td>${i.nome}</td><td>${i.qtd}x</td><td>R$ ${i.subtotal.toFixed(2)}</td></tr>`).join('') : '<tr><td colspan="3">Carrinho vazio.</td></tr>'}</tbody>
                </table>
                <div class="alinhamento-direita margem-topo-20">
                    <h2 class="margem-baixo-10">Total: R$ ${carrinhoCompras.reduce((total, item) => total + item.subtotal, 0).toFixed(2)}</h2>
                    <button class="botao-primario" onclick="finalizarVendaAtual()">Finalizar Venda</button>
                </div>
            </div>
            <div id="area-cupom"></div>
        </div>
    `;
}

function adicionarNoCarrinho() {
    const indice = document.getElementById('venda-item').value;
    const qtdVendida = parseInt(document.getElementById('venda-quantidade').value);
    if (indice !== "" && qtdVendida > 0) {
        const p = listaProdutos[indice];
        carrinhoCompras.push({ nome: p.nome, preco: p.preco, qtd: qtdVendida, subtotal: p.preco * qtdVendida });
        mostrarTela('vendas');
    }
}

function finalizarVendaAtual() {
    if (!carrinhoCompras.length) return;
    const valorTotalVenda = carrinhoCompras.reduce((total, item) => total + item.subtotal, 0);
    const dataVenda = new Date().toLocaleString();
    listaVendas.push({ data: dataVenda, itens: [...carrinhoCompras], valorTotal: valorTotalVenda });

    const cupomHtml = `
        <div class="cupom-fiscal">
            <div class="texto-centro margem-baixo-20">
                <h3>Mercado</h3>
                <small>CNPJ: 00.000.000/0001-00</small>
            </div>
            <div>
                ${carrinhoCompras.map(i => `<div style="display:flex; justify-content:space-between; font-size:0.8rem;">
                    <span>${i.nome} x${i.qtd}</span>
                    <span>R$ ${i.subtotal.toFixed(2)}</span>
                </div>`).join('')}
            </div>
            <div style="border-top: 1px dashed #000; padding-top: 10px; margin-top: 10px; font-weight:bold; display:flex; justify-content:space-between;">
                <span>TOTAL</span>
                <span>R$ ${valorTotalVenda.toFixed(2)}</span>
            </div>
            <div class="texto-centro margem-topo-20">
                <small>Data: ${dataVenda}<br>VOLTE SEMPRE!</small>
            </div>
        </div>
    `;
    document.getElementById('area-cupom').innerHTML = cupomHtml;
    carrinhoCompras = [];
}

function renderizarRelatorios(area) {
    area.innerHTML = `
        <h2 class="titulo-secao">Análise de Performance</h2>
        <div class="cartao">
            <table>
                <thead><tr><th>Data/Hora</th><th>Qtd Itens</th><th>Valor Total</th></tr></thead>
                <tbody>${listaVendas.length ? listaVendas.map(v => `<tr><td>${v.data}</td><td>${v.itens.length} item(ns)</td><td><span class="texto-sucesso">R$ ${v.valorTotal.toFixed(2)}</span></td></tr>`).join('') : '<tr><td colspan="3">Sem dados de vendas.</td></tr>'}</tbody>
            </table>
        </div>
    `;
}
