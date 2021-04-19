import React,{useState} from 'react';
import Header from './components/Header';
import styled from '@emotion/styled';
import Form from './components/Form';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Container = styled.div `
    max-width: 600px;
    margin: 0 auto;
`; 

const ContainerForms = styled.div `
    background-color: #FFF;
    padding: 3rem;
`; 

function App() {

    const [ resumen , guardarResumen ] = useState({
        cotizacion:0,
        datos:{
            marca: '',
            year: '',
            plan: ''
        }
    });

    const [ cargando , guardarCargando ] = useState(false);

    const { cotizacion , datos} = resumen;

    return (
        <Container>
        <Header
            title='Cotizador de Seguros'
        />

        <ContainerForms>
            <Form 
                guardarResumen={guardarResumen}
                guardarCargando={guardarCargando}
            />
            { cargando ? <Spinner /> : null }
            

            <Resumen
                datos= {datos}
            />
            { !cargando 
                ?  
                    <Resultado 
                        cotizacion={cotizacion}
                    /> 
                : null

            }
           
        </ContainerForms>
        </Container>
        );
}

export default App;
