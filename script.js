document.getElementById("crear").addEventListener("click", function() {
    let num_cuadros = parseInt(document.getElementById("num_cuadros").value);
    let precios = document.getElementById("precios");

    precios.innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("calcular").style.display = "none";

    if (isNaN(num_cuadros) || num_cuadros < 1) {
        alert("Introduce un número válido de cuadros");
        return;
    }

    for (let i = 1; i <= num_cuadros; i++) {
        precios.innerHTML += `
            <div class="campo-precio">
                <label for="precio${i}">Precio del cuadro ${i} (€):</label>
                <input type="number" id="precio${i}" min="0" step="0.01" required>
            </div>
        `;
    }

    document.getElementById("calcular").style.display = "block";
});

document.getElementById("calcular").addEventListener("click", function() {
    let num_cuadros = parseInt(document.getElementById("num_cuadros").value);
    let suma_precio = 0;
    let menor = 0;
    let precios_validos = true;

    for (let i = 1; i <= num_cuadros; i++) {
        let campo = document.getElementById("precio" + i);

        if (campo == null || campo.value.trim() === "") {
            precios_validos = false;
            break;
        }

        let precio_cuadro = parseFloat(campo.value);

        if (!Number.isFinite(precio_cuadro) || precio_cuadro < 0) {
            precios_validos = false;
            break;
        }

        if (i === 1) {
            menor = precio_cuadro;
        } else if (menor > precio_cuadro) {
            menor = precio_cuadro;
        }

        suma_precio += precio_cuadro;
    }

    if (!precios_validos) {
        alert("Introduce un precio válido para cada cuadro");
        return;
    }

    let porcentaje = 0;

    if (num_cuadros === 2) {
        porcentaje = 0.15;
    } else if (num_cuadros === 3) {
        porcentaje = 0.25;
    } else if (num_cuadros === 4) {
        porcentaje = 0.40;
    } else if (num_cuadros >= 5) {
        porcentaje = 0.50;
    }

    let descuento = menor * porcentaje;
    let precio_a_pagar = suma_precio - descuento;

    document.getElementById("resultado").innerHTML = `
        <h2>Resultado del pedido</h2>
        Número de cuadros: ${num_cuadros}<br>
        Suma original: ${suma_precio.toFixed(2)} €<br>
        Cuadro más barato: ${menor.toFixed(2)} €<br>
        Descuento aplicado: ${(porcentaje * 100).toFixed(0)} %<br>
        Importe descontado: ${descuento.toFixed(2)} €<br>
        <div class="total">
            Total a pagar: ${precio_a_pagar.toFixed(2)} €
        </div>
    `;
});

document.getElementById("limpiar").addEventListener("click", function() {
    document.getElementById("num_cuadros").value = 1;
    document.getElementById("precios").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("calcular").style.display = "none";
});