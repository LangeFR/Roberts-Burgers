window.onload = function () {
  actualizarTotal(0);
  let objetoDiv = document.getElementById("itemsCarritoID");
  let alturaPago = document.getElementById("pagoID").offsetHeight;
  alturaPago -= 40;
  objetoDiv.setAttribute(
    "style",
    "display: flex; justify-content: space-between; min-height: " + alturaPago + "px; flex: 1; background-color: #f0f0f0; border-radius: 10px; padding: 20px;"
  );
  objetoDiv = document.getElementById("resumenPagoID");
  alturaPago = document.getElementById("pagoID").offsetHeight;
  alturaPago -= 40;
  objetoDiv.setAttribute(
    "style",
    "flex: 1; background-color: #f0f0f0; border-radius: 10px; padding: 20px; height: " + alturaPago + "px;"
  );

};


function quitarEspacios(string) {
  return string.replace(/\s/g, "");
}
var listaJSON = {};
let countJSON = 0;

/*
    -------------------
    Landing Page Inicio
    -------------------
*/

// ESTABLECIDO EL LOADER
function mostrarLoading() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
}

function ocultarLoading() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}

function readMorePresentacion() {
  var dots = document.getElementById("dotsReadMorePresentacion");
  var moreText = document.getElementById("moreTextPresentacion");
  var btnText = document.getElementById("btnReadMorePresentacion");
  var hamburguesaImg = document.getElementById("hamburguesaDescripcion");
  var malteadaImg = document.getElementById("malteadaDescripcion");
  var descripcion =
    document.getElementsByClassName("divPresentacion").clientHeight;

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";

    hamburguesaImg.style.marginLeft = "5px"; // Restablecer margen izquierdo
    hamburguesaImg.setAttribute(
      "style",
      "aspect-ratio: 150 / 100; min-height: 150px; min-width: 225px; max-width: 225px; margin: 18px; max-height: 150px;"
    );
    malteadaImg.setAttribute(
      "style",
      "aspect-ratio: 150 / 100; min-height: 150px; min-width: 225px; max-width: 225px; margin: 18px; max-height: 150px;"
    );
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";

    hamburguesaImg.style.aspectRatio = 225 / 350;
    hamburguesaImg.style.minHeight = "350px";
    hamburguesaImg.style.minWidth = "225px";
    hamburguesaImg.style.maxWidth = "225px";

    malteadaImg.style.aspectRatio = 225 / 350;
    malteadaImg.style.minHeight = "350px";
    malteadaImg.style.minWidth = "225px";
    malteadaImg.style.maxWidth = "225px";
  }
}

//FUNCIÓN PARA CARGAR MENÚ

document.addEventListener("DOMContentLoaded", () => {
  const listaItemsPrincipales = document.getElementById(
    "listaItemsPrincipales"
  );
  const listaItemsEntrada = document.getElementById("listaItemsEntrada");
  const listaItemsBebidas = document.getElementById("listaItemsBebidas");
  const listaItemsPostres = document.getElementById("listaItemsPostres");
  const infoPlato = document.querySelector(".InfoPlato");

  if (infoPlato.innerHTML.trim() === "") {
    const loader = document.querySelector("#loader img");
    loader.src = "hamburguesa_elegante.png";
  }

  // Función ASINCRONA para cargar y mostrar los platos según la categoría
  async function mostrarPlatosPorCategoria(categoria) {
    try {
      mostrarLoading(categoria);
      mostrarBloqueoPantalla();
      const loading = document.getElementById("loader");
      infoPlato.innerHTML = "";

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwgidJUqj5RAmPH_sZQVA2D-rHAcxO4bKfAjG2ursRCa3o7dbFZ36WafHT0-Z-bCr8X/exec"
      );
      if (response.ok) {
        const data = await response.json();
        const platosCategoria = data.data.filter(
          (plato) => plato.Categoria === categoria
        ); //se filtran por categorias :)
        // Mostrar info de los platos de la categoría

        platosCategoria.forEach((plato) => {
          console.log(`${plato.Nombre}`);
          console.log(`{plato.Nombre}`);
          infoPlato.innerHTML += ` 
                  <div class="platoContainer"  id="infoPlatoContainer${plato.ID}">                      
                      <img id="imagen${plato.ID}" src="${plato.Imagen ?? ""}"/>
                      <div class"infoPlatoContainer">
                        <div class="nombrePrecioPlato">
                          <h3 class="nombre">${plato.Nombre ?? ""}</h3>
                          <h3> - </h3>
                          <h3 class="precio" id="precio${quitarEspacios(plato.Nombre)}">${plato.Precio}</h3>
                        </div>
                        <p class="descripcion">${plato.Descripcion ?? ""}</p>
                        <p class="id">ID: ${plato.ID ?? ""}</p>
                        <button class="añadir-carrito" onClick="añadirAlCarrito(${plato.ID
            })">Agregar al carrito</button>
                      </div>
                  </div>
                  <hr>
                    
          `;

          let idPrecio = "precio" + quitarEspacios(plato.Nombre);
          formatoPrecio(idPrecio);

          let tempID = "imagen" + plato.ID;
          let imagenPlato = document.getElementById(tempID);

          imagenPlato.setAttribute(
            "style",
            "aspect-ratio: 150 / 100; min-height: 150px; min-width: 225px; max-width: 225px; margin-top: 5px; max-height: 150px;"
          );

          tempID = "infoPlatoContainer" + plato.ID;
          let infoPlatoId = document.getElementById(tempID);
          infoPlatoId.setAttribute("style", "display: flex; gap: 10px;");
        });
        ocultarLoading();
        ocultarBloqueoPantalla();
      } else {
        throw new Error("Error en la solicitud: " + response.status);
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error, realiza la acción nuevamente");
      ocultarLoading();
    }
  }

  // Llamadas a la función para cargar información en cada divv
  listaItemsPrincipales.addEventListener("click", () => {
    mostrarPlatosPorCategoria("platosPrincipales");
  });

  listaItemsBebidas.addEventListener("click", () => {
    mostrarPlatosPorCategoria("Bebidas");
  });

  listaItemsPostres.addEventListener("click", () => {
    mostrarPlatosPorCategoria("Postres");
  });

  listaItemsEntrada.addEventListener("click", () => {
    mostrarPlatosPorCategoria("Entradas");
  });
});

