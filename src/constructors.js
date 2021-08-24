function Tab(name) {
    this.name = name;
    this.todos = [];
}

function Todo(name, date, priority, status) {
    this.name = name
    this.date = date
    this.priority = priority
    this.status = status;
}

export {Tab, Todo}