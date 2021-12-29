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
    
    startGrowing(newEmoji[0].id);
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

function startGrowing(id) {
    setTimeout( () => maturePlant(id), 5000);
}

async function maturePlant(id) {
    const data = {code: plantEmojiCode};

    const res = await fetch(`/api/emojis/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    const json = await res.json();
    const newEmoji = json.payload;
    clearOneEmoji(newEmoji[0].id)
    renderEmojis(newEmoji);
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