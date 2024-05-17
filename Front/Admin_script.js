function loadUsers(token) {
    var token = sessionStorage.getItem('token');
    token = "VK8tGhPbAOkwsNR2Z7AX1eq9qReDEwV4sRaTsmSKeQHmGgEaU3dSCOP2pltg";
    const url = 'http://localhost:8000/api/users'; 
    console.log(token);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
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
            // Obtener el div donde queremos mostrar la lista de usuarios
            const infoContainer = document.getElementById('infoContainer');
            
            // Crear una variable para almacenar el HTML que mostrará la lista de usuarios
            let userListHTML = '<ul>'; // Iniciar la lista HTML
            
            // Recorrer los datos de usuarios y agregarlos a la lista HTML
            data.forEach(user => {
                userListHTML += `<li>${user.name} - ${user.email}</li>`;
            });
            
            userListHTML += '</ul>'; // Cerrar la lista HTML
            
            // Asignar el HTML generado al innerHTML del div
            infoContainer.innerHTML = userListHTML;
        })
        .catch(error => {
            console.error('Error al cargar usuarios:', error);
        });
}

function loadPlatos(token){
    var token = sessionStorage.getItem('token');
    token = "VK8tGhPbAOkwsNR2Z7AX1eq9qReDEwV4sRaTsmSKeQHmGgEaU3dSCOP2pltg";
    const url = 'http://localhost:8000/api/platos'; 
    console.log(token);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }

    fetch(url, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error cargando usuarios: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Lista de platos:', data);
        // Obtener el div donde queremos mostrar la lista de platos
        const infoContainer = document.getElementById('infoContainer');
        
        // Crear una variable para almacenar el HTML que mostrará la lista de usuarios
        let platoListHTML = '<ul>'; // Iniciar la lista HTML
        
        // Recorrer los datos de usuarios y agregarlos a la lista HTML
        data.forEach(plato => {
            platoListHTML += `
                <li>
                    <strong>Nombre:</strong> ${plato.nombre}<br>
                    <strong>Descripción:</strong> ${plato.descripcion}<br>
                    <strong>Precio:</strong> ${plato.precio}<br>
                    <strong>Categoría:</strong> ${plato.categoria}<br>
                    <img src="${plato.imagen}" alt="Imagen del plato">
                </li>`;
        });
        
        platoListHTML += '</ul>'; // Cerrar la lista HTML
        
        // Asignar el HTML generado al innerHTML del div
        infoContainer.innerHTML = platoListHTML;
    })
    .catch(error => {
        console.error('Error al cargar paltos:', error);
    });
}

function loadPedidos(token) {
    var token = sessionStorage.getItem('token');
    token = "VK8tGhPbAOkwsNR2Z7AX1eq9qReDEwV4sRaTsmSKeQHmGgEaU3dSCOP2pltg";
    const url = 'http://localhost:8000/api/orders'; 
    console.log(token);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }

    
    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error cargando pedidos: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Lista de pedidos:', data);
            displayOrders(data); // Llama a la función para mostrar los pedidos en el contenedor
        })
        .catch(error => {
            console.error('Error al cargar pedidos:', error);
        });
}

function displayOrders(orders) {
    const infoContainer = document.getElementById('infoContainer');
    infoContainer.innerHTML = ''; // Vacía el contenedor antes de agregar nuevos elementos

    orders.forEach(order => {
        const orderBox = document.createElement('div');
        orderBox.classList.add('order-box'); // Agregar clase para la caja del pedido

        const orderElement = document.createElement('div');
        orderElement.classList.add('order');

        const orderIdElement = document.createElement('p');
        orderIdElement.textContent = `ID del pedido: ${order.id}`;
        orderElement.appendChild(orderIdElement);

        const direccionElement = document.createElement('p');
        direccionElement.textContent = `Dirección: ${order.direccion}`;
        orderElement.appendChild(direccionElement);

        const numeroElement = document.createElement('p');
        numeroElement.textContent = `Número: ${order.numero}`;
        orderElement.appendChild(numeroElement);

        const usuarioElement = document.createElement('p');
        usuarioElement.textContent = `Usuario: ${order.user.name}`;
        orderElement.appendChild(usuarioElement);

        const platosElement = document.createElement('div');
        platosElement.classList.add('platos');
        order.platos.forEach(plato => {
            const platoElement = document.createElement('div');
            platoElement.classList.add('plato');

            const nombreElement = document.createElement('p');
            nombreElement.textContent = `Nombre: ${plato.nombre}`;
            platoElement.appendChild(nombreElement);

            const precioElement = document.createElement('p');
            precioElement.textContent = `Precio: $${plato.precio}`;
            platoElement.appendChild(precioElement);

            // Puedes agregar más información de cada plato si lo deseas

            platosElement.appendChild(platoElement);
        });
        orderElement.appendChild(platosElement);

        orderBox.appendChild(orderElement);
        infoContainer.appendChild(orderBox);
    });
}
