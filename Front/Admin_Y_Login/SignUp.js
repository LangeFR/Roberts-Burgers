document
    .getElementById("signUpForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        // Obtener los valores de usuario y contraseña del formulario
        const name = document.getElementById("campoName").value;
        const email = document.getElementById("campoEmail").value;
        const password = document.getElementById("campoPassword").value;
        const campoRol = document.getElementById("campoRol").value;

        // Objeto con los datos del formulario a enviar
        const formData = {
            name: name,
            email: email,
            password: password,
            rol: campoRol,
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
        // Realizar la solicitud POST utilizando Fetch API
        fetch("https://roberts-burgers.onrender.com/new-user", requestOptions)
        
            .then((response) => {
                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error(
                        "Error al crear usuario: " + response.statusText
                    );
                }

                // Convertir la respuesta a formato JSON
                return response.json();
            })
            .then((data) => {
                // Manejar la respuesta JSON
                console.log("Respuesta del servidor:", data);
                
                // Informa que se creo el usuario con exito
                alert("Usuario creado con exito");
                
                window.location.href = './Roberts.html';
            })
            .catch((error) => {
                // Capturar y mostrar cualquier error
                console.error("Error al procesar la solicitud:", error);
            });
    });

