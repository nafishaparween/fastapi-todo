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


        tasks.forEach((task, index) => {


            const li = document.createElement("li");


            li.innerHTML = `

    <div class="task-row">

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})"
            >

        <span class="${task.completed ? 'completed' : ''}">
            ${task.title}
        </span>


        <button onclick="updateTask(${index})">
            Update
        </button>


        <button onclick="deleteTask(${index})">
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


function updateTask(id) {

    const newTitle = prompt("Enter new task name");


    if (newTitle === null || newTitle === "") {
        return;
    }

    const completed =
    document.querySelectorAll(".task-row input")[id].checked;

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


    .then(data => {

        loadTasks();

    });

}

function toggleTask(id) {

    const title =
        document.querySelectorAll(".task-row span")[id].innerText;

    const completed =
        document.querySelectorAll(".task-row input")[id].checked;

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