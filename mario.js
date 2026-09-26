let mario = document.querySelector(".mario")
let coin = document.querySelector(".coin")
let obstacle = document.querySelector(".obstacle")
let scoreElement = document.getElementById("score")
let highScoreElement = document.getElementById("high-score")
let gamePaused = false
let pauseButton = document.getElementById("pause-btn")
let highScore = Number(localStorage.getItem("marioHighScore")) || 0
highScoreElement.textContent = highScore
let countdownElement = document.getElementById("countdown")
let gameStarted = false
let score = 0
let isJumping = false
let isGameOver = false
let gravity = 0
let jumpPower = 0

let marioX = 50
let obstacleX = 700
let coinX = 600


let gameSpeed = 5
let speedElement = document.getElementById("speed-display")
speedElement.textContent = "Speed: " + gameSpeed.toFixed(1)
pauseButton.addEventListener("click", () => {
    gamePaused = !gamePaused

    if (gamePaused) {
        pauseButton.textContent = "Resume"
    } else {
        pauseButton.textContent = "Pause"
    }
});

document.addEventListener("keydown", (event) => {
    if (isGameOver) return
    

    if ((event.key === " " || event.key === "Space" || event.key === "ArrowUp") && !isJumping) {
        jump()
    }
    
    // Move right with ArrowRight
    if (event.key === "ArrowRight" && marioX < 750) {
        marioX += 30
        mario.style.left = marioX + "px"
    }
    
    // Move left with ArrowLeft
    if (event.key === "ArrowLeft" && marioX > 10) {
        marioX -= 30
        mario.style.left = marioX + "px"
    }
})

    

function jump() {
    if (isJumping) return;

    isJumping = true;

    let jumpVelocity = 13;
    const gravity = 0.6;

    let jumpInterval = setInterval(() => {
        let currentBottom = parseFloat(mario.style.bottom || "0");

        currentBottom += jumpVelocity;
        jumpVelocity -= gravity;

        if (currentBottom <= 0 && jumpVelocity < 0) {
            currentBottom = 0;
            isJumping = false;
            clearInterval(jumpInterval);
        }

        mario.style.bottom = currentBottom + "px";
    }, 20);
}
let countdown = 3

let countdownInterval = setInterval(() => {
    countdown--

    if (countdown > 0) {
        countdownElement.textContent = countdown
    } else {
    countdownElement.textContent = "GO!"

    clearInterval(countdownInterval)

    setTimeout(() => {
        countdownElement.style.display = "none"
        gameStarted = true
    }, 500)
}
}, 1000)


setInterval(() => {
    if (isGameOver || gamePaused ||  !gameStarted) return
    obstacleX -= gameSpeed
    obstacle.style.left = obstacleX + "px"
    coinX -= gameSpeed
    coin.style.left = coinX + "px"
  if (obstacleX < -50) {
    obstacleX = 800
    let randomHeight = Math.floor(Math.random() * 30) + 40
    obstacle.style.height = randomHeight + "px"

    let randomWidth = Math.floor(Math.random() * 15) + 30
    obstacle.style.width = randomWidth + "px"
} 
    if (coinX < -50) {
        coinX = 800
    }
    
    let marioRect = mario.getBoundingClientRect()
    let obstacleRect = obstacle.getBoundingClientRect()
    let coinRect = coin.getBoundingClientRect()
    let containerRect = document.querySelector(".game-container").getBoundingClientRect()
    
    // Adjust positions relative to container
    let marioBottom = parseInt(mario.style.bottom || "0")
    let marioLeft = marioX
    
    // Check collision with obstacle (Game Over)
    /*if (marioRect.right > obstacleRect.left && 
        marioRect.left < obstacleRect.right && 
        marioRect.bottom > obstacleRect.top) {
        gameOver()
    }*/
    if (
    marioRect.right > obstacleRect.left &&
    marioRect.left < obstacleRect.right &&
    marioRect.bottom > obstacleRect.top &&
    marioRect.top < obstacleRect.bottom
) {
    gameOver();
}
    // Check collision with coin 
    if (marioRect.right > coinRect.left && 
    marioRect.left < coinRect.right && 
    marioRect.bottom > coinRect.top) {

    score++
    scoreElement.textContent = score
if (score > highScore) {
    highScore = score
    highScoreElement.textContent = highScore
    localStorage.setItem("marioHighScore", highScore)
}
    // Increase game difficulty as score grows
    // gameSpeed = Math.min(12, 5 + score * 0.5)
        // coinX = 800 // Reset coin position
        // Increase game difficulty as score grows
gameSpeed = Math.min(12, 5 + score * 0.5)
speedElement.textContent = "Speed: " + gameSpeed.toFixed(1)

coinX = 800 // Reset coin position
        coin.style.left = coinX + "px"
        
        // Coin collection animation
        coin.style.transform = "scale(0)"
        setTimeout(() => {
            coin.style.transform = "scale(1)"
        }, 200)
    }
    
}, 20);
function gameOver() {
    isGameOver = true
    let gameOverMsg = document.createElement("div")
    gameOverMsg.className = "game-over"
    gameOverMsg.innerHTML = "GAME OVER!<br>Score: " + score
    document.querySelector(".game-container").appendChild(gameOverMsg)
}
function resetGame() {
    location.reload() // Simple reset
}
mario.style.left = marioX + "px"
mario.style.bottom = "0px"
obstacle.style.left = obstacleX + "px"
obstacle.style.height = "60px"
coin.style.left = coinX + "px"
coin.style.bottom = "0px"
console.log("Game Started! Use Arrow Keys to move Mario")
