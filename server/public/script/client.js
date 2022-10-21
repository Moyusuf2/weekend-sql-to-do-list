$(document).ready(onReady);

function onReady(){
    console.log('in onReady');

    $('body').on('click','#addBtn',postTask)
    $('body').on('click', '.deleteBtn', deleteTask);
    $('body').on('click','.completeBtn', completeTask)
    getTask()
}

function deleteTask(){
  let taskId = $(this).data('id');

  $.ajax({
      method: 'DELETE',
      url: `/tasks/${taskId}`
  }).then((response) =>{
      console.log('deleting task')
      getTask();
  }).catch((error) => {
      console.log('error in DELETE ', error);
  });
}

//change task status
function completeTask() {
  console.log('in complete task');

   let taskId = $(this).data('id');
  console.log('task ID', taskId);
  $.ajax({
      method: 'PUT',
      url: `/tasks/${taskId}`
  })
  .then((response) => {
      console.log('task deleted');
      getTask();
  })
  .catch((err) => {
      console.log('DELETE task error', err);
  })    
}



function getTask(){
    console.log('In getTask');
    $.ajax({
        method: 'GET',
        url: 'tasks'
    })
    .then((response) =>{
      console.log('response is:',response)
        renderTask(response)
    })
    .catch((error) =>{
        console.log('GET error in /tasks',error)
    });
}

function postTask(){
      let newTask = { 
      task: $('#task').val(),
      isComplete: 'FALSE'
      }
    
    $.ajax({
      method: "POST",
      url: "/tasks",
      data: newTask
    })
    .then(response => {
      console.log("response is:",response);
      $('#task').val('');
        getTask()
    }).catch(error => {
      console.error("error in  /POST", error);
    })
}

function renderTask(response){
    $('#list').empty();
    for (let task of response) {
      let status = task.isComplete ? 'strikethrough' : '';
      let toggleStatus = status.isComplete ? "Incomplete" : 'Complete'
          $('#list').append(`
        <tr class="${status}">
            <td>${task.task}</td>
           <td>${task.isComplete}</td>
            <td>
              <button class="completeBtn" data-id="${task.id}">${toggleStatus}</button>
              
            </td>
            <td class="delete"><button class="deleteBtn" data-id="${task.id}">Delete</button>
        </tr>

        `)
      }

}

