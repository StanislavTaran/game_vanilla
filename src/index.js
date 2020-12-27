import './styles.css';

// REFs
const refs = {
  startButtonElem: document.getElementById('start-button'),
  newGameButtonElem: document.getElementById('reset-button'),
  scoreListElem: document.getElementById('score-list'),
  squaresListElem: document.getElementById('squares-list'),
  timerValueElem: document.getElementById('time'),
  scoreValueElem: document.getElementById('score'),
  formScoreElem: document.getElementById('form-score'),
  resultFormElem: document.getElementById('result-form'),
  modalElem: document.getElementById('modal'),
};

//CONSTANTS
const SQUARES_QTY = 70;
const INITIAL_TIMER_VALUE = 60;
const SQUARES_QTY_ON_FIELD = 5;

const GAME_STATUS = {
  PENDING: 'pending',
  GAME_OVER: 'over',
  GAME_ON: 'on',
  PAUSE: 'pause',
};

const defaultScoreList = [
  { name: 'Unknown', score: 120 },
  { name: 'John Doe', score: 113 },
  { name: 'Black_Fox', score: 111 },
];

const activeClasses = {
  BLUE: 'square-blue',
  GREEN: 'square-green',
  RED: 'square-red',
};

// GAME STATE
let isOpenModal = false;
let gameStatus = GAME_STATUS.PENDING;
let timerValue = INITIAL_TIMER_VALUE;
let scoreValue = 0;
let squaresIdList = getRandomNumbers(SQUARES_QTY, SQUARES_QTY_ON_FIELD);
const scoreList =
  JSON.parse(localStorage.getItem('score_list')) || defaultScoreList;
let intervalId;

//HELPERS
function formattedTimeValue(sec) {
  const minutes = Math.trunc(sec / 60);
  const seconds = sec - minutes * 60;
  return `0${minutes} : ${seconds > 9 ? seconds : '0' + seconds}`;
}

const activeClassesList = Object.values(activeClasses);

function setActiveClassForElem(elem) {
  const randomIdx = getRandomNumbers(activeClassesList.length);
  return elem.classList.add(activeClassesList[randomIdx]);
}

function resetActiveClassForElem(elem) {
  switch (true) {
    case elem.classList.contains(activeClasses.GREEN):
      elem.classList.remove(activeClasses.GREEN);
      break;
    case elem.classList.contains(activeClasses.BLUE):
      elem.classList.remove(activeClasses.BLUE);
      break;
    case elem.classList.contains(activeClasses.RED):
      elem.classList.remove(activeClasses.RED);
      break;
    default:
      return;
  }
}

function setActiveClassForElements(IdList, parentRef) {
  for (let item of IdList) {
    const elem = parentRef.children[item.toString()];
    setActiveClassForElem(elem);
  }
}

function resetActiveClassForElements(IdList, parentRef) {
  for (let item of IdList) {
    const elem = parentRef.children[item.toString()];
    resetActiveClassForElem(elem);
  }
}

function getRandomNumbers(max, quantity = 1) {
  if (quantity === 1) {
    return Math.floor(Math.random() * Math.floor(max));
  } else if (quantity > 1) {
    const arrOfNumbers = [];
    for (let i = 0; i < quantity; i++) {
      const number = getRandomNumbers(max);
      if (arrOfNumbers.indexOf(number) > -1) continue;
      arrOfNumbers.push(number);
    }
    return arrOfNumbers;
  } else return;
}

function getUniqNumber(primaryList, additionalList = []) {
  let uniqNumber = getRandomNumbers(SQUARES_QTY, 1);
  if (additionalList.length) {
    if (additionalList.indexOf(uniqNumber) > -1) {
      uniqNumber = getUniqNumber(primaryList, additionalList);
    }
  }
  if (primaryList.indexOf(uniqNumber) === -1 && uniqNumber !== 0) {
    return uniqNumber;
  } else return getUniqNumber(primaryList, additionalList);
}

function getUniqNumbersList(primaryList, withoutZero = false) {
  const randomQuantity = getRandomNumbers(3, 1);
  if (withoutZero && randomQuantity === 0) {
    return getUniqNumbersList(primaryList, withoutZero);
  }
  if (randomQuantity === 0) {
    return [];
  } else {
    const arrOfUniqNumbers = [];
    for (let i = 0; i < randomQuantity; i++) {
      let randomNumber = getUniqNumber(primaryList, arrOfUniqNumbers);

      arrOfUniqNumbers.push(randomNumber);
    }
    return arrOfUniqNumbers;
  }
}

