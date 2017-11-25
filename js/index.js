function deleteTask(id) {
    fetch('http://localhost:3000/tasks/' + id, {
        method: 'delete'
    })
        .then(show());
}

function show() {
    fetch('http://localhost:3000/tasks')
        .then(function (response) {
            return response.json();
        })
        .then(function (tasks) {
            console.log(tasks);
            var html = '<thead><tr><th>Name</th><th>Description</th><th>Actions</th></tr></thead><tbody>';
            for (var i = 0, len = tasks.length; i < len; i++) {
                var task = tasks[i];
                var deleteButton = '<button class=\'btn btn-danger\' onclick="deleteTask(\'' + task._id + '\')">Delete</button>';
                var editButton = '<button class=\'btn btn-primary\' onClick="showEditWindow(\'' + task._id + '\',\'' + task.name + '\',\'' + task.description + '\')">Edit</button>'
                html += '<tr>' + '<td>' + tasks[i].name + '</td>' + '<td>' + tasks[i].description + '</td>' + '<td>' + deleteButton + editButton + '</td>' + '</tr>';
            }
            html += '</tbody>'
            document.getElementById('tasks').innerHTML = html;
        });
};

function createTask() {
    var taskName = document.getElementById('taskName').value;
    var taskValue = document.getElementById('taskDescription').value;
    fetch('http://localhost:3000/tasks', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: taskName, description: taskValue })
    })
        .then(show());
    return false;
};

function updateTask() {
    var taskId = document.getElementById('editTaskId').value;
    var taskName = document.getElementById('editTaskName').value;
    var taskDescription = document.getElementById('editTaskDescription').value;
    fetch('http://localhost:3000/tasks/' + taskId, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: taskName, description: taskDescription })
    })
        .then(show());
    return false;
};

function showEditWindow(id, name, description) {
    document.getElementById("editWindow").style.display = "block";
    document.getElementById("addWindow").style.display = "none";
    document.getElementById("editWindow").scrollIntoView();
    document.getElementById("editTaskId").value = id;
    document.getElementById("editTaskName").value = name;
    document.getElementById("editTaskDescription").value = description;
}

show();