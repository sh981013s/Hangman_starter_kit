const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrongLetters');
const playAgainBtn = document.getElementById('playAgainButton');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('finalMessage');
const livesCnt = document.getElementById('livesCnt');

const figureParts = document.querySelectorAll('.figure-part');


let entireWords = [];
let targetWord = '';
let correctLetters = [];
let wrongLetters = [];
let lives = 6;

// get Random Words and set target word
const getRandomWord = async () => {
    const res = await fetch('https://random-word-api.herokuapp.com/all');
    const data = await res.json();
    entireWords = data;
    targetWord = entireWords[Math.floor(Math.random() * entireWords.length)];
}

// show hidden word
const displayWord = () => {
    wordEl.innerHTML = `
    ${targetWord
        .split('')
        .map(letter => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `).join('')
    }
    `

    const innerWord = wordEl.innerText.replace(/\n/g, '');
    if (innerWord === targetWord) {
        finalMessage.innerText = `Congrats! You won :)`
        popup.style.display = 'flex';
    }
}

const init = async () => {
    await getRandomWord();
    displayWord();
}

init();

//life counter
const lifeCounter = () => {
    if (lives === 6) {
        return `❤️❤️❤️❤️❤️❤️`
    } else if (lives === 5) {
        return `❤️❤️❤️❤️❤️`
    } else if (lives === 4) {
        return `❤️❤️❤️❤️`
    } else if (lives === 3) {
        return `❤️❤️❤️`
    } else if (lives === 2) {
        return `❤️❤️️`
    } else {
        return `❤️`
    }
}

// Update the wrong letters
const updateWrongLettersEl = () => {
    // display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `${letter}`)}
    `
    // display parts
    figureParts.forEach((part, idx) => {
        const errors = wrongLetters.length;
        if (idx < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    // decrease life
    lives -= 1;
    livesCnt.innerHTML = `lives : ${lifeCounter()}`

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = `You lost :( the answer was ${targetWord}`
        popup.style.display = 'flex';
    }


}

// show notification
const showNotification = msg => {
    notification.innerText = msg;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (targetWord.includes(letter)) {
            // 맞았을 때
            if (!correctLetters.includes(letter)) {
                // 이미 밎힌 단어가 아니라면
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification(`You have already used ${letter.toUpperCase()}`)
            }
        } else {
            // 틀렸을 떄
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification(`You have already used ${letter.toUpperCase()}`)
            }
        }
    }
})

// restart game and play again
playAgainBtn.addEventListener('click', () => {
    console.log('clicked')
    // reinitialize vars
    correctLetters.splice(0);
    wrongLetters.splice(0);

    targetWord = entireWords[Math.floor(Math.random() * entireWords.length)];

    displayWord();
    updateWrongLettersEl();

    lives = 6;
    livesCnt.innerText = `
    lives : ${lifeCounter()}
    `

    popup.style.display = 'none';
})

