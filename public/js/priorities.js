const priorities = document.querySelectorAll('.priority') 

priorities.forEach(item => {
    if(item.textContent === 'true') {
        item.textContent = 'High Priority'
    } else {
        item.textContent = 'Low Priority'
    }
})