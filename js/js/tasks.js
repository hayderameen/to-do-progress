//making an array of tasks
let tasks = ["Task 1", "Task2", "Task 3"];
$(function() {
  addTasks(tasks);

  function addTasks(tasks) {
    for (let task of tasks) {
      let newItem = `<li class="list-group-item list-group-item-action">${task}</li>`;
      $("#task-list").append(newItem);
    }
  }

  function removeTask(task, tasksList) {
    const index = tasksList.indexOf(task);
    tasksList.splice(index, 1);
    return tasksList;
  }
});
