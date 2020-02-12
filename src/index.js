var User = require("./common/user");
import "../css/index.scss";
import "../css/tasks.css";

const users = [];
let selectedUser = {};
let editingTask = { editing: false, index: 0 };

function addUser(user) {
  if (!users.find(u => u.username === user)) {
    const newUser = new User(user);
    users.push(newUser);
    selectedUser = newUser;
    editingTask = { editing: false, index: 0 };
    $("#new-task-text").val("");

    showUsers(); // run jquery code for showing all users in their list

    showTasks(); // run jquery code for showing all tasks by this particular user

    return newUser;
  } else {
    $("#new-user-button").text("User already exists!");
    $("#new-user-text").val("");
  }
}

console.log(addUser("Hayder Ameen")); // Test case run first time only

function showUsers() {
  $(function() {
    $("#users-list").empty();
    //users-list
    for (let user of users) {
      if (user.username === selectedUser.username) {
        $("#users-list").append(
          `<li class="list-group-item list-group-item-action active">${user.username}</li>`
        );
      } else {
        $("#users-list").append(
          `<li class="list-group-item list-group-item-action">${user.username}</li>`
        );
      }
    }
  });
}

function showTasks() {
  $(function() {
    $("#task-list").empty();
    for (let task of selectedUser.nonCompletedTasks) {
      let newItem = `<li value="${task}" class="list-group-item list-group-item-action list-group-item-primary"><span class="task-text">${task}</span></li>`;
      $("#task-list").append(newItem);
    }
    $("#non-completed-pill").text(selectedUser.nonCompletedTasks.length);

    $("#completed-task-list").empty();
    for (let task of selectedUser.completedTasks) {
      let newItem = `<li class="list-group-item list-group-item-action list-group-item-secondary"><del>${task}</del></li>`;
      $("#completed-task-list").append(newItem);
    }
    $("#completed-pill").text(selectedUser.completedTasks.length);
  });
}

// This function shows a pop-up of new features when site loads
$(function() {
  setTimeout(function() {
    $("#newFeatures").modal("show");
  }, 1000);
});

// This function is event handler for adding new user
$("#new-user-button").click(function() {
  let newUserText = $("#new-user-text").val();
  if (newUserText != "") {
    $("#new-user-button").text("Add User");
    $("#new-user-text").val("");
    addUser(newUserText);
  } else {
    console.log("here");
    $("#new-user-button").text("Enter valid name!");
  }
});

//This function is event handler for changing current user
$("#users-list").on("click", "li", function() {
  // On click on any user, we change the data of whole page and set current User as this one
  let tempUsername = $(this)[0].innerText;
  selectedUser = users.find(u => u.username === tempUsername);
  console.log("On changing user", selectedUser);
  showUsers();
  showTasks();
});

//This function handles the the adding or editing task action
$("#new-task-button").click(function() {
  if (editingTask.editing) {
    let newTaskText = $("#new-task-text").val();
    if (newTaskText != "") {
      $("#new-task-text").val("");
      $("#new-task-button").text("Add Task");
      selectedUser.editTask(editingTask.index, newTaskText);
      editingTask.editing = false;

      showTasks();
    } else {
      $("#new-task-button").text("Enter some text first!");
    }
  } else {
    let newTaskText = $("#new-task-text").val();
    if (newTaskText != "") {
      $("#new-task-button").text("Add Task");
      $("#new-task-text").val("");
      selectedUser.addTask(newTaskText);
      showTasks();
    } else {
      $("#new-task-button").text("Enter some text first!");
    }
  }
});

