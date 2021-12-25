const player1 = {
    button: document.querySelector('#player1Btn'),
    score: document.querySelector('#player1Score'),
    seriesScore : document.querySelector('#player1Series')
}
const player2 = {
    button: document.querySelector('#player2Btn'),
    score: document.querySelector('#player2Score'),
    seriesScore: document.querySelector('#player2Series')
}
const game = {
    playTo:document.querySelector('#playTo'),
    restButton: document.querySelector('#resetBtn'),
    nextButton: document.querySelector('#nextBtn'),
    totalGame: document.querySelector('#totalGame'),
    isGamerover:false,
    isTie: false
}
function updateScore(scoreOne,scoreNo){
    if (!game.isGamerover){
        scoreOneScore = parseInt(scoreOne.score.innerText) + 1 
        scoreOne.score.innerText = scoreOneScore
    }
    scoreNoScore = parseInt(scoreNo.score.innerText)
    playToScore = parseInt(game.playTo.value)
    if(scoreOneScore >= (playToScore -1) && scoreNoScore >= (playToScore -1) && (scoreOneScore - scoreNoScore <= 1)){
        game.isTie = true;
    } else{
        // win by 2 to unlock tie
        game.isTie = false;
    }
    if(scoreOneScore >= playToScore && !game.isTie){
        game.isGamerover = true
        scoreOne.seriesScore.innerText = parseInt(scoreOne.seriesScore.innerText) + 1
        scoreOne.score.classList.add('has-text-success')
        scoreNo.score.classList.add('has-text-danger')
        scoreOne.button.disabled = true
        scoreNo.button.disabled = true
        if(parseInt(scoreOne.seriesScore.innerText) >= Math.ceil(parseInt(game.totalGame.value)/2) ){
            game.nextButton.disabled = true
            scoreOne.seriesScore.classList.add('has-text-success')
            scoreNo.seriesScore.classList.add('has-text-danger')
        }
    }
}
function resetGame(){
    nextGame()
    for (p of [player1,player2]){
        p.seriesScore.innerText = 0
        p.seriesScore.classList.remove('has-text-success','has-text-danger')
    }
    game.nextButton.disabled = false
}
function nextGame(){
    game.isGamerover = false
    for (p of [player1,player2]){
        p.button.disabled = false
        p.score.classList.remove('has-text-success','has-text-danger')
        p.score.innerText = 0
    }
}
game.totalGame.addEventListener('change',resetGame)
game.playTo.addEventListener('change',resetGame)
game.restButton.addEventListener('click',resetGame)
game.nextButton.addEventListener('click',nextGame)
player1.button.addEventListener('click',function(){
    updateScore(player1,player2)
})
player2.button.addEventListener('click',function(){
    updateScore(player2,player1)
})

