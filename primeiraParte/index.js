let produtos = [];

if (localStorage.getItem("produtosSalvos")) {
    produtos = JSON.parse(localStorage.getItem("produtosSalvos"));
    atualizarTela();
}

function fazerLogin() {
    const usuarioInput = document.getElementById("usuario").value;
    const senhaInput = document.getElementById("senha").value;
    const erroLogin = document.getElementById("erro-login");

    if (usuarioInput === "admin" && senhaInput === "admin") {
        document.getElementById("tela-login").classList.add("escondido");
        document.getElementById("tela-painel").classList.remove("escondido");
        erroLogin.innerText = "";
    } else {
        erroLogin.innerText = "Usuário ou senha incorretos!";
    }
}

// 2. FUNÇÃO DE LOGOUT
function fazerLogout() {
    document.getElementById("tela-login").classList.remove("escondido");
    document.getElementById("tela-painel").classList.add("escondido");
}

function adicionarProduto() {
    const nome = document.getElementById("prod-nome").value;
    const qtd = document.getElementById("prod-qtd").value;
    const preco = document.getElementById("prod-preco").value;

    if (nome === "" || qtd === "" || preco === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const precoNumero = parseFloat(preco);
    const qtdNumero = parseInt(qtd);

    const novoProduto = {
        id: Date.now(),
        nome: nome,
        qtd: qtdNumero,
        preco: precoNumero,
        total: qtdNumero * precoNumero
    };

    produtos.push(novoProduto);
    localStorage.setItem("produtosSalvos", JSON.stringify(produtos));

    document.getElementById("prod-nome").value = "";
    document.getElementById("prod-qtd").value = "";
    document.getElementById("prod-preco").value = "";

    atualizarTela();
}

function atualizarTela() {
    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = ""; 

    let totalGeral = 0;

    produtos.forEach(prod => {
        totalGeral = totalGeral + prod.total;

        lista.innerHTML += `
            <div class="linha-produto">
                <span>${prod.nome} (x${prod.qtd}) - R$ ${prod.total.toFixed(2)}</span>
                <button class="btn-deletar" onclick="deletarProduto(${prod.id})">X</button>
            </div>
        `;
    });

    document.getElementById("total-geral").innerText = totalGeral.toFixed(2);
}

function deletarProduto(id) {
    produtos = produtos.filter(prod => prod.id !== id);
    localStorage.setItem("produtosSalvos", JSON.stringify(produtos));
    atualizarTela();
}

function gerarCupom() {
    const divCupom = document.getElementById("cupom-fiscal");
    const cupomItens = document.getElementById("cupom-itens");
    const cupomTotal = document.getElementById("cupom-total");

    if (produtos.length === 0) {
        alert("Adicione produtos primeiro!");
        return;
    }

    cupomItens.innerHTML = "";
    let total = 0;

    produtos.forEach(prod => {
        total = total + prod.total;
        cupomItens.innerHTML += `<p>${prod.nome} x${prod.qtd} - R$ ${prod.total.toFixed(2)}</p>`;
    });

    cupomTotal.innerText = total.toFixed(2);
    divCupom.classList.remove("escondido"); 
}

function fecharCupom() {
    document.getElementById("cupom-fiscal").classList.add("escondido");
}