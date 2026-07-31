// ===== ELEMENTS =====

const countInput = document.getElementById("countInput");
const removeWinner = document.getElementById("removeWinner");

const createBtn = document.getElementById("createBtn");
const buildWheelBtn = document.getElementById("buildWheelBtn");
const spinBtn = document.getElementById("spinBtn");
const resetBtn = document.getElementById("resetBtn");

const error = document.getElementById("error");

const namesContainer = document.getElementById("namesContainer");
const wheelSection = document.getElementById("wheelSection");

const wheel = document.getElementById("wheel");

const result = document.getElementById("result");

// ===== DATA =====

let players = [];
let colors = [];
let currentRotation = 0;
let isSpinning = false;

// ===== RANDOM COLOR =====

function randomColor() {

    const hue = Math.floor(Math.random() * 360);

    return `hsl(${hue},70%,55%)`;

}

// ===== CREATE INPUTS =====

createBtn.addEventListener("click", createInputs);

countInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {

        createInputs();

    }

});

function createInputs() {

    error.textContent = "";

    namesContainer.innerHTML = "";

    wheelSection.classList.add("hidden");

    result.innerHTML = "";

    const count = Number(countInput.value);

    if (isNaN(count)) {

        error.textContent = "Hãy nhập số lượng.";

        return;

    }

    if (count < 2) {

        error.textContent = "Ít nhất phải có 2 đối tượng.";

        return;

    }

    if (count > 20) {

        error.textContent = "Chỉ được nhập tối đa 20 đối tượng.";

        return;

    }

    namesContainer.classList.remove("hidden");

    for (let i = 0; i < count; i++) {

        const row = document.createElement("div");

        row.className = "name-row";

        row.innerHTML = `

            <span>Tên ${i + 1}</span>

            <input
                type="text"
                class="player-input"
                maxlength="40"
                placeholder="Nhập tên">

        `;

        namesContainer.appendChild(row);

    }

    const button = document.createElement("button");

    button.textContent = "🎡 TẠO VÒNG QUAY";

    button.id = "generateWheel";

    button.onclick = prepareWheel;

    namesContainer.appendChild(button);

}

// ===== VALIDATE =====

function prepareWheel() {

    error.textContent = "";

    result.innerHTML = "";

    players = [];

    colors = [];

    const inputs = document.querySelectorAll(".player-input");

    const used = new Set();

    for (const input of inputs) {

        const name = input.value.trim();

        if (!name) {

            error.textContent = "Không được để trống tên.";

            return;

        }

        const key = name.toLowerCase();

        if (used.has(key)) {

            error.textContent = "Tên bị trùng.";

            return;

        }

        used.add(key);

        players.push(name);

        colors.push(randomColor());

    }

    wheelSection.classList.remove("hidden");

    drawWheel();

    console.log(players);

    console.log(colors);
// ===== RANDOM =====

function secureRandom(max){

    const array = new Uint32Array(1);

    crypto.getRandomValues(array);

    return array[0] % max;

}
    spinBtn.addEventListener("click", spin);
    function spin(){

    if(isSpinning) return;

    if(players.length===0) return;

    isSpinning=true;

    spinBtn.disabled=true;

    result.innerHTML="";

    const winnerIndex=secureRandom(players.length);

    const slice=360/players.length;

    const centerAngle=winnerIndex*slice+slice/2;

    const extraTurns=6+secureRandom(3);

    const finalRotation=

        currentRotation+

        extraTurns*360+

        (360-centerAngle);

    currentRotation=finalRotation;

    wheel.style.transform=

        `rotate(${finalRotation}deg)`;

    wheel.ontransitionend=()=>{

        wheel.ontransitionend=null;

        finishSpin(winnerIndex);

    };
function spin(){

    if(isSpinning) return;

    if(players.length===0) return;

    isSpinning=true;

    spinBtn.disabled=true;

    result.innerHTML="";

    const winnerIndex=secureRandom(players.length);

    const slice=360/players.length;

    const centerAngle=winnerIndex*slice+slice/2;

    const extraTurns=6+secureRandom(3);

    const finalRotation=

        currentRotation+

        extraTurns*360+

        (360-centerAngle);

    currentRotation=finalRotation;

    wheel.style.transform=

        `rotate(${finalRotation}deg)`;

    wheel.ontransitionend=()=>{

        wheel.ontransitionend=null;

        finishSpin(winnerIndex);

    };

}
}
}
// ===== SVG WHEEL =====

function polarToCartesian(radius, angle) {

    return {

        x: radius * Math.cos(angle),

        y: radius * Math.sin(angle)

    };

}

function createSlice(startAngle, endAngle, color) {

    const radius = 240;

    const start = polarToCartesian(radius, startAngle);

    const end = polarToCartesian(radius, endAngle);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    return `

        M 0 0
        L ${start.x} ${start.y}
        A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}
        Z

    `;

}

function drawWheel() {

    wheel.innerHTML = "";

    const count = players.length;

    const slice = (Math.PI * 2) / count;

    for (let i = 0; i < count; i++) {

        const start = -Math.PI / 2 + i * slice;

        const end = start + slice;

        const path = document.createElementNS(

            "http://www.w3.org/2000/svg",

            "path"

        );

        path.setAttribute(

            "d",

            createSlice(start, end, colors[i])

        );

        path.setAttribute("fill", colors[i]);

        path.setAttribute("stroke", "#ffffff");

        path.setAttribute("stroke-width", "2");

        wheel.appendChild(path);

        //--------------------------------------

        const mid = (start + end) / 2;

        const pos = polarToCartesian(150, mid);

        const text = document.createElementNS(

            "http://www.w3.org/2000/svg",

            "text"

        );

        text.setAttribute("x", pos.x);

        text.setAttribute("y", pos.y);

        text.setAttribute(

            "transform",

            `rotate(${mid * 180 / Math.PI + 90} ${pos.x} ${pos.y})`

        );

        text.setAttribute("fill", "white");

        text.setAttribute("font-weight", "bold");

        text.setAttribute("font-size", "16");

        text.setAttribute("text-anchor", "middle");

        text.setAttribute("dominant-baseline", "middle");

        text.textContent = players[i].toUpperCase();

        wheel.appendChild(text);

    }

    spinBtn.disabled = false;

}
