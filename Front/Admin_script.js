function loadUsers(token) {
    var token = sessionStorage.getItem('token');
    const url = 'http://localhost:8000/api/users'; 
    console.log(token);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        //mode: 'no-cors'
    }

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error cargando usuarios: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Lista de usuarios:', data);
            // Aquí puedes manipular los datos como desees, por ejemplo, mostrarlos en tu página web
        })
        .catch(error => {
            console.error('Error al cargar usuarios:', error);
        });
}