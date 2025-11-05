// Controlador: Gestiona los eventos y coordina modelo y vista
import {
  getColorHover,
  getColorNormal,
  datosForm,
  oculto,
  nombres,
  codigos,
  allData,
} from './modelo.js';
import {
  inputBackG,
  form,
  botones,
  lista,
  contador,
  cursoOculto,
} from './vista.js';

export const controlador = [
  // Inicializa los eventos de los inputs
  function init() {
    const inputs = inputBackG[1](); // inputBackG[1] es getInputs
    const inputCode = inputBackG[4](); //inputBackG[4] es getInputCode
    const inputName = inputBackG[6](); //inputBackG[6] es getInputName
    inputs.forEach((input) => {
      // Cuando el ratón entra en el input
      input.addEventListener('mouseenter', () => {
        const colorHover = getColorHover[0]();
        inputBackG[0](input, colorHover); // InputBackG[0] es updateBackground
      });

      // Cuando el ratón sale del input
      input.addEventListener('mouseleave', () => {
        const colorNormal = getColorNormal[0]();
        inputBackG[0](input, colorNormal); // inputBAckG[0] es updateBackground
        inputBackG[2](input);
      });
    });
    //Para que el input del codigo solo sea segun regex - SE EJECUTA AL SALIR DEL INPUT
    inputCode.addEventListener('blur', () => {
      inputBackG[3](inputCode); //inputBackG[3] es codigoRegex
    });
    //Para que el input del codigo solo sea segun regex - SE EJECUTA AL SALIR DEL INPUT
    inputName.addEventListener('blur', () => {
      inputBackG[5](inputName); //inputBackG[5] es nameRegex
    });

    //Gestion de evento del formulario

    // Obtencion formulario
    const formularioElement = form[0](); // form[0] es getForm - EJECUTAR LA FUNCIÓN

    // Agregar el evento
    formularioElement.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevenir el envío del formulario

      // Obtener los valores
      const nombreForm = form[1](); // form[1] es getFormName
      const codigoForm = form[2](); // form[2] es getFormCode

      // Meter info del formulario dentro de datosForm
      datosForm.push(nombreForm);
      datosForm.push(codigoForm);
      nombres.push(nombreForm);
      codigos.push(codigoForm);
      console.log(datosForm);
      console.log('Nombre:', nombreForm);
      console.log('Código:', codigoForm);

      //Vaciar contenido del formulario una vez enviado
      document.querySelector("input[name='name']").value = '';
      document.querySelector("input[name='code']").value = '';
    });

    //Manejo de la lista con botones
    const ol = lista[0](); //lista[0] es getList
    const buttonAdd = botones[0](); //botones[0] es botonAdd
    const buttonDelete = botones[1](); //botones[1] es botonDelete
    const buttonHidden = botones[2](); // botones[2] es botonAddHidden

    // Función para hacer un li seleccionable
    function hacerSeleccionable(li) {
      //Añadimos un pointer
      li.style.cursor = 'pointer';

      li.addEventListener('click', function () {
        // Toggle selección(añade o elimina la clase)
        if (li.classList.contains('seleccionado')) {
          li.classList.remove('seleccionado');
          li.style.backgroundColor = '';
        } else {
          // Quitar selección de otros elementos
          ol.querySelectorAll('li').forEach((item) => {
            item.classList.remove('seleccionado');
            item.style.backgroundColor = '';
          });
          // Seleccionar este elemento
          li.classList.add('seleccionado');
          li.style.backgroundColor = 'rgba(255, 204, 0, 0.48)';
        }
      });
    }

    // Aplicar funcionalidad a los li existentes en el HTML
    ol.querySelectorAll('li').forEach((li) => {
      hacerSeleccionable(li);
    });

    //Para hacer el  contador dinamico, funcion auxiliar
    function actualizarContadorCompleto() {
      const totalVisibles = ol.querySelectorAll('li').length;
      contador[0](totalVisibles, allData.length);
    }

    // Añadir nuevo elemento
    buttonAdd.addEventListener('click', function () {
      if (datosForm.length >= 2) {
        let li = lista[1](); //lista[1] es newLi
        li.textContent = `Curso ${datosForm[0]} y su codigo ${datosForm[1]}`;

        // Hacer que el nuevo li también sea seleccionable
        hacerSeleccionable(li);

        lista[2](ol, li); //lista[2] es addLi

        //Actualizar contador y array al añadir
        allData.push(`Curso ${datosForm[0]} y su codigo ${datosForm[1]}`);

        actualizarContadorCompleto();

        datosForm.length = 0; // Limpiar el array
      } else {
        alert('Por favor, completa el formulario primero');
      }
    });

    // Botón para eliminar el elemento seleccionado
    buttonDelete.addEventListener('click', function () {
      const seleccionado = ol.querySelector('.seleccionado');
      if (seleccionado) {
        const textoEliminado = seleccionado.textContent.trim();
        const indice = allData.indexOf(textoEliminado);
        if (indice > -1) {
          allData.splice(indice, 1);
        }

        lista[3](seleccionado); //lista[3] es deleteLi
        //Actualizar contador al eliminar
        actualizarContadorCompleto();
      } else {
        alert('Selecciona un curso primero haciendo click en él');
      }
    });

    buttonHidden.addEventListener('click', function () {
      const introducido = prompt(
        'Introduce el código para mostrar el curso misterioso'
      ).toUpperCase();

      if (!introducido) return; //si el usuario no escribió nada en el prompt (o pulsó Cancelar), sale del evento.

      // 1. Evitar duplicados
      //Convierte a array comprueba si el codigo ya ha sido introducido alguna vez
      const yaExiste = Array.from(ol.querySelectorAll('li')).some((li) =>
        li.textContent.includes(introducido)
      );

      if (yaExiste) {
        alert('Ese código ya fue introducido y el curso ya está visible.');
        return;
      }

      // 2. Buscar si el código existe en el array oculto
      let encontrado = false;

      for (let i = 0; i < oculto.length; i++) {
        //Destructuring del array
        const [nombre, codigo] = oculto[i];

        // 3. Usar la función de comprobación de vista
        if (cursoOculto[0](introducido, codigo)) {
          const li = lista[1](); // newLi
          li.textContent = `Curso ${nombre} y su código ${codigo}`;
          hacerSeleccionable(li);
          lista[2](ol, li); // addLi
          //Actualizar contador al mostrar curso oculto
          actualizarContadorCompleto();
          encontrado = true;
          break;
        }
      }

      // 4. Si el código no está en el modelo
      if (!encontrado) {
        alert('Ese código no existe, por lo tanto no hay curso.');
      }
    });

    //Contador
    //Recorremos el array e introducimos sus elementos uno a uno en allData
    const totalLis = contador[1](); //contador[1] es contarLis
    totalLis.forEach((items) => {
      allData.push(items);
    });

    contador[0](totalLis.length, allData.length);
  },
];

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  controlador[0](); // controlador[0] es init
});