// This function adds edit, completion and delete buttons. Their actions are also within.
$(function() {
  let taskText = "";

  // This function handles the edit task function
  $("#task-list").on("click", "li div #edit-task-button", function(event) {
    console.log("Edit button clicked");
    taskText = $(this)
      .parent()
      .parent()
      .attr("value");
    $("#new-task-text").val(taskText);

    // Finding the index of this task in nonCompleted array
    const index = selectedUser.nonCompletedTasks.indexOf(taskText);
    editingTask = { editing: true, index: index };
    $("#new-task-button").text("Save Task");
    event.stopPropagation(); // To stop event bubbling to parent element
  });

  // This function handles mark as complete action
  $("#task-list").on("click", "li div #complete-task-button", function() {
    //console.log($("#task-list").children());

    taskText = $(this)
      .parent()
      .parent()
      .attr("value");

    selectedUser.completeTask(taskText);
    showTasks();
  });

  // This function deletes a task entirely
  $("#task-list").on("click", "li div #delete-task-button", function() {
    console.log(taskText);
    taskText = $(this)
      .parent()
      .parent()
      .attr("value");
    selectedUser.deleteTask(taskText);
    showTasks();
  });

  $("#task-list").on("click", "li", function() {
    //taskText = $(this).text();

    //console.log(taskText, " after click");

    if ($("#task-buttons", $(this)).length == 1) {
      console.log("it already exists");
      // console.log($("#task-buttons", $(this)));
      //$("#task-buttons").remove();
    } else {
      $(this).append(`<div id="task-buttons">
  <button class="btn btn-outline-secondary" type="button" id="edit-task-button">
    Edit <i class="fa fa-pencil" aria-hidden="true"></i>
  </button>

  <button class="btn btn-outline-secondary" type="button" id="complete-task-button">
    Mark as Complete <i class="glyphicon glyphicon-thumbs-up"></i>
  </button>

  <button class="btn btn-outline-secondary" type="button" id="delete-task-button">
    Delete <i class="glyphicon glyphicon-remove"></i>
  </button>
</div>`);
    }
  });
});

// This function adds edit and delete buttons to highlighted task in non-completed list
// $(function() {
//   let outerHTML = "";
//   let taskText = "";
//   $("#task-list").on(
//     {
//       mouseenter: function() {
//         taskText = $(this).text();

//         $(this).append(`<div>
//   <button class="btn btn-outline-secondary" type="button" id="edit-task-button">
//     Edit <i class="fa fa-pencil" aria-hidden="true"></i>
//   </button>

//   <button class="btn btn-outline-secondary" type="button" id="complete-task-button">
//     Mark as Complete <i class="glyphicon glyphicon-thumbs-up"></i>
//   </button>

//   <button class="btn btn-outline-secondary" type="button" id="delete-task-button">
//     Delete <i class="glyphicon glyphicon-remove"></i>
//   </button>
// </div>`);
//       },
//       mouseleave: function() {
//         showTasks();
//       }
//     },
//     "li"
//   );

//   // This function handles the edit task function
//   $("#task-list").on("click", "li div #edit-task-button", function() {
//     console.log("Edit button clicked");
//     $("#new-task-text").val(taskText);

//     // Finding the index of this task in nonCompleted array
//     const index = selectedUser.nonCompletedTasks.indexOf(taskText);
//     editingTask = { editing: true, index: index };
//     $("#new-task-button").text("Save Task");
//   });

//   // This function handles mark as complete action
//   $("#task-list").on("click", "li div #complete-task-button", function() {
//     selectedUser.completeTask(taskText);
//     showTasks();
//   });

//   // This function deletes a task entirely
//   $("#task-list").on("click", "li div #delete-task-button", function() {
//     selectedUser.deleteTask(taskText);
//     showTasks();
//   });
// });

// This function is used to undo a completed task and send back to non-completed list
$("#completed-task-list").on("click", "li", function() {
  let taskText = $(this).text();
  selectedUser.undoTask(taskText);
  showTasks();
});

// This code is for handing the swipe gesture to complete a task
$("#task-list")
  .hammer({ domEvents: true })
  .on("swiperight", "li", function() {
    console.log("Swiped Right");
    //let taskText = $(this).text();
    let taskText = $(this).attr("value");
    selectedUser.completeTask(taskText);
    showTasks();
  });

// This function is for swiping left to undo a task
$("#completed-task-list")
  .hammer({ domEvents: true })
  .on("swipeleft", "li", function() {
    console.log("Swiped left");
    let taskText = $(this).text();
    selectedUser.undoTask(taskText);
    showTasks();
  });
