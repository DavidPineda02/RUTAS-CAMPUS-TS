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
        public duracion: string
    ) { }
};

class Camper {
    constructor(
        public readonly id: number,
        public nombre: string,
        public tipoI: string,
        public numeroIdentificacion: number,
        public nivel: Nivel
    ) { }
};

class Contrato {
    constructor(
        public camper: Camper, 
        public nivel: Nivel, 
        public tipoContrato: 'Remoto' | 'Presencial') 
        { }
};

const centros: Centro[] = [];

const rutas: Ruta[] = [];

const niveles: Nivel[] = [];

const campers: Camper[] = [];

let centroEncontrado: Centro | null = null;

function centro(){
    const cantidadCentros = readLineSync.questionInt('Ingrese la cantidad de Centros que tiene Campus: ');
    console.log("");

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

    return centros
}

function ruta(){
    const centroIngresado = readLineSync.question('Digite el nombre del Centro en el que desea ingresar: ');
    console.log("");

    for (const centroCampus of centros) {
        if (centroCampus.nombre === centroIngresado) {
            centroEncontrado = centroCampus;

            const cantidadRutas = readLineSync.questionInt(`Ingrese la cantidad de Rutas que tiene el Centro ${centroCampus.nombre}: `);
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
                }
            });

            console.log(rutasConNombreDeCentro);
            console.log("");

            return rutas
        }
    }
}

let rutaEncontrada: Ruta | null = null;

function nivel(){
    const rutaIngresada = readLineSync.question('Digite el nombre de la Ruta en la que desea ingresar: ');
    console.log("");

    for (const rutaCampus of rutas ) {
        if (rutaCampus.nombre === rutaIngresada){
            rutaEncontrada = rutaCampus;

            const cantidadNiveles = readLineSync.questionInt(`Ingrese la cantidad de Niveles que tiene la Ruta ${rutaCampus.nombre}: `);
            console.log("");

            for (let i = 0; i < cantidadNiveles; i++) {
                const id = i + 1;
                const nombre = readLineSync.question(`Ingrese el nombre del Nivel ${i + 1}: `);
                console.log("");
                const duracion = readLineSync.question(`Ingrese la duracion del Nivel ${i + 1}: `);
                console.log("");
                const nivel: Nivel = { id, nombre, ruta: rutaCampus, duracion };
                niveles.push(nivel);
            }

            const nivelesConNombreDeRutas = niveles.map(nivel =>{
                return {
                    id: nivel.id,
                    nombre: nivel.nombre,
                    ruta: nivel.ruta.nombre,
                    duracion: nivel.duracion
                }
            });

            console.log(nivelesConNombreDeRutas);
            console.log("");

            return niveles
        }
    }
}

let nivelEncontrado: Nivel | null = null;

function camper(){
    const centroIngresado = readLineSync.question('Digite el nombre del Centro en el que desea ingresar los Campers: ');
    console.log(""); 

    for (const centroCampus of centros){
        if (centroCampus.nombre === centroIngresado){
            centroEncontrado = centroCampus;

            const cantidadCampers = readLineSync.questionInt(`Ingrese la cantidad de Campers que tiene el Centro ${centroCampus.nombre}: `);
            console.log('');

            for (let i = 0; i < cantidadCampers; i++){
                let tipoI = "";
                const id = i + 1;
                const nombre = readLineSync.question('Ingrese el nombre del Camper: ');
                const tiposIndentificacion = ['C.C', 'T.I'];
                const tipoIdentificacion = readLineSync.keyInSelect(tiposIndentificacion, 'Ingrese el tipo de documento del Camper: ');
                console.log("");
                if(tipoIdentificacion === 1) {
                    tipoI = "C.C";
                    console.log(`Has seleccionado: ${tipoI}`);
                    console.log("");
                    return tipoI;
                }  
                if(tipoIdentificacion === 2){
                    tipoI = "T.I"
                    console.log(`Has seleccionado: ${tipoI}`);
                    console.log("");
                    return tipoI;
                } else {
                    console.log('No seleccionaste ninguna opción.');
                    console.log("");
                }
                const numeroIdentificacion = readLineSync.questionInt('Ingrese el numero de documento del Camper (Sin Puntos): ');
                console.log("");
                let nivelIngresado: string;
                do {
                    nivelIngresado = readLineSync.question('Ingrese el nombre del Nivel en el que se encuentra el Camper: ');
                    console.log('');
                } while (!niveles.some(nivel => nivel.nombre === nivelIngresado)); 

                const nivelEncontrado = niveles.find(nivel => nivel.nombre === nivelIngresado);

                const camper: Camper = { id, nombre, tipoI, numeroIdentificacion, nivel: nivelEncontrado! };
                campers.push(camper);
            }

            const campersConNombreDeNiveles = campers.map(camper =>{
                return {
                    id: camper.id,
                    nombre: camper.nombre,
                    tipoIdentificacion: camper.tipoI,
                    numeroIdentificacion: camper.numeroIdentificacion,
                    nivel: camper.nivel.nombre
                }
            });

            console.log(campersConNombreDeNiveles);
            console.log(""); 
            
            return campers
        }
    }
}

const option: number = -1;

while (option != 0) {
    console.log('');
    console.log('---------- CAMPUS ----------');
    console.log('1. Ingresar Centros');
    console.log('2. Ingresar Rutas');
    console.log('3. Ingresar Niveles');
    console.log('4. Ingresar Campers');
    console.log('5. Ingresar Contratos');
    console.log('----------------------------');
    
    const opcion = readLineSync.questionInt('Ingresa la opcion que deseas: ');
    console.log('');
    

    switch (opcion){
        case(1): centro();
            break
        case(2): ruta();
            break
        case(3): nivel();
            break
        case(4): camper();
            break
    }
}


