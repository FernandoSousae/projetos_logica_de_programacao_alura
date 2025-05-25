let amigos = [];

function adicionar() {
    let amigoInput = document.getElementById('nome-amigo');
    let nomeAmigo = amigoInput.value.trim();

    if (nomeAmigo === '') {
        alert('Por favor, digite o nome do amigo.');
        amigoInput.focus();
        return;
    }

    if (amigos.includes(nomeAmigo)) {
        alert(`O amigo "${nomeAmigo}" já foi adicionado.`);
        amigoInput.value = ''; // Limpa o campo mesmo se for duplicado
        amigoInput.focus();
        return;
    }

    amigos.push(nomeAmigo);
    atualizarListaAmigosDisplay();
    amigoInput.value = ''; // Limpa o campo após adicionar
    amigoInput.focus();

    // Limpa o sorteio anterior, pois a lista de amigos mudou
    document.getElementById('lista-sorteio').innerHTML = '';
}

function removerAmigo(nomeParaRemover) {
    amigos = amigos.filter(amigo => amigo !== nomeParaRemover);
    atualizarListaAmigosDisplay();
    // Limpa o sorteio anterior, pois a lista de amigos mudou
    document.getElementById('lista-sorteio').innerHTML = '';
}

function atualizarListaAmigosDisplay() {
    let listaAmigosElement = document.getElementById('lista-amigos');
    listaAmigosElement.innerHTML = ''; // Limpa a lista atual

    for (let i = 0; i < amigos.length; i++) {
        let amigo = amigos[i];
        let amigoElement = document.createElement('span');
        amigoElement.textContent = amigo;
        amigoElement.classList.add('amigo-item'); // Para possível estilização
        amigoElement.style.cursor = 'pointer';
        amigoElement.title = `Clique para remover ${amigo}`;
        amigoElement.onclick = () => removerAmigo(amigo); // Adiciona evento de clique para remover

        listaAmigosElement.appendChild(amigoElement);

        if (i < amigos.length - 1) {
            listaAmigosElement.appendChild(document.createTextNode(', '));
        }
    }
}

function sortear() {
    if (amigos.length < 2) {
        alert('Adicione pelo menos dois amigos para realizar o sorteio.');
        return;
    }

    let amigosParaSortear = [...amigos]; // Cria uma cópia para não alterar a ordem original de 'amigos'
    embaralha(amigosParaSortear);

    let sorteioElement = document.getElementById('lista-sorteio');
    sorteioElement.innerHTML = ''; // Limpa resultados anteriores

    for (let i = 0; i < amigosParaSortear.length; i++) {
        let de = amigosParaSortear[i];
        let para = amigosParaSortear[(i + 1) % amigosParaSortear.length]; // O último entrega ao primeiro
        sorteioElement.innerHTML += `${de} --> ${para}<br>`;
    }
}

function embaralha(lista){

    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);

        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function reiniciar() {
    amigos = [];
    atualizarListaAmigosDisplay(); // Atualiza a exibição da lista de amigos (limpando-a)
    document.getElementById('lista-sorteio').innerHTML = '';
}