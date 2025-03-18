const emojis = ['🎮', '🎲', '🎯', '🎨', '🎸', '🎭', '🎪', '🎫'];
const cards = [...emojis, ...emojis];
let flippedCards = [];
let moves = 0;
let time = 0;
let timer;

const flipSound = document.getElementById('flipSound');
const matchSound = document.getElementById('matchSound');
const winSound = document.getElementById('winSound');
const mismatchSound = document.getElementById('mismatchSound');

function initGame() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    cards.sort(() => Math.random() - 0.5);

    cards.forEach((emoji) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = emoji;
        card.innerHTML = `<span style="display: none;">${emoji}</span>`;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });

    timer = setInterval(() => {
        time++;
        document.getElementById('time').textContent = time;
    }, 1000);
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        flipSound.play();
        this.classList.add('flipped');
        this.children[0].style.display = 'block';
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            document.getElementById('moves').textContent = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchSound.play();
        flippedCards = [];
        if (document.querySelectorAll('.flipped').length === cards.length) {
            clearInterval(timer);
            winSound.play();
            setTimeout(() => alert(`🎉 فوز! الوقت: ${time} ثانية - المحاولات: ${moves}`), 500);
        }
    } else {
        mismatchSound.play();
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.children[0].style.display = 'none';
            card2.children[0].style.display = 'none';
            flippedCards = [];
        }, 1000);
    }
}

function restartGame() {
    clearInterval(timer);
    time = 0;
    moves = 0;
    document.getElementById('time').textContent = time;
    document.getElementById('moves').textContent = moves;
    initGame();
}

window.onload = initGame;
