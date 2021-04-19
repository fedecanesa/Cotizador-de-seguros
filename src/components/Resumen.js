import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { primeraMayuscula } from '../helper';

const ContainerResumen = styled.div `
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;  
    margin-top: 1rem;
  `;

const Ul = styled.ul`
    padding: 0;
`
const Li = styled.li `
    padding: .5rem;
`;


const Resumen = ({datos}) => {

    const {marca , year , plan} = datos;

    if(marca === '' || plan === '' || year === '') 
        return null; 
    
    return ( 

    <ContainerResumen>
        <h1>Resumen de Cotización</h1>
        <Ul>
            <Li>Marca: { primeraMayuscula(marca) }</Li>
            <Li>Año del Auto: { primeraMayuscula(year) }</Li>
            <Li>Plan: { primeraMayuscula(plan) }</Li>
        </Ul>
    </ContainerResumen>
    );
    
    
}

Resumen.propTypes = { 
    datos: PropTypes.object.isRequired
}

export default Resumen;