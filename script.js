
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
let scores, currentScore, activePlayer, playing;

btnNew.addEventListener('click', init);
btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);

function init() {
    scores = [0, 0];
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
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');  
}

function hold(){
    if(playing){
        scores[activePlayer]+= currentScore;
        document.getElementById('score--'+activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer]>=20){
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector('.player--'+activePlayer).classList.add('player--winner');
            document.querySelector('.player--'+activePlayer).classList.remove('player--active');
            document.getElemmentById('name--'+activePlayer).textContent="Winner!";
        }else{
            switchPlayer();
        }
    }
}

init();