// Inerface updaters
function updateTimerInterface(value) {
  refs.timerValueElem.innerHTML = formattedTimeValue(value);
}
function updateScoreInterface(value) {
  refs.scoreValueElem.innerHTML = value;
}

// LOGIC
const handleSetTimerValue = () => {
  timerValue -= 1;
};

const handleStartGame = () => {
  if (gameStatus === GAME_STATUS.GAME_OVER) return;
  if (timerValue === INITIAL_TIMER_VALUE || gameStatus === GAME_STATUS.PAUSE) {
    const prevStatusGame = gameStatus;
    gameStatus = GAME_STATUS.GAME_ON;
    intervalId = setInterval(() => {
      handleSetTimerValue();
      updateTimerInterface(timerValue);
      if (squaresIdList.length <= 1) {
        const newRandomNumbers = getUniqNumbersList(squaresIdList);
        squaresIdList.push(...newRandomNumbers);
        console.log('ADDITIONAL SQUARE');
        setActiveClassForElements(newRandomNumbers, refs.squaresListElem);
      }
      if (timerValue === 0) {
        gameStatus = GAME_STATUS.GAME_OVER;
        clearInterval(intervalId);
        refs.formScoreElem.innerHTML = scoreValue;
        refs.modalElem.classList.remove('modal-closed');
      }
    }, 1000);
    if (prevStatusGame === GAME_STATUS.PENDING) {
      setActiveClassForElements(squaresIdList, refs.squaresListElem);
    }
  } else {
    gameStatus = GAME_STATUS.PAUSE;
  }
};

const handleStartNewGame = () => {
  if (timerValue === INITIAL_TIMER_VALUE) return;
  if (timerValue !== 0) {
    clearInterval(intervalId);
  }
  gameStatus = GAME_STATUS.PENDING;
  scoreValue = 0;
  updateScoreInterface(scoreValue);
  timerValue = INITIAL_TIMER_VALUE;
  updateTimerInterface(timerValue);
  resetActiveClassForElements(squaresIdList, refs.squaresListElem);
  squaresIdList = getRandomNumbers(SQUARES_QTY, SQUARES_QTY_ON_FIELD);
};

const handleClickOnSquare = e => {
  const elemId = e.target.id;
  const isSquareActive = squaresIdList.indexOf(Number(elemId)) > -1;
  if (gameStatus === GAME_STATUS.GAME_ON && isSquareActive) {
    scoreValue += 1;
    updateScoreInterface(scoreValue);
    const newRandomNumbers = getUniqNumbersList(squaresIdList);
    e.target.classList.add('hinge');
    setTimeout(() => {
      resetActiveClassForElem(e.target);
      e.target.classList.remove('hinge');
    }, 1000);

    squaresIdList = [...squaresIdList.filter(item => item !== Number(elemId))];
    if (newRandomNumbers.length) {
      squaresIdList.push(...newRandomNumbers);
      setActiveClassForElements(newRandomNumbers, refs.squaresListElem);
    }
  }
};

const handleSubmitResultForm = e => {
  e.preventDefault();
  const nameTargetValue = e.target[0].value;
  const data = {
    name: nameTargetValue.length ? nameTargetValue : 'Unknown',
    score: scoreValue,
  };
  if (scoreList.length >= 10) {
    scoreList.pop();
  }
  scoreList.push(data);
  scoreList.sort((a, b) => b.score - a.score);
  localStorage.setItem('score_list', JSON.stringify(scoreList));
  refs.scoreListElem.innerHTML = scoreList.map(
    item => `<li class='score-table__item'>${item.name} : ${item.score}</li>`,
  );
  refs.modalElem.classList.add('modal-closed');
};

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  refs.scoreListElem.innerHTML = scoreList.map(
    item => `<li class='score-table__item'>${item.name} : ${item.score}</li>`,
  );
});
refs.startButtonElem.addEventListener('click', handleStartGame);
refs.newGameButtonElem.addEventListener('click', handleStartNewGame);
refs.squaresListElem.addEventListener('click', handleClickOnSquare);
refs.resultFormElem.addEventListener('submit', handleSubmitResultForm);