/*
  Precios
*/

function formatoPrecio(idPrecio) {

  var elemento = document.getElementById(idPrecio);
  var precioBruto = parseFloat(elemento.textContent);

  elemento.textContent = precioBruto.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });
}
// Selecciona todos los elementos que tienen la clase 'precio'

/*
    ------------------
    Landing Page Final
    ------------------
*/

///----------------------
async function añadirAlCarrito(idProducto) {
  if (arrayCarrito(listaJSON).length > 1) {
    let objetoDiv = document.getElementById("carritoComprasID");
    objetoDiv.setAttribute(
      "style",
      "display: gap: 10px; flex; flex-direction: row; align-items: center; justify-content: center; margin: 20px;"
    );
  }

  let nombreProducto;
  let precioProducto;

  try {
    mostrarLoading();
    mostrarBloqueoPantalla();

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwgidJUqj5RAmPH_sZQVA2D-rHAcxO4bKfAjG2ursRCa3o7dbFZ36WafHT0-Z-bCr8X/exec"
    );
    if (response.ok) {
      const dataResponse = await response.json();

      const data = dataResponse.data; // Acceder al arreglo de objetos dentro de la propiedad "data"
      nombreProducto = data[idProducto].Nombre;
      precioProducto = parseFloat(data[idProducto].Precio);
      idProducto = parseInt(data[idProducto].ID);

      ocultarLoading();
      ocultarBloqueoPantalla();
    } else {
      throw new Error("Error en la solicitud: " + response.status);
    }
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error, realiza la acción nuevamente");
  }

  // Llama a una función para agregar el nombre del producto a la lista en el otro HTML
  agregarProductoALista(nombreProducto, precioProducto, idProducto);
  actualizarTotal(precioProducto);
}

