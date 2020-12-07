var playerTurn = true
var gameOver = false
var newGame = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
var gameTracker = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
var playAgainBtn = document.getElementById('play')


function validTurn(id){
    // All of my game board slots id start with t
    if(id.split('')[0] === 't'){
        return true;
    }else {
        return false;
    }
}

function checkWin(){
    // Check diagonals
    if(gameTracker[0][0] == gameTracker[1][1] && gameTracker[0][0] == gameTracker[2][2] && gameTracker[0][0] > -1){
        console.log("Won diagonal")
        console.log(gameTracker[0][0], " ", gameTracker[1][1], " ", gameTracker[2][2])
        console.log(gameTracker)
        return true
    } else if(gameTracker[2][0] == gameTracker[1][1] && gameTracker[2][0] == gameTracker[0][2] && gameTracker[0][2] > -1){
        console.log("Won diagonal")
        console.log(gameTracker[0][0], " ", gameTracker[1][1], " ", gameTracker[2][2])
        console.log(gameTracker)
        return true 
    }

    
    for(let i = 0; i < 3; i++){
        // Check horizontal
        if(gameTracker[i][0] == gameTracker[i][1] && gameTracker[i][0] == gameTracker[i][2] && gameTracker[i][0] > -1){
            console.log("Won horizontal")
            console.log(gameTracker)
            return true
        }
        // Check verticle
        else if(gameTracker[0][i] == gameTracker[1][i] && gameTracker[0][i] == gameTracker[2][i] && gameTracker[0][i] > -1){
            console.log("Won verticle")
            console.log(gameTracker)
            return true
        }
    }
    
    return false
}

document.addEventListener('click', function(e) {
    if(!gameOver){
        e = e || window.event;
        var target = e.target || e.srcElement,
            text = target.textContent || target.innerText;
        // log what the user clicks on window 
        console.log("target: ", target.id)
        var elem = document.getElementById(target.id)
        var symbol = playerTurn ? 'X' : 'O'
        if(validTurn(target.id)){
            playerTurn = !playerTurn
            elem.innerText = symbol
            // Parse the id of elem because its name will be used to find element in 2d arr
            var x = Number.parseInt(target.id.split('')[1]) - 1
            var y = Number.parseInt(target.id.split('')[2]) - 1
            gameTracker[x][y] = symbol === 'X' ? 1 : 0
            
            if(checkWin()){
                document.getElementById('disp-winner').innerText = "Winner is " + symbol
                playAgainBtn.style.visibility = "visible"
                gameOver = true
                console.log("GMAE OVER: ", gameOver)
            }else {
                console.log("nothing yet")
            }
        }
    }
}, false);


playAgainBtn.addEventListener('click', e => {
    gameTracker = newGame
    gameOver = false
    location.reload()
})

