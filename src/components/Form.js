import React, {useState} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { obtenerDiferenciaYear , calcularMarca , obtenerPlan} from '../helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Button = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    margin-top: 2rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: .3s ease;

    &:hover{
        cursor: pointer;
        background-color: #26c6da;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    margin-bottom: 2rem;
    width: 100%;
    text-align: center;
`;

const Form = ({ guardarResumen , guardarCargando }) => {

    // Definicion de State
    const [ datos , guardarDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [ error , guardarError ] = useState(false);

    //Extraer valores del state
    const { marca, year, plan } = datos;

    //Leer los datos del formulario y colocarlos en el state
    const obtenerInformacion = e => {
        guardarDatos({ ...datos , 
            [e.target.name] : e.target.value})
    }

    //Eventos submit del formulario
    const handlerSubmit = e => {
        e.preventDefault();

        // Validacion de campos vacios
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        // Partimos de una base de $2000
        let resultado = 2000;

        // Obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);
        
        // Por cada año hay que restar el 3%
        resultado -= (( diferencia * 3 ) * resultado ) / 100 ;

        // Se obtiene el incremento segun la marca del auto:
            /*  
                Americano = 15%
                Asiatico = 5%
                Europeo = 50% 
            */
        resultado = calcularMarca (marca) * resultado;

        // Se obtiene el incremento segun el plan seleccionado
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
        
        guardarCargando(true);

        setTimeout(() => {
            // Elimina el Spinner
            guardarCargando(false);

            // Pasa la informacion al componente principal
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });
        } , 3000);
        
        // Total
      
    }

    return ( 
        <form
            onSubmit={handlerSubmit}
        >
            { error ? <Error>Todos los campos son obligatorios</Error> : null} 
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="Americano">Americano</option>
                    <option value="Europeo">Europeo</option>
                    <option value="Asiatico">Asiatico</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio 
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                /> Básico
                <InputRadio 
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                /> Completo
            </Campo>

            <Button type="submit">Cotizar</Button>
        </form>
     );
}

Form.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired

}

export default Form;