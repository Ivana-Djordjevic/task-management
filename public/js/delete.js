document.addEventListener('DOMContentLoaded', () => {
    console.log('Delete button script loaded');

    // Handler for "Delete" button click
    const handleDelete = async (event) => {
        if (event.target.matches('.delete-button')) {
            const id = event.target.getAttribute('data-id');

            try {
                const response = await fetch(`/api/task/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    // Redirect to the task list
                    document.location.href = '/';
                } else {
                    console.log('Failed to delete task');
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    // Add event listener for delete button
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', handleDelete);
    });

    console.log('Event listener attached to "Delete" buttons');
});
