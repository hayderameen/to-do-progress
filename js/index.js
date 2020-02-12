//////////////////////This is user.js file////////////////////////////
function User(name) {
  this.username = name;
  this.nonCompletedTasks = [
    "Test non completed task 1",
    "Test non completed task 2"
  ];
  this.completedTasks = ["Test completed task 1", "Test completed task 2"];
}

User.prototype.addTask = function(task) {
  this.nonCompletedTasks.push(task);
};

User.prototype.completeTask = function(task) {
  const index = this.nonCompletedTasks.indexOf(task);

  this.nonCompletedTasks.splice(index, 1);

  this.completedTasks.push(task);
};

//////////////////////end of user.js file//////////////////////////////////

/////////////////////Start of tasks.js file////////////////////////////////

//var User = require("./user");

const users = [];
let selectedUser = {};

function addUser(user) {
  if (!users.find(u => u.username === user)) {
    const newUser = new User(user);
    users.push(newUser);
    selectedUser = newUser;

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
      let newItem = `<li class="list-group-item list-group-item-action list-group-item-primary">${task}</li>`;
      $("#task-list").append(newItem);
    }
    $("#non-completed-pill").text(selectedUser.nonCompletedTasks.length);

    $("#completed-task-list").empty();
    for (let task of selectedUser.completedTasks) {
      let newItem = `<li class="list-group-item list-group-item-secondary"><del>${task}</del></li>`;
      $("#completed-task-list").append(newItem);
    }
    $("#completed-pill").text(selectedUser.completedTasks.length);
  });
}

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

//This function handles the the adding task action
$("#new-task-button").click(function() {
  let newTaskText = $("#new-task-text").val();
  if (newTaskText != "") {
    $("#new-task-button").text("Add Task");
    $("#new-task-text").val("");
    selectedUser.addTask(newTaskText);
    showTasks();
  } else {
    $("#new-task-button").text("Enter some text first!");
  }
});

//This function handles marking a task as complete
$("#task-list").on("click", "li", function() {
  let removedTask = $(this)[0].innerText;
  selectedUser.completeTask(removedTask);
  showTasks();
});

// This function adds strikethrough line to highlighted task in non-completed list
$("#task-list").on(
  {
    mouseenter: function() {
      let removedTask = $(this).text();
      $(this).html(`<del>${removedTask}</del>`);
    },
    mouseleave: function() {
      let removedTask = $(this).text();
      $(this).html(`${removedTask}`);
    }
  },
  "li"
);

////////////////////end of tasks.js file/////////////////////////////////////
