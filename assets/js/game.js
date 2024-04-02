const data = {
    "items": [
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

const goal = 10; 


async function updatePlayerWindow(itemQuantity) {
    try {
        const windowPlayer = document.getElementById('game-window');
        let winnerFound = false;

        data.items.forEach(player => {
            if (player.accumulate.length >= goal && !winnerFound) {
                windowPlayer.innerHTML = `
                    <div>
                        <h2 style="color: #61b955;">Player ${player.id} Win!</h2> 
                    </div>`;
                winnerFound = true;
            }
        });

        if (!winnerFound) {
            const playerData = data.items.slice(0, itemQuantity);
            windowPlayer.innerHTML = playerData.map(player => {
                let accumulatedImages = '';
                player.accumulate.forEach(() => {
                    accumulatedImages += `<img src="/assets/img/coluna-30.png" alt="Imagem acumulada">`;
                });

                return `
                <div> </div>
                    <div class="box-player">
                        <div class="placar">
                            <div>
                                <p>Player ${player.id}</p>
                                <p>Points: ${"🟧".repeat(player.points)}</p>
                                <p>Accumulated:</p>
                                <p>${accumulatedImages}</p>
                            </div>
                        </div> 
                    </div>`;
            }).join('');
        }

    } catch (error) {
        console.error('Error updating player windows:', error);
    }
}

async function updatePlayerButtonandRoll(itemQuantity) {
    try {

        const buttonPlayer = document.getElementById('buttons');
        buttonPlayer.innerHTML = ''; 

        let currentPlayer = null; 

        for (let i = 1; i <= itemQuantity; i++) {
            const rollButton = document.createElement('button');
            rollButton.id = `button-${i}`;
            rollButton.innerHTML = `<p>Player ${i}</p>`;

            rollButton.addEventListener('click', async () => {
                if (currentPlayer === null) {
                    currentPlayer = i; 
                    disabledPlayerButtons( currentPlayer);
                }

                if (i === currentPlayer) {
                    const player = data.items.find(item => item.id === i);
                    const rollResult = roll(); // Lançar o dado e obter o resultado
                    player.points += rollResult;

                    // Atualizar a área de exibição do resultado do lançamento do dado
                    const rollPlayer = document.getElementById(`roll`);
                    rollPlayer.innerHTML = `
                        <h2>Player ${player.id} Rolou o dado:
                        </h2>
                        <h3>${rollResult}</h3>
                    `;

                    if (player.points >= 10){
                        player.points -= 10; 
                        player.accumulate.push("#");
                    }
                    await updatePlayerWindow(itemQuantity); 

                    currentPlayer = (currentPlayer % itemQuantity) + 1;
                    disabledPlayerButtons( currentPlayer);
                }
            });

            buttonPlayer.appendChild(rollButton); 

            // Adicionar área de exibição do resultado do lançamento do dado para cada jogador
            const rollPlayerArea = document.createElement('div');
            rollPlayerArea.id = `roll-${i}`;
            buttonPlayer.appendChild(rollPlayerArea);
        }

    } catch (error) {
        console.error('Error updating player buttons:', error);
    }
}


function disabledPlayerButtons( currentPlayer) {
    const buttonPlayer = document.getElementById('buttons');
    const buttons = buttonPlayer.querySelectorAll('button');

    buttons.forEach(button => {
        const playerId = parseInt(button.id.split('-')[1]);
        button.disabled = (playerId !== currentPlayer);
    });
}

async function startGame() {
    try {
        const buttonPlayer = document.getElementById('buttons');
        buttonPlayer.innerHTML = `
            <button id="start-game-1">
                <p>1 player</p>
            </button>
            
            <button id="start-game-2">
                <p>2 players</p>
            </button>

            <button id="start-game-3">
                <p>3 players</p>
            </button>

            <button id="start-game-4">
                <p>4 players</p>
            </button>`;

        const button1 = document.getElementById('start-game-1');
        button1.addEventListener('click', async () => {
            const quantity = 1;
            await updatePlayerButtonandRoll(quantity);
            await updatePlayerWindow(quantity);
        });

        const button2 = document.getElementById('start-game-2');
        button2.addEventListener('click', async () => {
            const quantity = 2;
            await updatePlayerButtonandRoll(quantity);
            await updatePlayerWindow(quantity);
        });

        const button3 = document.getElementById('start-game-3');
        button3.addEventListener('click', async () => {
            const quantity = 3;
            await updatePlayerButtonandRoll(quantity);
            await updatePlayerWindow(quantity);
        });

        const button4 = document.getElementById('start-game-4');
        button4.addEventListener('click', async () => {
            const quantity = 4;
            await updatePlayerButtonandRoll(quantity);
            await updatePlayerWindow(quantity);
        });

    } catch (error) {
        console.error('Error starting the game:', error);
    }
}

startGame();
