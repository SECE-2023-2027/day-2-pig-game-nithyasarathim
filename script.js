let p1Container = document.getElementById('p1Container');
let p1GameInfo = document.getElementById('p1GameInfo');
let p1TotalScore = document.getElementById('p1TotalScore');
let p1CurrentScore = document.getElementById('p1CurrentScore');

let p2Container = document.getElementById('p2Container');
let p2GameInfo = document.getElementById('p2GameInfo');
let p2TotalScore = document.getElementById('p2TotalScore');
let p2CurrentScore = document.getElementById('p2CurrentScore');

let newGameBtn = document.getElementById('newGame');
let rollDiceBtn = document.getElementById('rollDice');
let holdBtn = document.getElementById('hold');

let dieImg = document.getElementById('dieImg');

let player1Total, player1Current;
let player2Total, player2Current;
let turn;
let interval;
let intervalSet;

const colors = {
  active: {
    container: 'rgb(220, 176, 189)',
    gameInfo: 'rgb(199, 54, 95)'
  },
  inactive: {
    container: 'rgb(188, 124, 151)',
    gameInfo: 'rgb(195, 69, 107)'
  }
};

const setActiveColors = (t) => {
  if (t == 1) {
    p1Container.style.backgroundColor = colors.active.container;
    p1GameInfo.style.backgroundColor = colors.active.gameInfo;
    p2Container.style.backgroundColor = colors.inactive.container;
    p2GameInfo.style.backgroundColor = colors.inactive.gameInfo;
  } else {
    p1Container.style.backgroundColor = colors.inactive.container;
    p1GameInfo.style.backgroundColor = colors.inactive.gameInfo;
    p2Container.style.backgroundColor = colors.active.container;
    p2GameInfo.style.backgroundColor = colors.active.gameInfo;
  }
};

const setCurrentScore = (score, t) => {
  if (t == 1) {
    player1Current = score;
    p1CurrentScore.textContent = String(player1Current);
  } else {
    player2Current = score;
    p2CurrentScore.textContent = String(player2Current);
  }
};

const getCurrentScore = (t) => {
  if (t == 1) {
    return player1Current;
  }
  return player2Current;
};

const setTotalScore = (score, t) => {
  if (t == 1) {
    player1Total = score;
    p1TotalScore.textContent = String(player1Total);
  } else {
    player2Total = score;
    p2TotalScore.textContent = String(player2Total);
  }
};

const getTotalScore = (t) => {
  if (t == 1) {
    return player1Total;
  }
  return player2Total;
};

const generateRandomNumber = () => Math.floor(Math.random() * 6) + 1;

const gameStart = () => {
  turn = 1;
  intervalSet = false;
  setActiveColors(turn);
  setCurrentScore(0, 1);
  setCurrentScore(0, 2);
  setTotalScore(0, 1);
  setTotalScore(0, 2);
  rollDiceBtn.disabled = false;
  holdBtn.disabled = false;
  rollDiceBtn.style.cursor = 'pointer';
  holdBtn.style.cursor = 'pointer';
};

const endGame = () => {
  rollDiceBtn.disabled = true;
  holdBtn.disabled = true;
  rollDiceBtn.style.cursor = 'no-drop';
  holdBtn.style.cursor = 'no-drop';
};

newGameBtn.addEventListener('click', () => {
  gameStart();
});

const switchTurns = () => {
  switch (turn) {
    case 1:
      turn = 2;
      break;
    case 2:
      turn = 1;
      break;
    default:
      break;
  }
  setActiveColors(turn);
};

const startRolling = () => {
  rollDiceBtn.style.backgroundColor = 'rgba(255, 112, 112, 0.8)';
  rollDiceBtn.textContent = 'STOP ROLLING';
  intervalSet = true;
};

const stopRolling = () => {
  rollDiceBtn.style.backgroundColor = 'rgba(123, 255, 123, 0.8)';
  rollDiceBtn.textContent = 'START ROLLING';
  intervalSet = false;
  clearInterval(interval);
};

rollDiceBtn.addEventListener('click', () => {
  if (intervalSet) {
    stopRolling();
    return;
  }
  startRolling();
  interval = setInterval(() => {
    let dice = generateRandomNumber();
    dieImg.src = `assets/dice-${dice}.png`;
    if (dice == 1) {
      setCurrentScore(0, turn);
      switchTurns();
      stopRolling();
    } else {
      let currScore = getCurrentScore(turn);
      console.log(currScore);
      currScore += dice;
      setCurrentScore(currScore, turn);
    }
  }, 1000);
});

holdBtn.addEventListener('click', () => {
  stopRolling();
  const currScore = getCurrentScore(turn);
  if (currScore == 0) {
    alert('You cannot hold when the current score is 0');
    return;
  }
  let totalScore = getTotalScore(turn);
  totalScore += currScore;
  setTotalScore(totalScore, turn);
  if (totalScore >= 100) {
    let player;
    switch (turn) {
      case 1:
        player = 'Player 1';
        break;
      case 2:
        player = 'Player 1';
        break;
      default:
        player = 'Player';
        break;
    }
    alert(`${player} won the game!!`);
    endGame();
  }
  setCurrentScore(0, turn);
  switchTurns();
});

gameStart();
