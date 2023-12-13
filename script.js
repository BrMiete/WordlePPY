let numIntentos = 6;
let diccionario = ['APPLE', 'MOUSE', 'SOUND', 'HOUSE'];
const palabra = diccionario[Math.floor(Math.random()*diccionario.length)];

const ERROR1 = document.getElementById('error1');
const ERROR2 = document.getElementById('error2');
const BUTTON = document.getElementById('guess-button');
BUTTON.addEventListener('click', ()=> {
    ERROR1.style.display = 'none';
    ERROR2.style.display = 'none';
    const INPUT = leerIntento();
    if (INPUT.length === 5){
        if (INPUT === palabra){
            const GRID = document.getElementById('grid');
            const ROW = document.createElement('div');
            ROW.className = 'row';
            for (let i in palabra){
                const SPAN = document.createElement('span');
                SPAN.className = 'letter';
                SPAN.innerHTML = INPUT[i];
                SPAN.style.backgroundColor = '#79b851';
                ROW.appendChild(SPAN)
            }
            GRID.appendChild(ROW)
            finalizar("<h1>!HAS GANADO!</h1>");
            const RESET = document.getElementById('reset');
            RESET.innerHTML = "Jugar de nuevo";
            RESET.style.display = 'block';
            return
        }
        const GRID = document.getElementById('grid');
        const ROW = document.createElement('div');
        ROW.className = 'row';
        for (let i in palabra){
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            if (INPUT[i] === palabra[i]){
                SPAN.innerHTML = INPUT[i];
                SPAN.style.backgroundColor = '#79b851';
            }
            else if (palabra.includes(INPUT[i])){
                SPAN.innerHTML = INPUT[i];
                SPAN.style.backgroundColor = '#f3c237';
            }
            else {
                SPAN.innerHTML = INPUT[i];
                SPAN.style.backgroundColor = '#a4aec4';
            }
            ROW.appendChild(SPAN) 
        }
        GRID.appendChild(ROW)
        numIntentos--;
        if (numIntentos == 0){
            finalizar("<h1>!HAS PERDIDO!</h1>");
            const RESET = document.getElementById('reset');
            RESET.innerHTML = "Intentar de nuevo";
            RESET.style.display = 'block';
            return
        }
    }
    else if (INPUT.length === 0){
        ERROR1.style.display = 'block';
    }
    else {
        ERROR2.style.display = 'block';
    }
})

function leerIntento(){
    let intento = document.getElementById('guess-input');
    intento = intento.value;
    intento = intento.trim();
    intento = intento.toUpperCase();
    return intento;
}

function finalizar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function refreshPage(){
    window.location.reload();
}