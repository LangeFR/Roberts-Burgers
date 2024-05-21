document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        // Obtener los valores de usuario y contraseña del formulario
        const email = document.getElementById("campoEmail").value;
        const password = document.getElementById("campoPassword").value;

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
        console.log(requestOptions)
        const url = "https://roberts-burgers.onrender.com/api/login"
        // Realizar la solicitud POST utilizando Fetch API
        fetch(url, requestOptions)
        
            .then((response) => {
                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    if(response.status == 401){
                        alert("Credenciales incorrectas");
                    }
                    else if(response.status == 400){
                        alert("Usuario no Existe");
                    }
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
                sessionStorage.setItem("user_id", data.user_id);
                
                window.location.href = '../index.html';
            })
            .catch((error) => {
                // Capturar y mostrar cualquier error
                console.error("Error al procesar la solicitud:", error);
            });
    });

