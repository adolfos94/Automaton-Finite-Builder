// I.S. Adolfo Solis Rosas
// 3/Abril/2018
// Maestria Ciencias de la Computación
// Automatas y Lenguajes Formales
// PROYECTO FINAL

/*
AUTOMATA BUILDER - CREADOR DE AUTOMATAS FINITOS
*/


// IMPORTS
var colors = require('colors');
var readlineSync = require('readline-sync');


console.log(colors.yellow("\n**********************************\n**\t\t\t\t**\n**\tAUTOMATA BUILDER\t**\n**\t\t\t\t**\n**********************************\n"))

class Automata {
    constructor(name, estado, transitions) {
        this.name = name;
        this.estado = estado;
        this.transitions = transitions;
    }
}


var numStates = readlineSync.questionInt('Ingresa el número de estados del Automata: ')

var indexWhileStates = 0;
var automatasArray = [];
while (indexWhileStates < numStates) {
    var nameState = readlineSync.question('\nIngresa el nombre del estado q' + indexWhileStates + ': ', {
        defaultInput: 'q' + indexWhileStates
    });

    typeState = ['Initial', 'NonAccept', 'Final'],
        indexTypeState = readlineSync.keyInSelect(typeState, 'Define el tipo de estado: ');

    var transitionsArray = [];
    while (readlineSync.keyInYN('Agregar transición: ')) {
        var toAutomata = readlineSync.questionInt("Transición del estado'" + nameState + "'al estado 'q': ");
        var _transition = readlineSync.question("Transición: ");

        transitionsArray.push({
            toAutomata: toAutomata,
            _transition: _transition
        })
    }
    automatasArray.push(new Automata(nameState, typeState[indexTypeState], transitionsArray))

    indexWhileStates++;
}

console.log(colors.underline.green("\nAutomata Creado Exitosamente!\n"));

typeState = ['Evaluar Cadena'],
    indexTypeState = readlineSync.keyInSelect(typeState, 'Elige una opción: ');

while (typeState[indexTypeState] != undefined) {

    var cadena = readlineSync.question('Ingresa la cadena a evaluar para el automata creado: ')

    var automataAccepted = false;
    var automataIndex = 0;
    var automata = automatasArray[automataIndex];

    console.log(colors.cyan("\nEvaluando: " + cadena + "\n"));

    for (var i = 0; i < cadena.length; i++) {
        var letra = cadena[i];

        console.log(automata)

        for (j = 0; j < automata.transitions.length; j++) {
            console.log(colors.green("Letra: " + letra + " -> transition: " + automata.transitions[j]._transition))
            if (automata.transitions[j]._transition == letra) {
                automataAccepted = true;
                automataIndex = automata.transitions[j].toAutomata;
                break;
            } else {
                automataAccepted = false;
            }
        }
        automata = automatasArray[automataIndex];
        console.log(colors.blue("\t |\n\t |\n\t |\n\t\\|/"))

        if (!automataAccepted)
            break;
    }

    if (automata.estado != "Final") {
        automataAccepted = false;
        console.log(colors.magenta("El estado no es final"))
    }

    if (automataAccepted)
        console.log(colors.italic.underline.red("¡Cadena aceptada!"))
    else
        console.log(colors.red("¡ERROR!"))


    typeState = ['Evaluar Cadena'],
        indexTypeState = readlineSync.keyInSelect(typeState, 'Elige una opción: ');
}
console.log(colors.yellow("Finalizó Programa..."));