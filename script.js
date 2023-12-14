let numIntentos = 6;
const UrlAPI = 'https://random-word-api.herokuapp.com/word?length=5'; //URL de la API de palabra aleatoria.
/*let diccionario = ['APPLE', 'MOUSE', 'SOUND', 'HOUSE'];
const palabra = diccionario[Math.floor(Math.random()*diccionario.length)];*/

//Obtenemos una palabra aleatoria de la API o del array "diccionario".
fetch(UrlAPI).then(response => response.json())
    .then(response => {
        /*palabra = removeAccents(response[0].toUpperCase());*/
        palabra = response[0].toUpperCase();
        //console.log(palabra);
    })
    .catch(err => {
        console.log('Hubo un problema con la API');
        let diccionario = ['APPLE', 'MOUSE', 'SOUND', 'HOUSE', 'RESET', 'STYLE', 'ERROR', 'HAPPY', 'PLANE', 'PRINT'];
        palabra = diccionario[Math.floor(Math.random()*diccionario.length)];
        //console.log("ERROR:", palabra);
    })

const ERROR1 = document.getElementById('error1');
const ERROR2 = document.getElementById('error2');
const BUTTON = document.getElementById('guess-button');

//Inicia el juego al apretar "Enter".
const ENTRADA = document.getElementById('guess-input');
ENTRADA.addEventListener('keypress', ()=> {
    if (event.key === "Enter"){
        BUTTON.click();
    }
})

//Inicia el juego al hacer clic en el botón de "Intentar".
BUTTON.addEventListener('click', ()=> {
    ERROR1.style.display = 'none';
    ERROR2.style.display = 'none';
    //Cargamos la palabra introducida y nos aseguramos que tenga 5 letras.
    const INPUT = leerIntento();
    if (INPUT.length === 5){
        //En caso de adivinar la palabra, el usuario gana y finaliza el juego.
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
            finalizar("<h1>!HAS GANADO!</h1>", "Jugar de nuevo");
            return
        }
        const GRID = document.getElementById('grid');
        const ROW = document.createElement('div');
        ROW.className = 'row';
        //En caso de no adivinar la palabra, se comprueban las letras.
        for (let i in palabra){
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            //Si la letra se encuentra en el lugar correcto.
            if (INPUT[i] === palabra[i]){
                SPAN.innerHTML = INPUT[i];
                SPAN.style.backgroundColor = '#79b851';
                document.getElementById('guess-input').value = '';
            }
            //Si la letra está en la palabra, pero en el lugar incorrecto.
            else if (palabra.includes(INPUT[i])){
                SPAN.innerHTML = INPUT[i];
                SPAN.style.backgroundColor = '#f3c237';
                document.getElementById('guess-input').value = '';
            }
            //Si la letra no forma parte de la palabra.
            else {
                SPAN.innerHTML = INPUT[i];
                SPAN.style.backgroundColor = '#a4aec4';
                document.getElementById('guess-input').value = '';
            }
            ROW.appendChild(SPAN) 
        }
        GRID.appendChild(ROW)
        //Contamos los intentos y finaliza el juego en caso de terminar los mismos.
        numIntentos--;
        if (numIntentos == 0){
            finalizar("<h1>!HAS PERDIDO!</h1>", "Intentar de nuevo");
            return
        }
    }
    //Mostramos un error si no se introduce ninguna palabra.
    else if (INPUT.length === 0){
        ERROR1.style.display = 'block';
    }
    //Mostramos un error si la palabra introducida no posee 5 letras.
    else {
        ERROR2.style.display = 'block';
    }
})

//Función para captar la palabra introducida, sacar espacios y ponerla en mayúsculas.
function leerIntento(){
    let intento = document.getElementById('guess-input');
    intento = intento.value;
    intento = intento.trim();
    intento = intento.toUpperCase();
    return intento;
}

//Función para imprimir el mensaje de fin de juego y el botón para reiniciar el juego.
function finalizar(mensaje1, mensaje2){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje1;
    const RESET = document.getElementById('reset');
    RESET.innerHTML = mensaje2;
    RESET.style.display = 'block';
}

//Función para recargar la página para reiniciar el juego.
function refreshPage(){
    window.location.reload();
}