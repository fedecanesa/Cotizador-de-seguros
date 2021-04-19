// Obtiene la diferencia de años
export function obtenerDiferenciaYear(year) {
    return new Date().getFullYear() - year;
}

// Calcula el total a pagar segun la marca
export function calcularMarca(marca) {
    let incremento;

    switch(marca){
        case 'Americano':
            incremento = 1.15;
            break;
        case 'Europeo':
            incremento = 1.30;
            break
        case 'Asiatico':
            incremento = 1.05;
            break;
        default: 
        break
    }
    return incremento;
}

// Calcula el tipo de seguro
export function obtenerPlan (plan){
    return (plan === 'basico') ? 1.20 : 1.50;
}

// Muestra la primera letra mayuscula
export function primeraMayuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}