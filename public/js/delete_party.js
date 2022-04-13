// referenced from our project
const deleteButton = document.getElementById(`delete`);
const id = deleteButton.getAttribute('data-id');
deleteButton.onclick = async (e) => {
	e.preventDefault(); 	// do not trigger default functionality		
	console.log(id);
	if (confirm('Are you sure you want to delete this plant?')) {
		await fetch(`/party/delete/${id}`, {
			method: 'DELETE'
		});
		window.location.href = '/party';
	} else {
		window.location.href = `/party`;
	}

};
