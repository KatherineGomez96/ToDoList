const inputPrincipal = document.querySelector('.input'); 
const botonAgregar = document.querySelector('.boton-agregar'); 
const container = document.querySelector('.container'); 
// --------------Esto no está en la consigna, pero quise agregarlo (es un contadorcito)--------------
const contadorTareas = document.getElementById('contador');

// actualiza el contador de tareas
const actualizarContador = () => {
    const tareas = document.querySelectorAll('.item');
    contadorTareas.textContent = tareas.length;
};
//-----------------------------------------------------------------------------------------------

const chequearInput = () => {
    const tarea = inputPrincipal.value.trim();
    if (tarea !== '') {
        // crea un nuevo item
        new Item(tarea);
        inputPrincipal.value = ''; 
        actualizarContador(); 
    } else {
        alert('Por favor, ingrese una tarea válida'); // cartel de alert si no hay tarea
    }
};

// Clase Item
//---- estoy cansado, jefe-------
class Item {
    constructor(nuevaTarea) {
        this.nuevaTarea = nuevaTarea;
        this.crearDiv(nuevaTarea); 
    }

    crearDiv = (nuevaTarea) => {
        // aca crea el contenedor del item
        const divItem = document.createElement('div');
        divItem.classList.add('item');

        // crear el input
        const inputItem = document.createElement('input');
        inputItem.type = 'text';
        inputItem.classList.add('item-input');
        inputItem.value = nuevaTarea;
        inputItem.disabled = true; 

        // boton Editar
        const botonEditar = document.createElement('button');
        botonEditar.innerHTML = '<i class="fa-solid fa-lock"></i>';
        botonEditar.classList.add('boton-editar');

        //boton Remover
        const botonRemover = document.createElement('button');
        botonRemover.innerHTML = '<i class="fa-solid fa-trash"></i>';
        botonRemover.classList.add('boton-remover');

        botonEditar.addEventListener('click', () => {
            inputItem.disabled = !inputItem.disabled; 
            botonEditar.innerHTML = inputItem.disabled
                ? '<i class="fa-solid fa-lock"></i>'
                : '<i class="fa-solid fa-lock-open"></i>'; 
        });

        botonRemover.addEventListener('click', () => {
            divItem.remove(); 
            actualizarContador(); 
        });


        divItem.appendChild(inputItem);
        divItem.appendChild(botonEditar);
        divItem.appendChild(botonRemover);

        container.appendChild(divItem);
    };
};

botonAgregar.addEventListener('click', chequearInput);

document.querySelectorAll('.item').forEach((item) => {
    const inputItem = item.querySelector('.item-input');
    const botonEditar = item.querySelector('.boton-editar');
    const botonRemover = item.querySelector('.boton-remover');

    botonEditar.addEventListener('click', () => {
        inputItem.disabled = !inputItem.disabled;
        botonEditar.innerHTML = inputItem.disabled
            ? '<i class="fa-solid fa-lock"></i>'
            : '<i class="fa-solid fa-lock-open"></i>';
    });

    botonRemover.addEventListener('click', () => {
        item.remove();
        actualizarContador(); 
    });
});

// inicia el contador de tareas
actualizarContador();

