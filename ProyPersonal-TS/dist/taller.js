"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
class Centro {
    constructor(id, nombre, ciudad) {
        this.id = id;
        this.nombre = nombre;
        this.ciudad = ciudad;
    }
}
;
class Ruta {
    constructor(id, nombre, centro) {
        this.id = id;
        this.nombre = nombre;
        this.centro = centro;
    }
}
;
class Nivel {
    constructor(id, nombre, ruta, duracion) {
        this.id = id;
        this.nombre = nombre;
        this.ruta = ruta;
        this.duracion = duracion;
    }
}
;
class Camper {
    constructor(id, nombre, tipoI, numeroIdentificacion, nivel) {
        this.id = id;
        this.nombre = nombre;
        this.tipoI = tipoI;
        this.numeroIdentificacion = numeroIdentificacion;
        this.nivel = nivel;
    }
}
;
class Contrato {
    constructor(camper, nivel, tipoContrato) {
        this.camper = camper;
        this.nivel = nivel;
        this.tipoContrato = tipoContrato;
    }
}
;
const centros = [];
const rutas = [];
const niveles = [];
const campers = [];
let centroEncontrado = null;
function centro() {
    const cantidadCentros = readline_sync_1.default.questionInt('Ingrese la cantidad de Centros que tiene Campus: ');
    console.log("");
    for (let i = 0; i < cantidadCentros; i++) {
        const id = i + 1;
        const nombre = readline_sync_1.default.question(`Ingrese el nombre del Centro ${i + 1}: `);
        const ciudad = readline_sync_1.default.question(`Ingrese el nombre de la ciudad en la que se encuentra el Centro ${i + 1}: `);
        console.log("");
        const centro = { id, nombre, ciudad };
        centros.push(centro);
    }
    console.log(centros);
    console.log("");
    return centros;
}
function ruta() {
    const centroIngresado = readline_sync_1.default.question('Digite el nombre del Centro en el que desea ingresar: ');
    console.log("");
    for (const centroCampus of centros) {
        if (centroCampus.nombre === centroIngresado) {
            centroEncontrado = centroCampus;
            const cantidadRutas = readline_sync_1.default.questionInt(`Ingrese la cantidad de Rutas que tiene el Centro ${centroCampus.nombre}: `);
            console.log("");
            for (let i = 0; i < cantidadRutas; i++) {
                const id = i + 1;
                const nombre = readline_sync_1.default.question(`Ingrese el nombre de la Ruta ${i + 1}: `);
                console.log("");
                const ruta = { id, nombre, centro: centroCampus };
                rutas.push(ruta);
            }
            const rutasConNombreDeCentro = rutas.map(ruta => {
                return {
                    id: ruta.id,
                    nombre: ruta.nombre,
                    centro: ruta.centro.nombre
                };
            });
            console.log(rutasConNombreDeCentro);
            console.log("");
            return rutas;
        }
    }
}
let rutaEncontrada = null;
function nivel() {
    const rutaIngresada = readline_sync_1.default.question('Digite el nombre de la Ruta en la que desea ingresar: ');
    console.log("");
    for (const rutaCampus of rutas) {
        if (rutaCampus.nombre === rutaIngresada) {
            rutaEncontrada = rutaCampus;
            const cantidadNiveles = readline_sync_1.default.questionInt(`Ingrese la cantidad de Niveles que tiene la Ruta ${rutaCampus.nombre}: `);
            console.log("");
            for (let i = 0; i < cantidadNiveles; i++) {
                const id = i + 1;
                const nombre = readline_sync_1.default.question(`Ingrese el nombre del Nivel ${i + 1}: `);
                console.log("");
                const duracion = readline_sync_1.default.question(`Ingrese la duracion del Nivel ${i + 1}: `);
                console.log("");
                const nivel = { id, nombre, ruta: rutaCampus, duracion };
                niveles.push(nivel);
            }
            const nivelesConNombreDeRutas = niveles.map(nivel => {
                return {
                    id: nivel.id,
                    nombre: nivel.nombre,
                    ruta: nivel.ruta.nombre,
                    duracion: nivel.duracion
                };
            });
            console.log(nivelesConNombreDeRutas);
            console.log("");
            return niveles;
        }
    }
}
let nivelEncontrado = null;
function camper() {
    const centroIngresado = readline_sync_1.default.question('Digite el nombre del Centro en el que desea ingresar los Campers: ');
    console.log("");
    for (const centroCampus of centros) {
        if (centroCampus.nombre === centroIngresado) {
            centroEncontrado = centroCampus;
            const cantidadCampers = readline_sync_1.default.questionInt(`Ingrese la cantidad de Campers que tiene el Centro ${centroCampus.nombre}: `);
            console.log('');
            for (let i = 0; i < cantidadCampers; i++) {
                let tipoI = "";
                const id = i + 1;
                const nombre = readline_sync_1.default.question('Ingrese el nombre del Camper: ');
                const tiposIndentificacion = ['C.C', 'T.I'];
                const tipoIdentificacion = readline_sync_1.default.keyInSelect(tiposIndentificacion, 'Ingrese el tipo de documento del Camper: ');
                console.log("");
                if (tipoIdentificacion === 1) {
                    tipoI = "C.C";
                    console.log(`Has seleccionado: ${tipoI}`);
                    console.log("");
                    return tipoI;
                }
                if (tipoIdentificacion === 2) {
                    tipoI = "T.I";
                    console.log(`Has seleccionado: ${tipoI}`);
                    console.log("");
                    return tipoI;
                }
                else {
                    console.log('No seleccionaste ninguna opción.');
                    console.log("");
                }
                const numeroIdentificacion = readline_sync_1.default.questionInt('Ingrese el numero de documento del Camper (Sin Puntos): ');
                console.log("");
                let nivelIngresado;
                do {
                    nivelIngresado = readline_sync_1.default.question('Ingrese el nombre del Nivel en el que se encuentra el Camper: ');
                    console.log('');
                } while (!niveles.some(nivel => nivel.nombre === nivelIngresado));
                const nivelEncontrado = niveles.find(nivel => nivel.nombre === nivelIngresado);
                const camper = { id, nombre, tipoI, numeroIdentificacion, nivel: nivelEncontrado };
                campers.push(camper);
            }
            const campersConNombreDeNiveles = campers.map(camper => {
                return {
                    id: camper.id,
                    nombre: camper.nombre,
                    tipoIdentificacion: camper.tipoI,
                    numeroIdentificacion: camper.numeroIdentificacion,
                    nivel: camper.nivel.nombre
                };
            });
            console.log(campersConNombreDeNiveles);
            console.log("");
            return campers;
        }
    }
}
const option = -1;
while (option != 0) {
    console.log('');
    console.log('---------- CAMPUS ----------');
    console.log('1. Ingresar Centros');
    console.log('2. Ingresar Rutas');
    console.log('3. Ingresar Niveles');
    console.log('4. Ingresar Campers');
    console.log('5. Ingresar Contratos');
    console.log('----------------------------');
    const opcion = readline_sync_1.default.questionInt('Ingresa la opcion que deseas: ');
    console.log('');
    switch (opcion) {
        case (1):
            centro();
            break;
        case (2):
            ruta();
            break;
        case (3):
            nivel();
            break;
        case (4):
            camper();
            break;
    }
}
