const list = document.querySelector('.list')
const input = document.querySelector('.input-container__input')
let id = 0
let tasks = []

function updateId () {
    if (tasks.length === 0) return
    existingId = tasks.map(task => task.id) 
    id = Math.max(...existingId) + 1
}


window.addEventListener('load', () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(task => {
        renderTask(task)
    })
    updateId()
})

input.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        addTask()
    }
})

function addTask() {
    if (input.value.trim() === '' ) {
        input.value = ''
        alert('Please add a task')
        return
    }
    const task = {
        id: id,
        value: input.value,
    }
    tasks.push(task)
    input.value = ''
    id++
    renderTask(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const li = document.createElement('li')
    li.innerHTML = `
    <div class='list-item__container' id=${task.id}>
        <p>${task.value}</p> 
        <button class="btn delete-btn">Delete</button> 
        <button class="btn edit-btn">Edit</button>
    </div>`
    list.append(li)
}

list.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
        deleteTask(e.target)
    } else if (e.target.classList.contains('edit-btn')) {
        editTask(e.target)
    }
})

function deleteTask(target) {
    const li = target.parentElement
    li.parentElement.remove()
    tasks = tasks.filter(task => task.id !== parseInt(li.id))
    localStorage.removeItem('tasks')
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function editTask(target) {
    deleteTask(target)
    input.focus()
    input.value = target.parentElement.querySelector('p').textContent
}

input.addEventListener('blur', e => {
    e.target.value = ''
})