document.addEventListener('DOMContentLoaded', () => {
    console.log('Create button script loaded');

    // Handler for "Create" button click
    const handleCreate = async (event) => {
        if (event.target.matches('.new-task')) {
            event.preventDefault();

            const name = document.getElementById('task-name').value;
            const description = document.getElementById('task-description').value;
            const notification = document.getElementById('notify').checked;
            const priority = document.getElementById('priority').value;
            const due_date = document.getElementById('due-date').value;


            const newTask = {
                name: name,
                description: description,
                notification: notification,
                priority: priority,
                due_date: due_date,
            };

            try {
                const response = await fetch('/api/task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTask)
                });

                if (response.ok) {
                    // Redirect to the updated task list
                    document.location.href = '/';
                } else {
                    console.log('Failed to create task');
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    // Add event listener for create button
    const createButton = document.querySelector('.new-task');
    if (createButton) {
        createButton.addEventListener('click', handleCreate);
        console.log('Event listener attached to "Create" button');
    } else {
        console.error('Create button not found');
    }
});
