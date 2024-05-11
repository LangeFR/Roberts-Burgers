document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        // Obtener los valores de usuario y contraseña del formulario
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Objeto con los datos del formulario a enviar
        const formData = {
            email: email,
            password: password,
        };

        // Configurar la solicitud POST
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(formData),
        };

        // Realizar la solicitud POST utilizando Fetch API
        fetch("http://127.0.0.1:8000/api/login", requestOptions)
        
            .then((response) => {
                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error(
                        "Error al iniciar sesión: " + response.statusText
                    );
                }
                // Convertir la respuesta a formato JSON
                return response.json();
            })
            .then((data) => {
                // Manejar la respuesta JSON
                console.log("Respuesta del servidor:", data);
                // Guardar el token en el session storage del navegador
                sessionStorage.setItem("token", data.token);
            })
            .catch((error) => {
                // Capturar y mostrar cualquier error
                console.error("Error al procesar la solicitud:", error);
            });
    });


function loadUsers() {
    const token = sessionStorage.getItem('token');
    const url = 'http://localhost:8000/api/users'; // Reemplaza la URL con la correcta para tu aplicación
    console.log(token);
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        mode: 'no-cors'
    })
        .then(response => {
            return "hola";
            if (!response.ok) {
                throw new Error('Error al cargar usuarios: ' + response.statusText);
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

