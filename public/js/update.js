// Handler for "Update" button click
const handleUpdate = async (event) => {
    event.preventDefault();

    // Get task ID from the update button's data attribute
    const taskID = event.target.getAttribute('data-id');
    console.log('Update button clicked');

}

// Event listener to for update button
console.log('Attempting to attach event listener');
document.querySelector('.update-button').addEventListener('click', handleUpdate);
