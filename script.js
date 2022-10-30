const input = document.querySelector('#task'),
    btnAdd = document.querySelector('.btn__add'),
    taskZone = document.querySelector('#task__work__zone'),
    cardCompletedZone = document.querySelector('#task__completed'),
    allTaskCounter = document.querySelector('all__task__count'),
    completedTaskCounter = document.querySelector('completed__task__count')

let taskCount = 0
let task
let completeTask


!localStorage.task ? task = [] : task = JSON.parse(localStorage.getItem('task'))
!localStorage.completeTask ? completeTask = [] : completeTask = JSON.parse(localStorage.getItem('completeTask'))


function TaskObj(taskText) {
    this.text = taskText
}


const addLocal = () =>{
    localStorage.setItem('task', JSON.stringify(task))
    localStorage.setItem('completeTask', JSON.stringify(completeTask))
}




btnAdd.addEventListener('click', () =>{
    const taskValue = input.value
    if (taskValue) {
        task.push(new TaskObj(taskValue))
        addLocal()
        fillList()
    }
    input.value = ''
})


const createTask = (task, index) =>{
    return`
    <div class="task__card">
        <button class="task__complete" onclick='taskDone(${index})'></button>
        <div class="task__text">${task.text}</div>
        <button class="task__delete" onclick='deleteTask(${index})'></button>
    </div>
    `
}


const fillList = () =>{
    taskZone.innerHTML = ''
    if(task.length > 0){
        task.forEach((item, index) => {
            taskZone.innerHTML += createTask(item, index)
        });
    }
}



const deleteTask = index =>{
    task.splice(index, 1)
    addLocal()
    updateData()
}



const taskDone = index =>{
    completeTask.push(task[index])
    task.splice(index, 1)
    addLocal()
    updateData()
}



const createCompleteTask = (task, index) =>{
    return`
    <div class="task__card task__done">
        <button class="task__complete completed"></button>
        <div class="task__text">${task.text}</div>
        <button class="task__delete" onclick='deleteCompleteTask(${index})'></button>
    </div>
    `
}


const fillCompleteList = () =>{
    cardCompletedZone.innerHTML = ''
    if(completeTask.length > 0){
        completeTask.forEach((item, index) => {
            cardCompletedZone.innerHTML += createCompleteTask(item, index)
        });
    }
}


const deleteCompleteTask = index =>{
    completeTask.splice(index, 1)
    addLocal()
    updateData()
}


const updateData = () =>{
    fillList()
    fillCompleteList()
}




updateData()



const createUncompleteTask = (task, index) =>{
    return`
    <div class="task__card">
        <button class="task__complete" onclick='taskUnDone(${index})></button>
        <div class="task__text">${task.text}</div>
        <button class="task__delete" onclick='deleteCompleteTask(${index})'></button>
    </div>
    `
}


const taskUnDone = index =>{
    completeTask.splice(index, 1)
    addLocal()
    updateData()
}
updateData()