// Función para agregar el nombre del producto a la lista en el otro HTML
function agregarProductoALista(nombreProducto, precioProducto, idProducto) {
  /*
    Revisar si el producto ya esta en la lista
  */
  const carrito = localStorage.getItem("carrito") || [];
  let yaEsta = false;

  for (var clave in listaJSON) {
    if (listaJSON.hasOwnProperty(clave)) {
      if (listaJSON[clave].Nombre === nombreProducto) {
        console.log("Paso. Se añade Cantidad");
        yaEsta = true;
        listaJSON[clave].Cantidad++;
        break; // Termina el bucle una vez que se encuentra el objeto
      }
    }
  }

  let idJSON = Object.keys(listaJSON).length - 1;

  if (yaEsta === false) {
    idJSON++;
    // Crea un nuevo elemento de lista
    const nuevoElementoLista = document.createElement("li");
    nuevoElementoLista.classList.add("item-lista");

    // Crea un elemento de botón para el botón de eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("eliminar-item");

    botonEliminar.addEventListener("click", function () {
      this.parentElement.remove(); // Elimina el elemento de lista al hacer clic en el botón de eliminar
      precioProducto *= -1;
      actualizarTotal(precioProducto);
    });

    const precioFormateado = precioProducto.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    });

    listaJSON[idJSON] = {
      Nombre: nombreProducto,
      Precio: precioProducto,
      Cantidad: 1,
      ID: idProducto,
    };

    let idItem = quitarEspacios(nombreProducto);

    carritoList.innerHTML += `
      <li class="item-lista" id="carrito${idItem}">
        <div class="carritoNombrePrecio">
            <h3>${nombreProducto}</h3>
            <h3> - </h3>
            <h3 class="precio" id="precioCarrito${quitarEspacios(
      listaJSON[idJSON].Nombre
    )}">${listaJSON[idJSON].Precio}</h3>
        </div>
        <div class="cantidadItem">
            <button class="btnMasItem" id="btnMasItem${idItem}" onclick="masItem('${String(idItem)}', '${String(idJSON)}')">+</button>
            <p class="cantidadItem" id="cantidad${idItem}"> ${listaJSON[idJSON].Cantidad}</p>
            <button class="btnMenosItem" id="btnMenosItem${idItem}" onclick="menosItem('${String(idItem)}', '${String(idJSON)}')">-</button>
        </div>
      </li>
    `;

    let btnMasHTMLID = "btnMasItem" + idItem;
    let btnMas = document.getElementById(btnMasHTMLID);
    btnMas.setAttribute("style", "height: 20px; width: 20px; padding: 0px");

    let btnMenosHTMLID = "btnMenosItem" + idItem;
    let btnMenos = document.getElementById(btnMenosHTMLID);
    btnMenos.setAttribute("style", "height: 20px; width: 20px;  padding: 0px");

    let idPrecio = "precioCarrito" + quitarEspacios(listaJSON[idJSON].Nombre);
    formatoPrecio(idPrecio);
  } else {
    let idStr = "cantidad" + quitarEspacios(nombreProducto);
    let cantidadElemento = document.getElementById(idStr);

    cantidadElemento.innerHTML =
      listaJSON[encontrarKeyPorID(listaJSON, idProducto)].Cantidad;

    actualizarPrecioCarrito(nombreProducto, idProducto);
  }
  console.log("listaJSON");
  console.log(listaJSON);
}

function actualizarPrecioCarrito(nombreProducto, idProducto) {
  let idStr = "precioCarrito" + quitarEspacios(nombreProducto);
  let precioElemento = document.getElementById(idStr);

  precioElemento.innerHTML =
    listaJSON[encontrarKeyPorID(listaJSON, idProducto)].Precio *
    listaJSON[encontrarKeyPorID(listaJSON, idProducto)].Cantidad;
  formatoPrecio(idStr);
}

function masItem(idItem, idJSON) {
  listaJSON[idJSON].Cantidad++;
  actualizarTotal(listaJSON[idJSON].Precio);

  let idStr = "cantidad" + idItem;
  let cantidadElemento = document.getElementById(idStr);

  cantidadElemento.innerHTML = listaJSON[idJSON].Cantidad;

  actualizarPrecioCarrito(listaJSON[idJSON].Nombre, listaJSON[idJSON].ID);
}

function menosItem(idItem, idJSON) {
  let precio = listaJSON[idJSON].Precio * -1;

  if (listaJSON[idJSON].Cantidad > 1) {
    listaJSON[idJSON].Cantidad--;

    let idStr = "cantidad" + idItem;
    let cantidadElemento = document.getElementById(idStr);
    cantidadElemento.innerHTML = listaJSON[idJSON].Cantidad;

    actualizarPrecioCarrito(listaJSON[idJSON].Nombre, listaJSON[idJSON].ID);
  } else {
    // Obtener el elemento <li> que se desea eliminar
    let liElemento = document.getElementById("carrito" + idItem);
    // Eliminar el elemento <li>
    liElemento.remove();
    // Eliminar el producto del objeto JSON
    delete listaJSON[idJSON];
  }

  actualizarTotal(precio);
  console.log(listaJSON);
}

// Variable para almacenar el precio total
let precioTotal = 0;

// Función para actualizar el precio total
function actualizarTotal(precioProducto) {
  // Convertir el precio del producto a un número antes de sumarlo
  let precioProductoNum = parseFloat(precioProducto);

  // Sumar el precio del producto al precio total
  precioTotal += precioProductoNum;

  const precioFormateado = precioTotal.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });

  // Obtener el elemento textarea donde se muestra el total
  const totalTextarea = document.getElementById("totalPrecio");

  // Actualizar el valor del textarea con el nuevo total
  totalTextarea.value = precioFormateado; // Asegura que se muestren solo dos decimales
}

/*
    --------------
    Carrito Inicio
    --------------  
*/
// Función para agregar un elemento al carrito

function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoList = document.getElementById("carritoList");
  carritoList.innerHTML = "";
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
    carritoList.appendChild(li);
  });

  // Calcular y mostrar el total del carrito
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  const totalElement = document.getElementById("total");
  if (totalElement != null) {
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
}

