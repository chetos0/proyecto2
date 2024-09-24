// Función para convertir fracciones a decimales

function fraccionToDecimal(value) {
    if (value.includes('/')) {
        const [numerator, denominator] = value.split('/');
        return parseFloat(numerator) / parseFloat(denominator);
    }
    return parseFloat(value);
}

// Función para evaluar la ecuación usando la librería 'math.js'
function evalFunction(func, x) {
    return math.evaluate(func.replace(/x/g, `(${x})`));
}

// Función para obtener la derivada simbólica usando 'math.js'
function derivativeFunction(func) {
    const expr = math.derivative(func, 'x');
    return expr.toString();
}
/*----------------------------
// Implementación del método de Newton-Raphson
function newtonRaphson() {
    const func = document.getElementById('funcion').value;
    const tolerance = parseFloat(document.getElementById('tolerance').value);
    let x = fractionToDecimal(document.getElementById('approx').value);
    
    console.log(func,tolerance,x);
    const maxIter = 100;
    let iter = 0;
    let resultHTML = '';
    let iterationsHTML = `
        <table>
            <thead>
                <tr>
                    <th>Paso</th>
                    <th>x</th>
                    <th>Es % </th>
                </tr>
            </thead>
            <tbody>
    `;
    
    const derivedFunc = derivativeFunction(func);
/*
    // Mostrar función y derivada usando LaTeX
    resultHTML += `<p>Función: \( ${math.parse(func).toTex()} \)</p>`;
    resultHTML += `<p>Derivada: \( ${math.parse(derivedFunc).toTex()} \)</p>`;
*/

// Mostrar función y derivada usando LaTeX

/*resultHTML += `<p>Función: \\( ${math.parse(func).toTex()} \\)</p>`;
resultHTML += `<p>Derivada: \\( ${math.parse(derivedFunc).toTex()} \\)</p>`;

// Actualizar el contenido en el DOM
document.getElementById('result').innerHTML = resultHTML;

// Verificar si las ecuaciones se visualizan correctamente
MathJax.typesetPromise().then(() => {
    console.log("Ecuaciones renderizadas correctamente");
}).catch((err) => {
    console.error("Error al renderizar las ecuaciones: ", err.message);
});



/*------------------------*/

    // Newton-Raphson iterations
 /*   let prevX;
    while (iter < maxIter) {
        const fx = evalFunction(func, x);
        const dfx = evalFunction(derivedFunc, x);

        if (dfx === 0) {
            resultHTML += '<p>Error: La derivada es cero. El método no puede continuar.</p>';
            break;
        }

        prevX = x;
        x = x - fx / dfx;

        const error = Math.abs((x - prevX)/x)*100;

        // Agregar fila de iteración a la tabla
        iterationsHTML += `
            <tr>
                <td>x${iter + 1}</td>
                <td>${x.toFixed(8)}</td>
                <td>${error.toFixed(3)}</td>
            </tr>
        `;

        if (error < tolerance) {
            resultHTML += `<p>Raíz encontrada: x = ${x.toFixed(4)}</p>`;
            break;
        }

        iter++;
    }

    iterationsHTML += '</tbody></table>';

    // Mostrar resultados e iteraciones
    document.getElementById('result').innerHTML = resultHTML;
    document.getElementById('iterations').innerHTML = iterationsHTML;

    // Renderizar LaTeX
    MathJax.typeset();
}
/*----------------------------------

*/



function newtonRaphson() {
    const func = document.getElementById('funcion').value;
    const tolerance = parseFloat(document.getElementById('tolerance').value);
    let x = fraccionToDecimal(document.getElementById('approx').value);

    const resultElement = document.getElementById('result');
    const iterationsElement = document.getElementById('iterations');
    const errorElement = document.getElementById('errorMessage');

    // Limpiar contenido previo
    resultElement.innerHTML = '';
    iterationsElement.innerHTML = '';
    errorElement.textContent = '';
    errorElement.classList.remove('visible');

    try {
        // Derivar la función
        const derivedFunc = derivativeFunction(func);
        
        // Mostrar función y derivada usando LaTeX
        let resultHTML = `<p>Función: \\( ${math.parse(func).toTex()} \\)</p>`;
        resultHTML += `<p>Derivada: \\( ${math.parse(derivedFunc).toTex()} \\)</p>`;
        resultElement.innerHTML = resultHTML;

        // Renderizar LaTeX
        MathJax.typesetPromise().then(() => {
            console.log("Ecuaciones renderizadas correctamente");
        }).catch((err) => {
            console.error("Error al renderizar las ecuaciones: ", err.message);
        });

        // Comenzar iteraciones de Newton-Raphson
        newtonRaphsonIteraciones(func, derivedFunc, x, tolerance, resultElement, iterationsElement);

    } catch (error) {
        // Si ocurre un error mostrar el mensaje
        errorElement.textContent = `No se pudo analizar la fórmula "${func}" y/o la funcionale no es apta para este metodo`;
        errorElement.classList.add('visible');
        console.error("Error al procesar la función: ", error.message);
    }

    
}

function newtonRaphsonIteraciones(func, derivedFunc, x, tolerance, resultElement, iterationsElement) {
    const maxIter = 100;
    let iter = 0;
    let prevX;
    let iterationsHTML = `
        <table>
            <thead>
                <tr>
                    <th>Paso</th>
                    <th>x</th>
                    <th>Es % </th>
                </tr>
            </thead>
            <tbody>
    `;

   while (iter < maxIter) {
        const fx = evalFunction(func, x);
        const dfx = evalFunction(derivedFunc, x);

        if (dfx === 0) {
            resultHTML += '<p>Error: La derivada es cero. El método no puede continuar.</p>';
            break;
        }

        prevX = x;
        x = x - fx / dfx;

        const error = Math.abs((x - prevX) / x) * 100;

        // Agregar una fila de iteración a la tabla de resultados

        iterationsHTML += `
            <tr>
                <td>x${iter + 1}</td>
                <td>${x.toFixed(8)}</td>
                <td>${error.toFixed(3)}</td>
            </tr>
        `;

        if (error < tolerance) {
            resultElement.innerHTML += `<p>Raíz encontrada: x = ${x.toFixed(4)}</p>`;
            break;
        }

        iter++;
    }

    iterationsHTML += '</tbody></table>';
    iterationsElement.innerHTML = iterationsHTML;

    
    MathJax.typeset();
}

