let pedido = JSON.parse(localStorage.getItem('pedido')) || [];
let contenedor = document.getElementById("items");
let cantidad = document.getElementById('cantidad');
cantidad.innerText = `☑📦${pedido.length}`;

if (pedido.length != 0) {
    for (const prod of pedido) {
        document.getElementById('tablabody').innerHTML += `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.nombre}</td>
                <td>${prod.precio}</td>
            </tr>
        `;
    }
    let montoPedido = pedido.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    document.getElementById('monto').innerText = 'Total a pagar $: ' + montoPedido;
}

// push pedido

function pushearPedido(pushear) {
    pedido.push(pushear);
    cantidad.innerText = `☑📦${pedido.length}`;
    console.table(pedido);

    document.getElementById('tablabody').innerHTML += `
        <tr>
            <td>${pushear.id}</td>
            <td>${pushear.nombre}</td>
            <td>${pushear.precio}</td>
        </tr>
    `;

    let montoPedido = pedido.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    document.getElementById('monto').innerText = 'Monto Total $: ' + montoPedido;
    localStorage.setItem('pedido', JSON.stringify(pedido));
}

function crearProductos(productos) {
    contenedor.innerHTML = '';
    for (const producto of productos) {
        contenedor.innerHTML += `
            <div class="card col-sm-2">
                <img src=${producto.imagen} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.id}</h5>
                    <p class="card-text">${producto.nombre}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <button id='btn${producto.id}' class="btn btn-primary align-bottom">Comprar</button>
                </div>
            </div>   
        `;
    }

    productos.forEach((producto) => {
        document.getElementById(`btn${producto.id}`).addEventListener('click', () => {
            pushearPedido(producto);
        });
    });
}

crearProductos(productos);

// FINALIZAR PEDIDO

let finalizarBtn = document.getElementById('finalizar');

// vaciar oc

finalizarBtn.onclick = () => {
    pedido = [];
    document.getElementById('tablabody').innerHTML = ''
    cantidad.innerText = `☑📦${pedido.length}`;
    document.getElementById('monto').innerText = 'Monto Total $: ';
    localStorage.removeItem('pedido');
}

// generar oc

const btnVaciar = document.getElementById('vaciar');
btnVaciar.onclick = () => {
    pedido = [];
    document.getElementById('tablabody').innerHTML = ''
    cantidad.innerText = `☑📦${pedido.length}`;
    document.getElementById('monto').innerText = 'Monto Total $: ';
    localStorage.removeItem('pedido');
}