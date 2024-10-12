// Espero que estos comentarios no sean invasivos, es cuestión de cumplir con la rúbrica.

// Se crea la clase para almacenar.
class Tarea {
    constructor(nombre, estado = 'pendiente') {
        this.nombre = nombre; // Almacena el nombre de la tarea.
        this.estado = estado; // Almacena el estado de la tarea xd
    }
}

// Aquí en esta lista/array se guardan las tareas.
const tareas = [];

// Función para agregar una nueva tarea.
function agregarTarea() {
    // Definimos constante que tomamos por el ID.
    const nombreTarea = document.getElementById('new-task').value.trim();

    // Vamos a quitarnos un bug. Verificamos si el nombre de la tarea ya existe en "Pendiente" o "Haciendo"

    // Verifica si ya existe una tarea con el mismo nombre en las listas "Pendiente" o "Haciendo"

    const tareaExiste = tareas.some(tarea =>

        // Compara el nombre de la tarea actual con el nombre de la nueva tarea (sin importar mayúsculas o minúsculas)
        tarea.nombre.toLowerCase() === nombreTarea.toLowerCase() &&

        // Y verifica que el estado de la tarea sea "pendiente" o "haciendo"
        (tarea.estado === 'pendiente' || tarea.estado === 'haciendo')
    );


    // Creamos el If, pues, si se encuentra una tarea existente, la web muestra un mensaje de alerta y te limpia el Imput antes de retornar para evitar que se agregue la tarea
    if (tareaExiste) {
        alert('Esta tarea ya existe, por favor completala.');
        document.getElementById('new-task').value = '';
        return;
    }

    // Hacemos otro if, pues, si se ingresa el nombre de una tarea validad por lo anterior, se crea una nueva instancia de la clase "Tarea" según el nombre dado, esta se agrega al array y llama a la función que actualiza la interfaz de usuario y limpia el campo para que el usuario pueda ingresar una nueva tarea. En caso de que el usuario no ingrese un nombre saldrá una alerta.
    if (nombreTarea) {
        const nuevaTarea = new Tarea(nombreTarea);
        tareas.push(nuevaTarea);
        actualizarInterfaz();
        document.getElementById('new-task').value = '';
    } else {
        alert('Debes ingresar un nombre para la tarea.');
    }
}

// Esto es por comodidad, el usuario puede presionar la tecla enter para agregar tareas llamando a la función.
document.getElementById('new-task').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});

// Función para mover una tarea a un nuevo estado
function moverTarea(nombreTarea, nuevoEstado) {
    // Busca la tarea en el array 'tareas' que coincide con el nombre de la tarea proporcionada
    const tarea = tareas.find(t => t.nombre === nombreTarea);

    // Verifica si se encontró la tarea
    if (tarea) {
        // Si se encontró, actualiza el estado de la tarea al nuevo estado proporcionado
        tarea.estado = nuevoEstado;

        // Llama a la función actualizarInterfaz para reflejar el cambio en la interfaz de usuario
        actualizarInterfaz();
    }
}


// Función para actualizar la interfaz.
function actualizarInterfaz() {
    // Se limpian las listas, siempre.
    document.getElementById('pendiente-tasks').innerHTML = '';
    document.getElementById('haciendo-tasks').innerHTML = '';
    document.getElementById('completada-tasks').innerHTML = '';

    // Renderizar las tareas según su estado
    tareas.forEach(tarea => {
        // Crea un nuevo elemento de lista (li) para la tarea.
        const tareaElement = document.createElement('li');
        tareaElement.textContent = tarea.nombre; // Asigna el nombre de la tarea al elemento.

        // Verifica el estado de la tarea y agrega los botones correspondientes.
        if (tarea.estado === 'pendiente') {
            // Crear un botón para mover la tarea a "Haciendo"
            const btnMoverHaciendo = document.createElement('button');
            btnMoverHaciendo.textContent = 'Mover a Haciendo'; // Texto del botón.
            // Agrega un evento onclick que llama a moverTarea al hacer clic.
            btnMoverHaciendo.onclick = () => moverTarea(tarea.nombre, 'haciendo');
            tareaElement.appendChild(btnMoverHaciendo); // Añade el botón al elemento de tarea.
            document.getElementById('pendiente-tasks').appendChild(tareaElement); // Añade el elemento de tarea a la lista de pendientes.
        } else if (tarea.estado === 'haciendo') {
            // Crear un botón para mover la tarea a "Pendiente"
            const btnMoverPendiente = document.createElement('button');
            btnMoverPendiente.textContent = 'Mover a Pendiente'; // Texto del botón.
            // Agrega un evento onclick que llama a moverTarea al hacer clic.
            btnMoverPendiente.onclick = () => moverTarea(tarea.nombre, 'pendiente');

            // Crear un botón para mover la tarea a "Completada"
            const btnMoverCompletada = document.createElement('button');
            btnMoverCompletada.textContent = 'Mover a Completada'; // Texto del botón.
            // Agrega un evento onclick que llama a moverTarea al hacer clic.
            btnMoverCompletada.onclick = () => moverTarea(tarea.nombre, 'completada');

            // Añade ambos botones al elemento de tarea.
            tareaElement.appendChild(btnMoverPendiente);
            tareaElement.appendChild(btnMoverCompletada);
            document.getElementById('haciendo-tasks').appendChild(tareaElement); // Añade el elemento de tarea a la lista de haciendo.
        } else if (tarea.estado === 'completada') {
            // Si la tarea está completada, añade el elemento a la lista de completadas.
            document.getElementById('completada-tasks').appendChild(tareaElement);
        }
    });
}

// Agrego event listener al botón de agregar tarea.
// Esto añade una tarea cada vez que se hace clic en el botón "Agregar Tarea"
document.getElementById('add-task').addEventListener('click', agregarTarea);

// Función para limpiar todas las tareas
function limpiarTareas() {
    tareas.length = 0; // Vaciar la lista de tareas, estableciendo la longitud a 0 eliminando todas las tareas del array.
    actualizarInterfaz(); // Llama a actualizarInterfaz para reflejar los cambios en la interfaz.
}

// Esto llama a la función limpiarTareas cuando se hace clic en el botón "Borrar todas las tareas".
document.getElementById('clear-tasks').addEventListener('click', limpiarTareas);