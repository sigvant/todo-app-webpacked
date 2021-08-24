const selectors = (() => {
    const todoInput = document.querySelector('.todo-input');
    const todoDateInput = document.querySelector('.todo-date-input');
    const todoPriorityInput = document.querySelector('.priority-select')
    const todoButton = document.querySelector('.todo-button');
    const todoList = document.querySelector('.todo-list');
    const filterOption = document.querySelector('.filter-todo');

    //selectors tab area
    const addTabButton = document.querySelector('.tab-button');
    const tabList = document.querySelector('.tab-list');
    const tab = document.querySelectorAll('.tab');
    return {
        todoInput,
        todoDateInput,
        todoPriorityInput,
        todoButton,
        todoList,
        filterOption,
        addTabButton,
        tabList,
        tab
    };
})();

export default selectors;