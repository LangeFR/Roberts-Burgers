var token="eilefHhAUGOcN7OUqW2DE5prH2r5UoHQdejJpcK5Q78FLGSyHSO9yQ5pNJEm";
sessionStorage.setItem("token", token);
function loadUsers(token) {
    var token = sessionStorage.getItem('token');
    //token = "eilefHhAUGOcN7OUqW2DE5prH2r5UoHQdejJpcK5Q78FLGSyHSO9yQ5pNJEm";
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
    //token = "VK8tGhPbAOkwsNR2Z7AX1eq9qReDEwV4sRaTsmSKeQHmGgEaU3dSCOP2pltg";
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
                    <img src=".${plato.imagen}" alt="Imagen del plato">
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

var ordersEntregadas = [];
function loadPedidos(token) {
    var token = sessionStorage.getItem('token');
    //token = "VK8tGhPbAOkwsNR2Z7AX1eq9qReDEwV4sRaTsmSKeQHmGgEaU3dSCOP2pltg";
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
            // Loop para agregar las órdenes entregadas al array global
            data.forEach(order => {
                if (order.entregada === 'T') {
                    ordersEntregadas.push(order.id);
                }
            });
            console.log(ordersEntregadas);
            displayOrders(data); // Llama a la función para mostrar los pedidos en el contenedor
        })
        .catch(error => {
            console.error('Error al cargar pedidos:', error);
        });
}

function displayOrders(orders) {
    const infoContainer = document.getElementById('infoContainer');
    infoContainer.innerHTML = ''; // Vacía el contenedor antes de agregar nuevos elementos

    console.log('orders: ', orders);
    orders.forEach(order => {
        const platosHTML = order.platos.map(plato => `
            <li class="plato${plato.categoria}">
                <p>${plato.nombre}</p>
                <p>Cantidad: ${plato.pivot.quantity}</p>
                <!-- Puedes agregar más información de cada plato si lo deseas -->
            </li>
        `).join('');

        const orderHTML = `
            <div class="order" id="order${order.id}">
                <h2>Pedido: ${order.id}</h2>
                <p>Dirección: ${order.direccion}</p>
                <p>Número: ${order.numero}</p>
                <p>Usuario: ${order.user.name}</p>
                <ul class="platos">
                    ${platosHTML}
                </ul>
                <button class="botonEntregado" id="botonEntregado${order.id}" onclick="productoAtendido(${order.id})">Entregado</button>
            </div>
        `;

        infoContainer.innerHTML += orderHTML;

        const orderElement = document.getElementById(`order${order.id}`);
        if (ordersEntregadas.includes(order.id)) {
            orderElement.style.backgroundColor = '#90EE90';
        }
    });
}

function productoAtendido(idOrder) {
    //var token = sessionStorage.getItem('token');
    const formData = {
        id: idOrder,
    };
    const requestOptions = {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
        //mode: 'no-cors',
    }
    console.log(requestOptions);
    console.log(JSON.stringify(formData));

        fetch("http://127.0.0.1:8000/api/entregar-order", requestOptions)

            .then((response) => {
                console.log(response);
                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error(
                    "Error al entregar order: " + response.statusText
                );
                }
                // Convertir la respuesta a formato JSON
                return response;
            })

            .then((data) => {
                console.log("Respuesta del servidor:", data);

                // ocultarLoading();
                // ocultarBloqueoPantalla();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Error al entregar el pedido. Por favor, inténtalo de nuevo.");
            });

    var nombre = "order" + idOrder;
    var box = document.getElementById(nombre);
    box.style.backgroundColor = "#90EE90"; // Verde claro
}
