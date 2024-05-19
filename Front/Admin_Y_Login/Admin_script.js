var token=sessionStorage.getItem("token");

function loadUsers(token) {
    const infoContainer = document.getElementById('infoContainer');
    infoContainer.innerHTML = ''; // Vacía el contenedor antes de agregar nuevos elementos

    // Cambia el estilo del contenedor para que se comporte como una tabla
    infoContainer.style.display = 'grid';
    infoContainer.style.gridTemplateColumns = 'repeat(5, auto)';
    infoContainer.style.gap = '10px';
    infoContainer.style.justifyItems = 'center';

    // Añadir la fila de encabezado
    const headerHTML = `
        <div class="header-cell">-</div>
        <div class="header-cell">Nombre</div>
        <div class="header-cell">Email</div>
        <div class="header-cell">Rol</div>
        <div class="header-cell">Action</div>
    `;
    infoContainer.innerHTML += headerHTML;

    const rows = document.querySelectorAll('#infoContainer > div');


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
            let userListHTML = ''; // Iniciar la lista HTML
            
            // Recorrer los datos de usuarios y agregarlos a la lista HTML
            data.forEach(user => {
                userListHTML = `
                    <strong>${user.id}</strong>
                `
                infoContainer.innerHTML += userListHTML;
                userListHTML = `
                    <strong>${user.name}</strong> 
                `
                infoContainer.innerHTML += userListHTML;
                userListHTML = `     
                    <strong>${user.email}</strong> 
                `;
                infoContainer.innerHTML += userListHTML;
                userListHTML = `
                    <strong>${user.rol}</strong>
                `;
                infoContainer.innerHTML += userListHTML;
                userListHTML = `
                    <button class="ver-button" onclick="verUsuario(${user.id})">Ver</button>
                `
                infoContainer.innerHTML += userListHTML;
            });
            
            // Asignar el HTML generado al innerHTML del div

        })
        .catch(error => {
            console.error('Error al cargar usuarios:', error);
        });
}

async function verUsuario(idUsuario) {
    // Abrir una ventana emergente con Google como URL
    const url = `http://localhost:8000/api/user?id=${idUsuario}`; 

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    
    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error('Error cargando usuario: ' + response.statusText);
        }
        const data = await response.json();
        
        console.log('Usuario:', data);
        // Cargar los datos del usuario en userContainer
        const userContainer = document.getElementById('usuarioContainer');
        userContainer.innerHTML = `
            <div id="infoUserContainer">
                <strong>ID: ${data[0].id}</strong>
                <h3>Nombre: ${data[0].name}</h3>
                <h3>Email: ${data[0].email}</h3>
                <h3>Rol: ${data[0].rol}</h3> 
            </div>             
        `;

        var ordersHTML = "";
        // Mostrar pedidos del usuario
        for (const orderInfo of data[0].orders) {
            var order = await getOrderById(orderInfo.id);
            order = order[0];
            // console.log("Order:", order);
            // console.log("User", order.user);
            // console.log("Platos", order.platos);


            const platosHTML = order.platos.map(plato => `
                <li class="plato${plato.categoria}">
                    <p>${plato.nombre}</p>
                    <p>Cantidad: ${plato.pivot.quantity}</p>
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
                </div>
            `;

            ordersHTML += orderHTML;
        }
        userContainer.innerHTML += `
        
        <div id="pedidosUsuarioContainer">
            ${ordersHTML}
        </div>
        `;
        console.log(data[0].orders)
        marcarColorEntregado(data[0].orders);
        observarCambiosInfoContainer();
    } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
    }
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
        let platoListHTML = ''; // Iniciar la lista HTML

        data.forEach(plato => {
            if(plato.categoria == "entradas")
                plato.categoria = "Entradas";
            else if(plato.categoria == "platos_principales")
                plato.categoria = "Platos Principales";
            else if(plato.categoria == "bebidas")
                plato.categoria = "Bebidas";
            else if(plato.categoria == "postres")
                plato.categoria = "Postres";

        });

        
        // Recorrer los datos de usuarios y agregarlos a la lista HTML
        data.forEach(plato => {
            platoListHTML += `
                <div class="plato" id="plato${plato.id}">
                    <h2>ID: ${plato.id}</h2> 
                    <strong>Nombre:</strong> ${plato.nombre}<br>
                    <strong>Descripción:</strong> ${plato.descripcion}<br>
                    <strong>Precio: </strong> $${plato.precio} 
                    <strong>Categoría:</strong> ${plato.categoria}<br>
                </div>`;
        });
        
        //platoListHTML += '</ul>'; // Cerrar la lista HTML
        
        // Asignar el HTML generado al innerHTML del div
        infoContainer.innerHTML = platoListHTML;
    })
    .catch(error => {
        console.error('Error al cargar paltos:', error);
    });
}

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
    });
    marcarColorEntregado(orders);
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
async function getOrderById(idOrder) {
    const url = `http://127.0.0.1:8000/api/order?id=${idOrder}`; 
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error('Error cargando pedidos: ' + response.statusText);
        }
        const data = await response.json();
        return data; // Devuelve los datos del pedido
    } catch (error) {
        console.error('Error al cargar pedidos:', error);
    }
}


function marcarColorEntregado(orders){
    orders.forEach(order => {
        if (order.entregada === "T") {
            const orderElement = document.getElementById(`order${order.id}`);
            orderElement.style.backgroundColor = '#90EE90';
        }
    });
    
}

function observarCambiosInfoContainer() {
    // Selecciona el nodo de #infoContainer y #usuarioContainer
    const infoContainer = document.getElementById('infoContainer');
    const usuarioContainer = document.getElementById('usuarioContainer');

    // Función para limpiar el contenido de #usuarioContainer
    function limpiarUsuarioContainer() {
        usuarioContainer.innerHTML = "";
    }

    // Configurar Mutation Observer para observar cambios en #infoContainer
    const observer = new MutationObserver(() => {
        limpiarUsuarioContainer();
    });

    // Configurar opciones para el observador
    const observerOptions = {
        childList: true, // Observar cambios en los hijos (agregar o eliminar elementos)
        subtree: true // Observar todo el subárbol descendente
    };

    // Inicia la observación de #infoContainer con las opciones especificadas
    observer.observe(infoContainer, observerOptions);
}
