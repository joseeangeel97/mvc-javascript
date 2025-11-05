// Vista: Se encarga de la manipulación del DOM en arrays
import { regEx, nameregEx } from './modelo.js';
export const inputBackG = [
  // Actualiza el color de fondo de un input
  function updateBackground(input, color) {
    input.style.backgroundColor = color;
  },

  // Obtiene todos los inputs de tipo text
  function getInputs() {
    return document.querySelectorAll("input[type='text']");
  },

  //Devolucion de todos los carecteres en mayusculas

  function upperCase(parameter) {
    parameter.value = parameter.value.toUpperCase();
  },
  //Introducion de codigo mediante regEx
  function codigoRegex(parameter) {
    //Guarda el valor en una variable
    const valor = parameter.value;
    //Cpmprobacion si el valor de la variable coincidide con lo indicado por la expresion regular
    if (!regEx.test(valor)) {
      alert(`El código fue mal introducido, debe contener 9 caracteres: tres letras, tres números, el símbolo '/' y dos números que indiquen el año
(ejemplo: DAW001'/'25, ASI123'/'25) `);
    }
  },
  //Obtencion del input para los codigos
  function getInputCode() {
    return document.querySelector("input[name='code']");
  },
  //Introducion del nombre mediante expresion regular
  function checkNameRegex(parameter) {
    //Guarda el valor en una variable
    const valor = parameter.value;
    //Cpmprobacion si el valor de la variable coincidide con lo indicado por la expresion regular
    if (!nameregEx.test(valor)) {
      alert(`El nombre fue mal introducido, debe contener una longitud entre 5 y 100 caracteres (ejemplo:
“Desarrollo web entorno cliente”)`);
    }
  },
  //Obtencion del input para el nombre
  function getInputName() {
    return document.querySelector("input[name='name']");
  },
];

export const form = [
  //Obtención elemento form
  function getForm() {
    return document.querySelector('form');
  },

  //Obtiene el valor de name

  function getFormName() {
    return document.querySelector("input[name='name']").value;
  },
  //Obtiene el valor de code
  function getFormCode() {
    return document.querySelector("input[name='code']").value;
  },
];

//Obtencion de lista

export const lista = [
  function getList() {
    return document.querySelector('ol');
  },

  //Crea un nuevo li
  function newLi() {
    return document.createElement('li');
  },

  //Introduccion del li al ol

  function addLi(parameter, parameter2) {
    return parameter.appendChild(parameter2);
  },

  //Eliminar li

  function deleteLI(li) {
    return li.remove();
  },
];

//Obtencion botones

export const botones = [
  function botonAdd() {
    return document.getElementById('add');
  },
  function botonDelete() {
    return document.querySelector('#delete');
  },
  function botonAddHidden() {
    return document.querySelector('#addhidden');
  },
];

// Contador
export const contador = [
  // Muestra cuantos cursos aparecen en pantalla y cuantos existen
  function actualizarContador(visibles, total) {
    const contadorDiv = document.getElementById('contador');
    contadorDiv.innerHTML = `
      <p>Cursos visibles: ${visibles}</p>
      <p>Total cursos almacenados: ${total}</p>
    `;
  },

  function obtenerListaEnArray() {
    //Obtenemos el elemento ol y dentro de el los li, una vez hecho esto creamos un array de los items li
    const lista = document.querySelector('ol');
    const items = lista.querySelectorAll('li');
    const textos = Array.from(items, (li) => li.textContent.trim());
    return textos;
  },
];

//Mostrar oculto

export const cursoOculto = [
  //Si el valor introducido y el que existe coincide devuelve true
  function mostrarOculto(valorIntroducido, codigoReal) {
    return valorIntroducido === codigoReal;
  },
];
