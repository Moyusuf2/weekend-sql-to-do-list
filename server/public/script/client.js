$(document).ready(onReady);

function onReady(){
    console.log('in onReady');

    $('body').on('click','#addBtn',postTask)
    $('body').on('click', '.deleteBtn', onDelete)
    getTask()
}
function onDelete(){
    console.log('in onDelete')
    let taskId = $(this).data('id');
    console.log('removed task:', taskId);
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}` 
    }).then((response) =>{
        //after delete re GET all tasks
        getTasks();
    }).catch((error) => {
        console.log(error);
        console.log('error onDelete',error);
    });
}
function getTask(){
    console.log('In getTask');
    $.ajax({
        method: 'GET',
        url: 'tasks'
    })
    .then((response) =>{
        renderTask(response)
    })
    .catch((error) =>{
        console.log('GET error in /tasks',error)
    });
}

function postTask(){
    let newTask = $('#task').val();
    
    $.ajax({
      method: "POST",
      url: "/tasks",
      data: newTask
    })
    .then(response => {
      console.log("response is:",response);
        getTask()
    }).catch(error => {
      console.error("error in  /POST", error);
    })
}

function renderTask(response){
    $('#list').empty();
    for (let task of response) {
        let checked;
        let complete;
        if (task.complete) {
          checked = 'checked';
          complete = "complete";
        }
        else {
          checked = ''
          complete = '';
        
        }
        $('#list').append(`
        <tr>
          <td class="${complete}" data-x="${task.id}"></td>
          <td>Task:${task.id}<br>${task.task}</td>
              <td><input class="checkbox" type="checkbox" ${checked}/></td>
            <td><button class="deleteBtn">Delete</button></td>
          </tr>
        `)
      }

}