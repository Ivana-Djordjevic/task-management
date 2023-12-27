const taskForm = document.querySelector('#task-form');
const newTaskBtn = document.querySelector('.new-task');

newTaskBtn.addEventListener('click', () => {
    taskForm.classList.remove('hidden')
});