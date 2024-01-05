// Handler for "Update" button click
const handleUpdate = async (event) => {
    if (event.target.matches('.task-list .edit-button')) {      
        const id = event.target.getAttribute('data-id');
      
        document.location.replace(`/edit/${id}`);
      }
    
}

document.querySelector('.task-list').addEventListener('click', handleUpdate);
