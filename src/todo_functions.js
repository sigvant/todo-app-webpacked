import selectors from "./selectors";
import { Tab, Todo } from "./constructors";
let tabs;

selectors.todoButton.addEventListener('click', addTodo);
selectors.todoList.addEventListener('click', deleteCheck);
selectors.filterOption.addEventListener('click', filterTodo);
selectors.addTabButton.addEventListener('click', createTab);
selectors.tabList.addEventListener('click', deleteSelectTab);

function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    // todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create LI

    // todo object instantiation

    let name = selectors.todoInput.value;
    let date = selectors.todoDateInput.value;
    let priority = selectors.todoPriorityInput.value;
    let newtodoobj = new Todo(name, date, priority);


    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');

    const newTodoNameDiv = document.createElement('div');
    newTodoNameDiv.textContent = name;
    newTodoNameDiv.classList.add('todo-info-boxes-name')

    const newTodoDateDiv = document.createElement('div');
    newTodoDateDiv.textContent = date;
    newTodoDateDiv.classList.add('todo-info-boxes-date')

    const newTodoPriorityDiv = document.createElement('div');
    newTodoPriorityDiv.textContent = priority;
    newTodoPriorityDiv.classList.add('todo-info-boxes-priority')
    
    
    newTodo.appendChild(newTodoNameDiv);
    newTodo.appendChild(newTodoDateDiv);
    newTodo.appendChild(newTodoPriorityDiv);

    todoDiv.appendChild(newTodo);


    // add todo to the local storage
    // saveLocalTodos(newtodoobj);
    // CHECK MARK button

    //put todo in the active tab
    saveTodosinTab(newtodoobj);

    const completedButton = document.createElement('button');
    completedButton.textContent = '✔️';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    
    // trash MARK button

    const trashButton = document.createElement('button');
    trashButton.textContent = '🗑️';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // append to list
    selectors.todoList.appendChild(todoDiv);
    // clear todo input value
    selectors.todoInput.value = '';
    selectors.todoDateInput.value = '';
}

function saveTodosinTab(todo) {
    retrieveTabsFromMemory(); 
    const activeTab = document.querySelector('.tab-active');
    const tabName = activeTab.childNodes[0].innerText;
    tabs.forEach(tab => {
        if(tab.name == tabName) {
            tab.todos.push(todo);
            localStorage.setItem('tabs', JSON.stringify(tabs));
        }
    })
}

