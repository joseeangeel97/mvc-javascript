// Modelo: Contiene los datos en arrays
//import { formulario } from './contolador.js';
export const colores = ['rgba(255, 204, 0, 0.4)', 'rgba(255, 204, 0, 0.2)'];

//Expresion regular para codigo de los cursos, 9 caracteres: tres letras, tres números, el símbolo “/” y dos números que indiquen el año
export let regEx = /^[A-Z]{3}\d{3}\/\d{2}$/;

//Expresion regular para el nombre de los cursos

export let nameregEx = /^[A-Z][a-zA-Z ]{4,99}$/;

//Funciones para obtener los colores al obtener y perder el foco
export const getColorHover = [
  function () {
    return colores[0];
  },
];

export const getColorNormal = [
  function () {
    return colores[1];
  },
];

//Datos del formulario
export const datosForm = [];
export let nombres = [];

export let codigos = [];
//Array con cursos ocultos
export const oculto = [
  ['Aterrizaje forzoso', 'ABC123/04'],
  ['Hejka', 'ABC123/03'],
  ['Dzień dobry', 'ABC123/00'],
  ['Every Tom, Dick and Harry cand do it', 'ABC123/01'],
  ['Dobrze', 'ABC123/05'],
  ['Słodka dziewczyna', 'SPP001/01'],
  ['Pan', 'SPP002/01'],
  ['Pan bóg', 'SPP003/01'],
  ['Pan ma rację', 'SPP004/01'],
];
//Array para el contador
export const allData = [];
//Introduccion de los datos ocultos en el contador
for (let i = 0; i < oculto.length; i++) {
  //Destructuring del array
  const [nombre, codigo] = oculto[i];
  console.log(nombre);
  allData.push(nombre);
}

console.log(allData);
