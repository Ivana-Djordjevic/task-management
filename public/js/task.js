const taskForm = document.querySelector('#task-form');
const newTaskBtn = document.querySelector('.show-create-task');

newTaskBtn.addEventListener('click', () => {
    taskForm.classList.remove('hidden')
});


