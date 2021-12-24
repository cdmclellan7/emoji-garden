const garden = document.querySelector("#garden");
garden.addEventListener("click", plantSeed);

function plantSeed(e) {
    const xPos = e.x;
    const yPos = e.y;

    addSpan(xPos, yPos);
}

function addSpan(xPos, yPos) {
    const newSpan = document.createElement('span');
    newSpan.classList.add('plant');
    newSpan.innerHTML = `&#127803;`;
    const spanHeight = 42;
    newSpan.style.fontSize = spanHeight + 'px';
    newSpan.style.position = 'absolute';
    newSpan.style.left = xPos - (spanHeight / 2) + 'px';
    newSpan.style.top = yPos - spanHeight + 'px';
    garden.appendChild(newSpan);
}