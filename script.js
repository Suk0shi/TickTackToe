const gameBoard = (() => {

    const PLAYER_X_CLASS = 'x'
    const PLAYER_O_CLASS = 'circle'
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    const cellElements = document.querySelectorAll('[data-cell]')
    const boardElement = document.getElementById('board')
    const winningMessageElement = document.getElementById('winningMessage')
    const restartButton = document.getElementById('restartButton')
    const winningMessageTextElement = document.getElementById('winningMessageText')
    let player1Name = ''
    let player2Name = ''
    let isPlayer_O_Turn = false

    const addPlayerButton = document.getElementById('addPlayerButton')
    const addButton = document.getElementById('addButton')

    // startGame()

    addPlayerButton.addEventListener('click', showForm)
    addButton.addEventListener('click', hideForm)
    addButton.addEventListener('click', generateNames)
    addButton.addEventListener('click', startGame)
    restartButton.addEventListener('click', startGame)

    function startGame() {
        isPlayer_O_Turn = false
        cellElements.forEach(cell => {
            console.log(cell.classList);
            cell.classList.remove(PLAYER_X_CLASS)
            cell.classList.remove(PLAYER_O_CLASS)
            cell.removeEventListener('click', handleCellClick)
            cell.addEventListener('click', handleCellClick, { once: true })
        })
        setBoardHoverClass()
        winningMessageElement.classList.remove('show')
    }

    function handleCellClick(e) {
        const cell = e.target
        const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
        placeMark(cell, currentClass)
        if (checkWin(currentClass)) {
            endGame(false)
        } else if (isDraw()) {
            endGame(true)
        } else {
            swapTurns()
            setBoardHoverClass()
        }
    }

    function endGame(draw) {
        if (draw) {
            winningMessageTextElement.innerText = `It's a draw!`
        } else {
            winningMessageTextElement.innerText = 
            `${isPlayer_O_Turn ? player2Name : player1Name} wins!`
            
        }
        winningMessageElement.classList.add('show')
    }

    function isDraw() {
        return [...cellElements].every(cell => {
            return cell.classList.contains(PLAYER_X_CLASS) || 
            cell.classList.contains(PLAYER_O_CLASS)
        })
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass)
    }

    function swapTurns() {
        isPlayer_O_Turn = !isPlayer_O_Turn
    }

    function setBoardHoverClass() {
        boardElement.classList.remove(PLAYER_X_CLASS)
        boardElement.classList.remove(PLAYER_O_CLASS)
        if (isPlayer_O_Turn) {
            boardElement.classList.add(PLAYER_O_CLASS)
        } else {
            boardElement.classList.add(PLAYER_X_CLASS)
        }
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass)
            })
        })
    }

    function showForm() {
        document.getElementById('formElement').style.display = 'block';
        // document.getElementById('formBackground').style.display = 'block';
    }

    function generateNames() {
        const container = document.getElementById('playerNames')
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        const name1 = document.createElement('h1')
        name1.classList.add('name1')
        name1.textContent = 'X: ' + document.getElementById("player1").value
        player1Name = document.getElementById("player1").value
        container.appendChild(name1)

        const name2 = document.createElement('h1')
        name2.classList.add('name2')
        name2.textContent = 'O: ' + document.getElementById("player2").value
        player2Name = document.getElementById("player2").value
        container.appendChild(name2)

        document.getElementById("player1").value = ''
        document.getElementById("player2").value = ''

        document.getElementById('board').style.display = 'grid';
    }
    
    function hideForm() {
        document.getElementById('formElement').style.display = 'none';
    }

})();