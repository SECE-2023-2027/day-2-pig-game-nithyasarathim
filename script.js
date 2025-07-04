
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.getElementById('dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
let score0, score1, currentScore, activePlayer, playing;

btnNew.addEventListener('click', init);
btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);

function init() {
    score0=0;
    score1=0;

    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

function roll() {
    if (playing){
        const dice = Math.trunc(Math.random()*6)+1;
        diceEl.classList.remove('hidden');
        diceEl.src='assets/dice-'+dice+'.png';
        if(dice !== 1){
            currentScore+=dice;
            document.getElementById('current--'+activePlayer).textContent = currentScore;
        }else{
            switchPlayer();
        }
    }
}

function switchPlayer() {
    currentScore = 0;
    document.getElementById('current--' + activePlayer).textContent = currentScore;
    if(activePlayer === 0){
        activePlayer=1;
    }else{
        activePlayer=0;
    }
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');  
}

function hold(){
    let currentScore=0;
    if(playing){
        if(activePlayer === 0){
            score0 += currentScore;
            tmpScore = score0;
        }
        else{
            score1 += currentScore;
            tmpScore = score1;
        }
        document.getElementById('score--' + activePlayer).textContent = tmpScore;
        
        document.getElementById('current--' + activePlayer).textContent = currentScore;
        diceEl.classList.add('hidden');
        
        if( tmpScore>= 20){
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector('.player--'+activePlayer).classList.add('player--winner');
            document.querySelector('.player--'+activePlayer).classList.remove('player--active');
            document.getElementById('name--'+activePlayer).textContent="Winner!";
        }else{
            switchPlayer();
        }
    }
}

init();