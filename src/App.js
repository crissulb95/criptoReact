import React, { useState, useEffect } from 'react';
import Formulario from './componentes/Formulario';
import Cotizacion from './componentes/Cotizacion';
import Spinner from './componentes/Spinner';
import styled from '@emotion/styled';
import Axios from 'axios';
import imagen from './cryptomonedas.png';


function App() {

  const [ moneda, updateMoneda ] = useState('');
  const [ criptomoneda, updateCripto ] = useState('');
  const [ result, updateResult ] = useState({});
  const [ cargando, updateCargando ] = useState(false);

  useEffect( () => {
    
    const cotizacion = async () => {
      //para evitar la primera ejecución
    if(moneda === '') return;
    
    //consultar la API
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    
    const result = await Axios.get(url);

    //mostrar el spinner
    updateCargando(true);
    //ocultar el spinner y mostrar el resultado
    setTimeout( () => {
      //cambio de estado de carga
      updateCargando(false);
      //guardar cotización
      updateResult(result.data.DISPLAY[ criptomoneda ][ moneda ]);

    }, 3000 );
    
    };
    cotizacion();
  }, [ moneda, criptomoneda ] );


  //Mostrar spinner o resultado
  const resultadoFinal = (cargando) ? <Spinner /> : <Cotizacion result={result} />


  return (
    <Div>
      <div>
        <Image
          src={imagen}
          alt='imagen criptomonedas'
        />
      </div>
      <div>
        <Heading>
          Criptomonedas al instante
        </Heading>
        <Formulario
          updateMoneda={ updateMoneda }
          updateCripto={ updateCripto }
        />

        {resultadoFinal}
        
      </div>
    </Div>
  );
}

const Div = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h2`
  font-family: 'Julius Sans One', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-top: 80px;
  margin-bottom: 50px;

  &::after{
    content:'';
    width: 100px;
    height: 6px;
    background: #66a2fe;
    display: block;
  }
`;
export default App;
