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
  cancelResultElem: document.getElementById('cancel-result-btn'),
  modalElem: document.getElementById('modal'),
  formStatusElem: document.getElementById('form-status'),
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

const activeSquareClasses = {
  BLUE: 'square-blue',
  GREEN: 'square-green',
  RED: 'square-red',
};

const animationClasses = {
  onSquareleft: 'hinge',
};

const defaultUserName = 'Unknown';

// GAME STATE
const gameState = {
  gameStatus: GAME_STATUS.PENDING,
  timerValue: INITIAL_TIMER_VALUE,
  scoreValue: 0,
  squaresIdList: getRandomNumbers(SQUARES_QTY, SQUARES_QTY_ON_FIELD),
};

let intervalId;

// API Requests
async function fetchTopResults() {
  return fetch(`/api/results`)
    .then(res => res.json())
    .catch(e => console.log(e));
}

async function postResult(data) {
  return fetch(`/api/results`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

//HELPERS
function formattedTimeValue(sec) {
  const minutes = Math.trunc(sec / 60);
  const seconds = sec - minutes * 60;
  return `0${minutes} : ${seconds > 9 ? seconds : '0' + seconds}`;
}

const activeClassesList = Object.values(activeSquareClasses);

function setActiveClassForElem(elem) {
  const randomIdx = getRandomNumbers(activeClassesList.length);
  return elem.classList.add(activeClassesList[randomIdx]);
}

function resetActiveClassForElem(elem) {
  switch (true) {
    case elem.classList.contains(activeSquareClasses.GREEN):
      elem.classList.remove(activeSquareClasses.GREEN);
      break;
    case elem.classList.contains(activeSquareClasses.BLUE):
      elem.classList.remove(activeSquareClasses.BLUE);
      break;
    case elem.classList.contains(activeSquareClasses.RED):
      elem.classList.remove(activeSquareClasses.RED);
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

// INTERFACE UPDATERS
function updateTimerInterface(value) {
  refs.timerValueElem.innerHTML = formattedTimeValue(value);
}
function updateScoreInterface(value) {
  refs.scoreValueElem.innerHTML = value;
}

function updateFormStatus(str) {
  refs.formStatusElem.innerHTML = str;
}

// LOGIC & EVENT HANDLERS
const handleSetTimerValue = () => {
  gameState.timerValue -= 1;
};

const handleStartGame = () => {
  if (gameState.gameStatus === GAME_STATUS.GAME_OVER) return;
  if (gameState.timerValue === INITIAL_TIMER_VALUE || gameState.gameStatus === GAME_STATUS.PAUSE) {
    const prevStatusGame = gameState.gameStatus;
    gameState.gameStatus = GAME_STATUS.GAME_ON;
    intervalId = setInterval(() => {
      handleSetTimerValue();
      updateTimerInterface(gameState.timerValue);
      if (gameState.squaresIdList.length <= 1) {
        const newRandomNumbers = getUniqNumbersList(gameState.squaresIdList);
        gameState.squaresIdList.push(...newRandomNumbers);
        setActiveClassForElements(newRandomNumbers, refs.squaresListElem);
      }
      if (gameState.timerValue === 0) {
        gameState.gameStatus = GAME_STATUS.GAME_OVER;
        clearInterval(intervalId);
        refs.formScoreElem.innerHTML = gameState.scoreValue;
        refs.modalElem.classList.remove('modal-closed');
      }
    }, 1000);
    if (prevStatusGame === GAME_STATUS.PENDING) {
      setActiveClassForElements(gameState.squaresIdList, refs.squaresListElem);
    }
  } else {
    gameState.gameStatus = GAME_STATUS.PAUSE;
  }
};

const handleStartNewGame = () => {
  if (gameState.timerValue === INITIAL_TIMER_VALUE) return;
  if (gameState.timerValue !== 0) {
    clearInterval(intervalId);
  }
  gameState.gameStatus = GAME_STATUS.PENDING;
  gameState.scoreValue = 0;
  updateScoreInterface(gameState.scoreValue);
  gameState.timerValue = INITIAL_TIMER_VALUE;
  updateTimerInterface(gameState.timerValue);
  resetActiveClassForElements(gameState.squaresIdList, refs.squaresListElem);
  gameState.squaresIdList = getRandomNumbers(SQUARES_QTY, SQUARES_QTY_ON_FIELD);
};

const handleClickOnSquare = e => {
  const elemId = e.target.id;
  const isSquareActive = gameState.squaresIdList.indexOf(Number(elemId)) > -1;
  if (gameState.gameStatus === GAME_STATUS.GAME_ON && isSquareActive) {
    gameState.scoreValue += 1;
    updateScoreInterface(gameState.scoreValue);
    const newRandomNumbers = getUniqNumbersList(gameState.squaresIdList);
    e.target.classList.add(animationClasses.onSquareleft);
    setTimeout(() => {
      resetActiveClassForElem(e.target);
      e.target.classList.remove(animationClasses.onSquareleft);
    }, 1000);

    gameState.squaresIdList = [...gameState.squaresIdList.filter(item => item !== Number(elemId))];
    if (newRandomNumbers.length) {
      gameState.squaresIdList.push(...newRandomNumbers);
      setActiveClassForElements(newRandomNumbers, refs.squaresListElem);
    }
  }
};

const handleSubmitResultForm = async e => {
  e.preventDefault();
  const nameTargetValue = e.target[0].value;
  const data = {
    score: gameState.scoreValue,
  };
  try {
    const response = await postResult(data);
    const result = await response.json();

    if (result.error) {
      updateFormStatus(result.message);
    } else {
      await getRemoteResultsAndRender();
      refs.modalElem.classList.add('modal-closed');
    }
  } catch (e) {
    console.log(e);
  }
};

// EVENT LISTENERS
async function getRemoteResultsAndRender() {
  const results = await fetchTopResults().then(data => {
    refs.scoreListElem.innerHTML = data.map(
      item => `<li class='score-table__item'>${item.name} : ${item.score}</li>`,
    );
  });
}

refs.startButtonElem.addEventListener('click', handleStartGame);
refs.newGameButtonElem.addEventListener('click', handleStartNewGame);
refs.squaresListElem.addEventListener('click', handleClickOnSquare);
refs.resultFormElem.addEventListener('submit', handleSubmitResultForm);
refs.cancelResultElem.addEventListener('click', () => {
  refs.modalElem.classList.add('modal-closed');
});
