import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
// 🚫 No eliminar las líneas de arriba ⬆️

// ✍️ Escribe tu código aquí 👇

/* (dia 9) https://github.com/JCerdanv/objetos-interfaces-nuevasfunciones.git */

const systemName: string = "LogSystem";
const version: number = 12.9;
const userName: string = "JCerdan";

console.log( "============== M * M =====================");
console.log( "    Nombre del sisTema " + systemName + " v" + version);
console.log( "    ¡Bienvenido, [" + userName + "]!");
console.log( "==========================================\n");

interface Tarea {
  id: number;
  title: string;
  completed: boolean;
}

const answer = await rl.question("¿Cuál es tu nombre? ");
console.log(`Hola, ${answer}!`);

let opcionJ: string = " ";

// cambio el tipo de string[] a Tarea[]
let tareaJ: Tarea[] = []; 

// Contador agregar IDs únicos secuenciales
let idContador: number = 1;



// === funciones Arrow para cada opcion ===

const addTask = (title: string): void => {
  if (title.trim() !== "") { 
    const objetoTarea: Tarea = { 
      id: idContador, 
      title: title.trim(), 
      completed: false 
    }; 
    tareaJ.push(objetoTarea); 
    console.log(` Tarea "[ID: ${idContador}] ${title}" se agregó.`); 
    idContador++; 
  } else { 
    console.log(" > El titulo de la tarea no debe estar vacio."); 
  }
};

const removeTask = (): void => {
  if (tareaJ.length > 0) { 
    const eliminada = tareaJ.pop(); 
    console.log(` Se eliminó la última tarea: "${eliminada?.title}"`); 
  } else { 
    console.log(" > No hay tareas en lista por eliminar."); 
  }
};

// marcar
const markCompleted = (id: number): void => {
  const tarea = tareaJ.find((t) => t.id === id);
  if (tarea) {
    tarea.completed = true;
    console.log(`Tarea con ID ${id} marcada como completada.`);
  } else {
    console.log(` > No se encontró ninguna tarea con el ID ${id}.`);
  }
};

// pendientes

const filterPending = (): Tarea[] => {
  return tareaJ.filter((t) => !t.completed);
};

// completadas

const filterCompleted = (): Tarea[] => {
  return tareaJ.filter((t) => t.completed);
};

// listar filtradas
const printFilteredTasks = (tasks: Tarea[], titulo: string): void => {
  console.log(`\n->>> ${titulo} <<<-`);
  if (tasks.length === 0) {
    console.log(" > No hay tareas en esta categoría.");
  } else {
    tasks
      .map(({ id, title, completed }) => {
        const estado = completed ? "completed" : "pending";
        return `[${id}] ${title} - ${estado}`;
      })
      .forEach((taskString) => console.log(taskString));
  }
};

//

const listTasks = (): void => {
  console.log("\n->>>  LISTA  DE  TAREAS  <<<-"); 
  if (tareaJ.length === 0) { 
    console.log(" > No hay tareas registradas."); 
  } else { 
    for (let i = 0; i < tareaJ.length; i++) { 
      const estado = tareaJ[i].completed ? "completed" : "pending";
      console.log(`[${tareaJ[i].id}] ${tareaJ[i].title} - ${estado}`); 
    } 
  } 
};

// === tareras ===

do {   
    console.log( `\n====m|     MENU DE TAREAS   v${version}   |m====`);
    console.log( "     a  =  Agregar nueva tarea a lista  ");
    console.log( "     e  =  Eliminar ultima tarea de lista ");
    console.log( "     l  =  Lista de todas tareas ");

    console.log( "     m  =  Marcar tarea como completada ");
    console.log( "     p  =  Lista tareas pendientes ");
    console.log( "     c  =  Lista tareas completadas ");

    console.log( "     s  =  Salir del menu  ");

    
  
    opcionJ = await rl.question("Elija una letra: "); 
  
    switch (opcionJ.trim().toLowerCase()) { 
    case "a": 
      const nuevaTarea = await rl.question("Ingresa el título de la tarea: "); 
      addTask(nuevaTarea);
      break; 
      
    case "e": 
      removeTask();
      break; 
      
    case "l": 
      listTasks();
      break;

    case "m":
        if (!(tareaJ.length === 0)) {
            const idInput = await rl.question("ID de la tarea a completar: ");
            const idParaCompletar = parseInt(idInput.trim(), 10);
            if (!isNaN(idParaCompletar)) {
               markCompleted(idParaCompletar);
            } else {
            console.log(" > Por favor, ingresa no. de ID valido.");
            }
        } else {
            console.log(" > No hay tareas en lista para marcar como completadas.");
        }
      break;  
      
    case "p":
      printFilteredTasks(filterPending(), " 😢 Tareas pendientes...");
      break;

    case "c":
      printFilteredTasks(filterCompleted(), " 👍🏼 Tareas completadas... ");
      break;

    case "s": 
      console.log(` "Gracias por probar la nueva App v${version}... vuelve pronto!" \n`); 
      break; 
      
    default: 
      console.log(` > ${answer}, por favor, debes usar las opciones sugeridas\n`); 
      break; 
    } 
} while (opcionJ.trim().toLowerCase() !== "s"); 



// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();

// Jncv (dia 9)
