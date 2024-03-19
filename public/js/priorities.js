const priorities = document.querySelectorAll('.priority');

priorities.forEach(item => {
    if(item.textContent === 'true') {
        item.textContent = 'High Priority';
        item.classList.add('priority-color')
    } else {
        item.textContent = 'Low Priority';
    }
});