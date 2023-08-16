import readLineSync from 'readline-sync'

class Centro {
    constructor(
        public readonly id: number,
        public nombre: string,
        public ciudad: string
    ) { }
};

class Ruta {
    constructor(
        public readonly id: number,
        public nombre: string,
        public centro: Centro
    ) { }
};

class Nivel {
    constructor(
        public readonly id: number,
        public nombre: string,
        public ruta: Ruta,
        public duracion: number
    ) { }
};

class Camper {
    constructor(
        public readonly id: number,
        public nombre: string,
        public tipoIdentificacion: string,
        public numeroIdentificacion: number,
        public nivel: Nivel
    ) { }
};

class Contrato {
    constructor(
        public readonly id: number
    ) { }
};

const cantidadCentros = readLineSync.questionInt('Ingrese la cantidad de Centros que tiene Campus: ');
console.log("");


const centros: Centro[] = [];

for (let i = 0; i < cantidadCentros; i++) {
    const id = i + 1;
    const nombre = readLineSync.question(`Ingrese el nombre del Centro ${i + 1}: `);
    const ciudad = readLineSync.question(`Ingrese el nombre de la ciudad en la que se encuentra el Centro ${i + 1}: `);
    console.log("");
    const centro: Centro = { id, nombre, ciudad };
    centros.push(centro)
}
console.log(centros);
console.log("");

const centroIngresado = readLineSync.question('Digite el nombre del Centro en el que desea ingresar: ');
console.log("");

const option: number = -1;

let centroEncontrado: Centro | null = null;

const rutas: Ruta[] = [];

while (option != 0) {
    for (const centroCampus of centros) {
        if (centroCampus.nombre === centroIngresado) {
            centroEncontrado = centroCampus;

            const cantidadRutas = readLineSync.questionInt(`Ingrese la cantidad de rutas que tiene ${centroCampus.nombre}: `);
            console.log("");

            for (let i = 0; i < cantidadRutas; i++) {
                const id = i + 1;
                const nombre = readLineSync.question(`Ingrese el nombre de la Ruta ${i + 1}: `);
                console.log("");
                const ruta: Ruta = { id, nombre, centro: centroCampus };
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

