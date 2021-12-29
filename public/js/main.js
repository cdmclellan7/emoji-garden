const seedlingEmojiCode = 127793;
const tomatoEmojiCode = 127813;
const plantEmojiCode = 127807;

const spanHeight = 42;

const garden = document.querySelector("#garden");
//garden.addEventListener("click", plantSeed);

async function plantSeed(e) {
    const xPos = e.x;
    const yPos = e.y;
    const code = seedlingEmojiCode;

    const data = {
            code: code,
            xPos: xPos,
            yPos: yPos
    };
    const res = await fetch('/api/emojis', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    const json = await res.json();
    const newEmoji = json.payload;
    renderEmojis(newEmoji);
    
    startGrowing(newEmoji[0].id, e);
}

function addSpan(id, xPos, yPos, code) {
    const newSpan = document.createElement('span');
    newSpan.id = `emoji-${id}`;
    newSpan.classList.add('plant');
    newSpan.innerHTML = `&#${code};`;
    newSpan.style.fontSize = spanHeight + 'px';
    newSpan.style.position = 'absolute';
    newSpan.style.left = xPos - (spanHeight / 2) + 'px';
    newSpan.style.top = yPos - spanHeight + 'px';
    garden.appendChild(newSpan);
}

function updateEmojiCode(id, code) {
    const span = document.querySelector(`#emoji-${id}`);
    span.innerHTML = "";
    span.innerHTML = `&#${code};`;
    return span;
}

function makeEmojiActive(span) {
    span.classList.add("active");
    span.addEventListener("click", handleActiveClick);
}

function makeEmojiInactive(span) {
    span.classList.remove("active");
    span.removeEventListener("click", handleActiveClick);
}


/* CLEAR AND LOAD GARDEN */

/*
const clearButton = document.querySelector("#clear-garden");
const loadButton = document.querySelector("#load-garden");

clearButton.addEventListener("click", clearGarden);
loadButton.addEventListener("click", loadGarden);
*/

function clearGarden() {
    garden.innerHTML = "";
}

async function loadGarden() {
    const res = await fetch("/api/emojis");
    const json = await res.json();
    const emojis = json.payload;
    
    renderEmojis(emojis);
}

function renderEmojis(list) {
    list.forEach( (emoji) => {
        addSpan(emoji.id, emoji.x_position, emoji.y_position, emoji.dec_code);
    });
}

function clearOneEmoji(id) {
    const emoji = document.querySelector(`#emoji-${id}`);
    emoji.remove();
}

/* TIMER CONTROLS */
const pomodoroTime = 7000 //25 * 60 * 1000;
const breakTime = 5000 //5 * 60 * 1000;


function startGrowing(id, e) {
    removeTimers();
    const timer = createTimer(e);
    let countSeconds = pomodoroTime / 1000;
    const timerID = setInterval(() => decrementTimer(timer, countSeconds--), 1000);
    setTimeout( () => {
        maturePlant(id);
        stopTimer(timer, timerID);
        timer.innerText += " Click to start a break."
    }, pomodoroTime);
}

async function maturePlant(id) {
    const data = {code: tomatoEmojiCode};

    const res = await fetch(`/api/emojis/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    const json = await res.json();
    const newEmoji = json.payload;

    const span = updateEmojiCode(newEmoji[0].id, newEmoji[0].dec_code);
    makeEmojiActive(span);
}

function createTimer(e) {
    const timerP = document.createElement("p");
    timerP.classList.add("timer");
    timerP.style.left = e.pageX + spanHeight + 'px';
    timerP.style.top = e.pageY - (spanHeight) + 'px';
    garden.appendChild(timerP);
    return timerP;
}

function decrementTimer(p, count) {
    const seconds = count % 60;
    const minutes = Math.floor(count / 60);
    p.innerText = `${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
}

function stopTimer(p, timerID) {
    audio.play();
    p.innerText = "Time's up!";
    clearTimeout(timerID);
}

function removeTimers() {
    document.querySelectorAll('.timer').forEach(p => p.remove());
}

/*BREAK TIMER */
function handleActiveClick(e) {
    makeEmojiInactive(e.target);
    removeTimers();
    const timer = createTimer(e);
    let countSeconds = breakTime / 1000;
    const timerID = setInterval(() => decrementTimer(timer, countSeconds--), 1000);
    setTimeout( () => {
        stopTimer(timer, timerID);
        timer.innerText += " Plant a new seed."
        showSeed();
    }, breakTime);
}

/* START PAGE */
loadGarden();

/* FLOATING INITIAL SEED */
const initialSeed = document.querySelector("#seed-container");
initialSeed.addEventListener("click", stopSeed);
window.addEventListener("mousemove", moveSeed);

function moveSeed(e) {
    initialSeed.style.left = e.pageX - (spanHeight / 2) + 'px';
    initialSeed.style.top = e.pageY - (spanHeight) + 'px';
}

function stopSeed(e) {
    initialSeed.style.visibility = "hidden";
    plantSeed(e);
}

function showSeed() {
    initialSeed.style.visibility = "visible";
}

/* TIMER AUDIO */
const audio = new Audio('../sounds/bell.wav');
