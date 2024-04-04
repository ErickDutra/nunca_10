function showDialog() {
    // Cria um novo elemento div
    const dialog = document.createElement('div');

    // Define o conteúdo interno do div
    dialog.innerHTML = `
        <div class="dialog-box">
        <h2>Regras do Game</h2>
        <ul>
            <li>Para saber quem será o primeiro, os participantes escolhem um entre eles e o jogo continua no sentido horário.</li>
            <li>Cada jogador joga o dado uma vez por rodada e acumula pontos.</li>
            <li>Ao juntar 10 quadrados, com 1 unidade simples cada, o jogador deve trocá-las por 1 barra.</li>
            <li>Ao juntar 10 barras com 1 dezena em cada, o jogador deve trocá-las pela placa contendo uma centena.</li>
            <li>O jogo termina quando um jogador atingir 100 pontos.</li>
        </ul>
        <button onclick="closeDialog()">Fechar</button>
        </div>
    `;

    // Adiciona a classe 'dialog' ao div
    dialog.classList.add('dialog');

    // Adiciona o div ao corpo do documento
    document.body.appendChild(dialog);
}

// Cria uma função para fechar a caixa de diálogo
function closeDialog() {
    // Obtém a caixa de diálogo
    const dialog = document.querySelector('.dialog');

    // Remove a caixa de diálogo do corpo do documento
    document.body.removeChild(dialog);
}

// Exibe a caixa de diálogo quando o botão é clicado
document.getElementById('rules').addEventListener('click', showDialog);