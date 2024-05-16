document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        // Obtener los valores de usuario y contraseña del formulario
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Objeto con los datos del formulario a enviar
        const formData = {
            username: username,
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
        fetch("'http://127.0.0.1:8000/api/login'", requestOptions)
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
