const dados = {
    "itens": [
        {
            "id": 1,
            "points": 0,
            "accumulate": []
        },
        {
            "id": 2,
            "points": 0,
            "accumulate": []
        },
        {
            "id": 3,
            "points": 0,
            "accumulate": []
        },
        {
            "id": 4,
            "points": 0,
            "accumulate": []
        }
    ]
};

function roll() {
    return Math.floor(Math.random() * 10);
}

const objetivo = 10; // Pontuação necessária para vencer

async function updatePlayer_button(quantidadeItens) {
    try {
        const playerData = dados.itens.slice(0, quantidadeItens); // Limitar a quantidade de itens a serem exibidos
        const button_player = document.getElementById('buttons');

        button_player.innerHTML = playerData.map(player => {
            return `<button id="button-${player.id}">
            <p>Jogador ${player.id}</p>
            </button>`;
        }).join('');

    } catch (error) {
        console.error('Erro ao atualizar os botões dos jogadores:', error);
    }
}

async function updatePlayer_window(quantidadeItens) {
    try {
        const playerData = dados.itens.slice(0, quantidadeItens); // Limitar a quantidade de itens a serem exibidos
        const window_player = document.getElementById('game-window');

        window_player.innerHTML = playerData.map(player => {
            return `<div class="box-player">
            <div class="roll-viewer">
               
            </div>
            <div class="placar">
                <div>
                <p>${player.id}</p>
                </div>
            </div>
        </div>`;
        }).join('');

    } catch (error) {
        console.error('Erro ao atualizar a janela dos jogadores:', error);
    }
}

async function startGame() {
    try {
        const button_player = document.getElementById('buttons');
        button_player.innerHTML = `
            <button id="start-game">
                <p>Iniciar</p>
            </button>`;
            
        const botao = document.getElementById('start-game');
        botao.addEventListener('click', async () => {
            // Aqui você pode definir a quantidade de itens que deseja mostrar
            const quantidadeItens = 4;
            await updatePlayer_button(quantidadeItens);
            await updatePlayer_window(quantidadeItens);
        });
        
    } catch (error) {
        console.error('Erro ao iniciar o jogo:', error);
    }
}

startGame();
 