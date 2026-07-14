const button = document.getElementById("addBtn");

button.addEventListener("click", addTask);


// Load tasks when page opens
loadTasks();


function addTask() {

    const input = document.getElementById("taskInput");

    const taskTitle = input.value;


    if (taskTitle === "") {
        alert("Please enter a task");
        return;
    }


    fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: taskTitle,
            completed: false
        })
    })

    .then(response => response.json())

    .then(data => {

        input.value = "";

        loadTasks();

    });

}



// Get all tasks
function loadTasks() {

    fetch("/tasks")

    .then(response => response.json())

    .then(tasks => {


        const list = document.getElementById("task-list");

        list.innerHTML = "";


        tasks.forEach((task) => {


            const li = document.createElement("li");

li.innerHTML = `
<div class="task-row">

    <input
        type="checkbox"
        ${task.completed ? "checked" : ""}
        onchange="toggleTask(${task.id}, '${task.title}', this.checked)"
    >

    <span class="${task.completed ? 'completed' : ''}">
        ${task.title}
    </span>

    <button onclick="updateTask(${task.id}, '${task.title}', ${task.completed})">
        Update
    </button>

    <button onclick="deleteTask(${task.id})">
        Delete
    </button>

</div>
`;

            list.appendChild(li);


        });


    });

}

function deleteTask(id) {


    fetch(`/tasks/${id}`, {

        method: "DELETE"

    })


    .then(response => response.json())


    .then(data => {

        loadTasks();

    });


}


function updateTask(id, oldTitle, completed) {

    const newTitle = prompt("Enter new task name", oldTitle);

    if (newTitle === null || newTitle.trim() === "") {
        return;
    }

    fetch(`/tasks/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: newTitle,
            completed: completed
        })

    })
    .then(response => response.json())
    .then(() => {
        loadTasks();
    });

}
function toggleTask(id, title, completed) {

    fetch(`/tasks/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            completed: completed
        })

    })
    .then(response => response.json())
    .then(() => {
        loadTasks();
    });

}