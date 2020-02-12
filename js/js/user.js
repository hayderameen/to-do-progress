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

module.exports = User;
