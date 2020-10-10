// Escucho el click del boton ADD
document.querySelector('#btnAdd').addEventListener('click', saveTaks);

// Funcion para guardar las tareas en LocalStorage
function saveTaks() {

    let taskInput = document.querySelector('.taskInput').value;

    if (taskInput != "") {

        // Construyo un objeto, por si despues se requiere almacenar mas parametros
        const task = {
            taskInput
        };

        
        if (localStorage.getItem('tasks') === null){

            let tasks = [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));

        } else {

            let tasks =  JSON.parse(localStorage.getItem('tasks'));
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));

        }
    }
    document.querySelector('.taskInput').value = "";
    getTasks();
}

// Funcion para mostrar las tareas
function getTasks() {
    
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    let taskList = document.querySelector('.taskList');
    
    // Limpio el contenedor
    taskList.innerHTML = "";

    // Recorro el arreglo de tareas
    for(let i = 0; i < tasks.length; i++) {

        let taskInput = tasks[i].taskInput;

        // Usamos += para que cada tarea se agregue en taskList
        taskList.innerHTML += `<div class="taskItem">
        <p>${taskInput}</p>
        <button onclick="deleteTask('${taskInput}')" class="btn-dlt">DELETE</button>
        </div>`
    }
}

// Funcion para eliminar las tareas
function deleteTask(taskInput) {

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskInput == taskInput) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

getTasks();