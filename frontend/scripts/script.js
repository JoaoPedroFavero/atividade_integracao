const API_URL = "http://localhost:3001";
const tituloFormulario = document.getElementById("tituloFormulario");
const formProduto = document.getElementById("formProduto");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const preco = document.getElementById("preco");
const botaoCancelar = document.getElementById("botaoCancelar");
const botaoSalvar = document.getElementById("botaoSalvar");
const mensagem = document.getElementById("mensagem");
const idBusca = document.getElementById("idBusca");
const botaoBuscar = document.getElementById("botaoBuscar");
const botaoListar = document.getElementById("botaoListar");
const resultadoBusca = document.getElementById("resultadoBusca");
const botaoAtualizarLista = document.getElementById("botaoAtualizarLista");
const listaProdutos = document.getElementById("listaProdutos");

function mostrarMensagem(texto, ehErro = false) {
    mensagem.textContent = texto;
    mensagem.className = ehErro ? 'erro' : 'sucesso';
}

async function listarProdutos() {
    try {
        const resposta = await fetch(`${API_URL}/produtos`);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar produtos.');
        }

        const produtos = await resposta.json();
        listaProdutos.innerHTML = '';

        if (produtos.length === 0) {
            listaProdutos.innerHTML = `
                <tr>
                    <td colspan = "5">Nenhum produto cadastrado.</td> 
                </tr>
            `;
            return;
        };

        produtos.forEach((produto) => {
            listaProdutos.innerHTML += `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>R$ ${Number(produto.preco).toFixed(2)}</td>
                    <td>
                    <button onclick ="prepararEdicao(${produto.id})">
                        Editar
                      </button>

                      <button onclick="excluirProduto(${produto.id})">
                          Excluir
                      </button>
                    </td>
                </tr>
            `;
        });
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

async function listarProdutosPorId(id) {
    try {
        const resposta = await fetch(`${API_URL}/produtos/${id}`);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar produto.');
        }

        const produto = await resposta.json();
        listaProdutos.innerHTML = '';

        if (produto.length === 0) {
            listaProdutos.innerHTML = `
                <tr>
                    <td colspan = "5">Nenhum produto cadastrado com esse id.</td> 
                </tr>
            `;
            return;
        };

        produto.forEach((produto) => {
            listaProdutos.innerHTML += `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>R$ ${Number(produto.preco).toFixed(2)}</td>
                    <td>
                    <button onclick ="prepararEdicao(${produto.id})">
                        Editar
                      </button>

                      <button onclick="excluirProduto(${produto.id})">
                          Excluir
                      </button>
                    </td>
                </tr>
            `;
        });
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

async function cadastrarProduto(dadosProduto) {
    try {
        const resposta = await fetch(`${API_URL}/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosProduto)
        });
        
        console.log(resposta)

        if (!resposta.ok) {
            throw new Error('Erro ao cadastrar produto');
        }

        const result = await resposta.json();
        return result;

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

async function excluirProduto(id) {
    try {
        await listarProdutosPorId(id)
        const resposta = await fetch(`${API_URL}/produtos/${id}`, method='DELETE');

        if (!resposta.ok) {
            throw new Error('Erro ao buscar produto.');
        }

        const produto = await resposta.json();

        if (produto.length === 0) {
            listaProdutos.innerHTML = `
                <tr>
                    <td colspan = "5">Nenhum produto cadastrado com esse id.</td> 
                </tr>
            `;
            return;
        };

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

formProduto.addEventListener(`submit`, async(e) => {
    e.preventDefault();
    if(!nome.value || !preco.value){
        throw new Error(`Insira todos os dados obrigatorios para cadastrar um produto`)
    }
    const dadosProdutos = {
        nome : nome.value,
        descricao : descricao.value,
        preco : preco.value
    }
    console.log(dadosProdutos);
    await cadastrarProduto(dadosProdutos);
    mostrarMensagem(`Produto cadastrado com sucesso`)
    await listarProdutos();
});

botaoBuscar.addEventListener(`click`, async () =>{
    const id = idBusca.value;
    listarProdutosPorId(id);
});

listarProdutos();