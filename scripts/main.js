const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const textArea = document.querySelector('textarea');
const p = document.querySelector('.board-wrapper .text');
const resetButton = document.querySelector('.reset-btn');
let startTime;
let firstType;
let finished = 0;

const emptyArea = () => textArea.value = '';

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content);
}

async function renderQuote() {
    const quote = await getRandomQuote();
    p.innerHTML = quote;
    firstType = true;
    emptyArea();
}

function typed() {
    if (firstType) startTimer();
    firstType = false;
    setTimeout(() => {
        const val = this.value;
        const pattern = '^' + val;
        const regExp = new RegExp(pattern);
        setTimeout(() => { markTyped(regExp) });
    });
}

function markTyped(regExp) {
    const match = (p.textContent.match(regExp) || [''])[0];
    if (match === '') {
        if (!textArea.value.length) {
            p.innerHTML = p.textContent;
        }
        return;
    }
        p.innerHTML = '<span class="marked">' + p.textContent.slice(0, match.length) + '</span>' + p.textContent.slice(match.length);
        if (match.length === p.textContent.length) {
            finish();
        }
}

function finish() {
    finished++;
    document.querySelector('footer .finished-count').textContent = finished;
    renderQuote();
}

const getTimeDif = (date) => Math.floor((new Date() - date) / 1000);

function startTimer() {
    startTime = new Date();
    const timeSpan = document.querySelector('.content-wrapper .timer');
    setInterval(() => {
        timeSpan.textContent = getTimeDif(startTime);
    }, 1000);
}

textArea.addEventListener('keydown', typed);
resetButton.addEventListener('click', renderQuote);
renderQuote();