function deleteCheck(event) {
    const item = event.target;
    
    // delete todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    // check mark

    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event) {
    const todos = selectors.todoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function getTodos() {
    retrieveTabsFromMemory();
    
    let tabName = document.querySelector('.tab-active').children[0].children[0].innerText;
    
    tabs.forEach(tab => {
        if(tab.name == tabName) {
            tab.todos.forEach(todo => {
                // todo DIV
                const todoDiv = document.createElement('div');
                todoDiv.classList.add('todo');
                // create LI
        
                // todo object instantiation
        
                let name = todo.name;
                let date = todo.date;
                let priority = todo.priority;        
        
                const newTodo = document.createElement('li');
                newTodo.classList.add('todo-item');
        
                const newTodoNameDiv = document.createElement('div');
                newTodoNameDiv.textContent = name;
                newTodoNameDiv.classList.add('todo-info-boxes-name')
        
                const newTodoDateDiv = document.createElement('div');
                newTodoDateDiv.textContent = date;
                newTodoDateDiv.classList.add('todo-info-boxes-date')
        
                const newTodoPriorityDiv = document.createElement('div');
                newTodoPriorityDiv.textContent = priority;
                newTodoPriorityDiv.classList.add('todo-info-boxes-priority')
                
                
                newTodo.appendChild(newTodoNameDiv);
                newTodo.appendChild(newTodoDateDiv);
                newTodo.appendChild(newTodoPriorityDiv);
        
                todoDiv.appendChild(newTodo);
        
                const completedButton = document.createElement('button');
                completedButton.textContent = '✔️';
                completedButton.classList.add('complete-btn');
                todoDiv.appendChild(completedButton);
                
                // trash MARK button
        
                const trashButton = document.createElement('button');
                trashButton.textContent = '🗑️';
                trashButton.classList.add('trash-btn');
                todoDiv.appendChild(trashButton);
        
                // append to list
                selectors.todoList.appendChild(todoDiv);
            })
        }
    })
}

function removeLocalTodos(todo) {
    const todoForTab = todo.childNodes[0].childNodes[0].innerText;
    retrieveTabsFromMemory();
    tabs.forEach(item => {
        item.todos = item.todos.filter(item => item.name != todoForTab);
    })
    localStorage.setItem('tabs', JSON.stringify(tabs));


}

function clearTodos() {
    document.querySelector('.todo-list').innerText = '';
}

function createTab(event) {
    event.preventDefault();   
    
    let name = prompt('Name your tab!', 'Popsicle');
    let tab = new Tab(name);

    let newTab = document.createElement('li');
    newTab.classList.add('tab');
    let newDiv = document.createElement('div');
    newDiv.classList.add('tab-div');
    let newSpanDiv = document.createElement('div');
    newSpanDiv.classList.add('span-div');
    let newSpan = document.createElement('span');
    newSpan.textContent = tab.name;

    let newTrashcanDiv = document.createElement('div');
    newTrashcanDiv.classList.add('trashcan-div')
    let newTrashButton = document.createElement('button');
    newTrashButton.classList.add('trash-btn-tab');
    newTrashButton.textContent = '🗑️';

    //save tab to local memory
    saveLocalTab(tab);
    
    newSpanDiv.appendChild(newSpan);
    newDiv.appendChild(newSpanDiv);
    newTrashcanDiv.appendChild(newTrashButton);
    newTab.appendChild(newDiv);
    newTab.appendChild(newTrashcanDiv);
    selectors.tabList.appendChild(newTab); 
    
    let onlyTab = document.querySelector('.tab')
    
    if(onlyTab.parentElement.childNodes.length === 1) {
        onlyTab.classList.add('tab-active');
        return
    } 

}

function deleteSelectTab(event) { 
    
    const item = event.target;
    
    
    // delete todo
    if(item.classList[0] === 'trash-btn-tab' || item.classList[0] === 'trash-btn' ) {
        const tab = item.parentElement.parentElement;
        // does not allow deletion when only one tab
        if(tab.parentElement.childNodes.length === 1) {
            // item.classList.add('tab-active');
            return
        }   
        // animation
        tab.classList.add('fall');
        removeLocalTab(tab);
        tab.addEventListener('transitionend', () => {
            tab.remove();
        });
    }

    // check mark

    if(item.classList[0] === 'tab-div' || item.classList[0] === 'tab' || item.classList[0] === 'span-div') {
        let tab = document.querySelectorAll('.tab');
        if(event.target.classList.contains('tab')) {
            tab.forEach(item => item.classList.remove('tab-active'));
            item.classList.add('tab-active');
            clearTodos();
            getTodos();
            
        }
        
    }
}

function saveLocalTab(tab) {
    //check -- do I already have things in there?
    retrieveTabsFromMemory();
    tabs.push(tab);
    localStorage.setItem('tabs', JSON.stringify(tabs));   
}

function loadTabs() {
    retrieveTabsFromMemory();
    tabs.forEach(function(tab){
        let name = tab.name;
        
        let newTab = document.createElement('li');
        newTab.classList.add('tab');
        let newDiv = document.createElement('div');
        newDiv.classList.add('tab-div');
        let newSpanDiv = document.createElement('div');
        newSpanDiv.classList.add('span-div');
        let newSpan = document.createElement('span');
        newSpan.textContent = name;
    
        let newTrashcanDiv = document.createElement('div');
        newTrashcanDiv.classList.add('trashcan-div')
        let newTrashButton = document.createElement('button');
        newTrashButton.classList.add('trash-btn-tab');
        newTrashButton.textContent = '🗑️';
        
        newSpanDiv.appendChild(newSpan);
        newDiv.appendChild(newSpanDiv);
        newTrashcanDiv.appendChild(newTrashButton);
        newTab.appendChild(newDiv);
        newTab.appendChild(newTrashcanDiv);
        selectors.tabList.appendChild(newTab);   
    })
}

function removeLocalTab(tab) {
    retrieveTabsFromMemory();
    // what I click is the div, now I want the li and the inner text
    // so we can SPLICE it
    const tabIndex = tab.children[0].innerText;
    tabs.splice(tabs.indexOf(tabIndex), 1);
    localStorage.setItem('tabs', JSON.stringify(tabs));

}

function activateTab() {
    
    if(selectors.tabList.childNodes[0] === undefined) return;
    else {
        selectors.tabList.childNodes[0].classList.add('tab-active');    
        getTodos();
    }
}

function retrieveTabsFromMemory() {
    if(localStorage.getItem('tabs') === null) tabs = [];
    else {
        tabs = JSON.parse(localStorage.getItem('tabs'));
    }
    return tabs;
}

function getTodayDate() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    if(month < 10) {
        month = `0${month}`;
    }        
    let year = today.getFullYear();
    let todayDate = (`${year}-${month}-${day}`);

    let dateInput = document.querySelector('.todo-date-input');
    dateInput.setAttribute('min', todayDate);
}

export {addTodo, saveTodosinTab, deleteCheck, filterTodo,
    getTodos, removeLocalTodos, clearTodos, createTab, deleteSelectTab,
    saveLocalTab, loadTabs, removeLocalTab, activateTab, 
    retrieveTabsFromMemory, getTodayDate}