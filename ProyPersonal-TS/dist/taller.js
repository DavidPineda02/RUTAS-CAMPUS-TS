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
    constructor(id, nombre, tipoIdentificacion, numeroIdentificacion, nivel) {
        this.id = id;
        this.nombre = nombre;
        this.tipoIdentificacion = tipoIdentificacion;
        this.numeroIdentificacion = numeroIdentificacion;
        this.nivel = nivel;
    }
}
;
class Contrato {
    constructor(id) {
        this.id = id;
    }
}
;
const cantidadCentros = readline_sync_1.default.questionInt('Ingrese la cantidad de Centros que tiene Campus: ');
console.log("");
const centros = [];
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
const centroIngresado = readline_sync_1.default.question('Digite el nombre del Centro en el que desea ingresar: ');
console.log("");
const option = -1;
let centroEncontrado = null;
const rutas = [];
while (option != 0) {
    for (const centroCampus of centros) {
        if (centroCampus.nombre === centroIngresado) {
            centroEncontrado = centroCampus;
            const cantidadRutas = readline_sync_1.default.questionInt(`Ingrese la cantidad de rutas que tiene ${centroCampus.nombre}: `);
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
        }
    }
}