// Inicializar ScrollReveal

ScrollReveal().reveal(
  "header, .seleccionaYapping, .hamburguesacentral, #divPresentacion, .categorias, footer",
  {
    delay: 300,
    duration: 500,
    distance: "100px",
    origin: "bottom",
    easing: "cubic-bezier(0.5, 0, 0, 1)",
    opacity: 0,
    reset: true,
    scale: 0.9,
  }
);

ScrollReveal().reveal(".inputUsuario, footer", {
  delay: 300,
  duration: 1000,
  distance: "300px",
  origin: "bottom",
  easing: "cubic-bezier(0, 0, 0, 1)",
  opacity: 0,
  reset: false,
  scale: 0.9,
});

// Event listener para cargar el carrito cuando la página se cargue
window.addEventListener("load", cargarCarrito);

function limpiarCarrito() {
  listaJSON = {};
  localStorage.removeItem("carrito");
  cargarCarrito();
  precioTotal = 0;
  const totalTextarea = document.getElementById("totalPrecio");
  totalTextarea.value = 0;
}

// Event listener para cargar el carrito cuando la página se cargue
window.addEventListener("load", cargarCarrito);

// Event listener para limpiar el carrito cuando se haga clic en el botón
document
  .getElementById("limpiarCarrito")
  .addEventListener("click", limpiarCarrito);

//Array Carrito
function arrayCarrito(listaProductosJSON) {
  const arrayCarrito = [];
  for (const key in listaProductosJSON) {
    if (listaProductosJSON.hasOwnProperty(key)) {
      const producto = listaProductosJSON[key];
      arrayCarrito.push(producto);
    }
  }
  return stringCarrito(arrayCarrito);
}

function stringCarrito(arrayCarrito) {
  let carritoString = "";
  for (let i = 0; i < arrayCarrito.length; i++) {
    const producto = arrayCarrito[i];
    if (i === arrayCarrito.length - 1) {
      carritoString += `ID: ${producto.ID}, Precio: ${producto.Precio}, Cantidad: ${producto.Cantidad}`;
    } else {
      carritoString += `ID: ${producto.ID}, Precio: ${producto.Precio}, Cantidad: ${producto.Cantidad}\n`;
    }
  }
  return carritoString;
}

//ESTO ES PARA INTERCEPTAR Y QUE NO SE VAYA A LA WEBAPPSCRIPT.

document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    if (Object.keys(listaJSON).length === 0) {
      window.alert("No hay productos en el carrito");
      return;

    }
    // Obtén los valores de los campos del formulario
    var nombre = document.getElementById("nombre").value;
    var numero = document.getElementById("numero").value;
    var direccion = document.getElementById("direccion").value;

    // Crea un objeto FormData para enviar los datos del formulario
    var formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("numero", numero);
    formData.append("direccion", direccion);
    formData.append("productosPedido", arrayCarrito(listaJSON));
    formData.append("total", precioTotal);

    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    var json = JSON.stringify(object);

    mostrarLoading();
    mostrarBloqueoPantalla();
    // Realiza la solicitud POST mediante fetch
    fetch(
      "https://script.google.com/macros/s/AKfycbwgidJUqj5RAmPH_sZQVA2D-rHAcxO4bKfAjG2ursRCa3o7dbFZ36WafHT0-Z-bCr8X/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        ocultarLoading();
        ocultarBloqueoPantalla();
        alert("¡Compra realizada con éxito!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
      });

    limpiarCarrito();
    limpiarFormulario();
    actualizarTotal(0);
  });

function limpiarFormulario() {
  // Limpia los valores de los campos del formulario
  document.getElementById("nombre").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("direccion").value = "";

  // Restaura los placeholders de los campos del formulario
  document.getElementById("nombre").placeholder = "Escribe tu nombre";
  document.getElementById("numero").placeholder = "Escribe tu # de telefono";
  document.getElementById("direccion").placeholder = "Escribe tu dirección";
}

/*
    --------------
    Carrito Final
    --------------
*/

function mostrarBloqueoPantalla() {
  document.getElementById("blockScreen").style.display = "block";
}

function ocultarBloqueoPantalla() {
  document.getElementById("blockScreen").style.display = "none";
}

function encontrarKeyPorID(json, id) {
  for (let key in json) {
    if (json[key].ID === id) {
      return key; // Devuelve el key si encuentra el elemento con el ID especificado
    }
  }
  console.log(
    "encontrarKeyPorID: No se encontro el ID ",
    id,
    "  de producto en JSON ",
    json
  );
  return null; // Devuelve null si no se encuentra ningún elemento con el ID especificado
}
