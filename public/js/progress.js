const progress = document.querySelectorAll('.progress');

progress.forEach(item => {
    if(item.textContent === '1') {
        item.textContent = 'Not started';
    } else if (item.textContent === '2'){
        item.textContent = 'In progress';
    } else {
        item.textContent = 'Completed';
    }
});