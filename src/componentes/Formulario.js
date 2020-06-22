import React, { useEffect, useState } from 'react';
import Error from './Error';
import styled from '@emotion/styled';

import useMoneda from '../hooks/useMoneda';
import useCripto from '../hooks/useCripto';
import Axios from 'axios';
import PropTypes from 'prop-types';

const Formulario = ({ updateMoneda, updateCripto }) => {

    const [ criptos, updateCriptos ] = useState([]);
    const [ error, updateError ] = useState(false);

    //arreglo con los tipos de monedas a usar en el state
    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dólar Americano' },
        { codigo: 'ARS', nombre: 'Peso Argentino' },
        { codigo: 'VES', nombre: 'Bolívar Soberano Venezolano' },
        { codigo: 'EUR', nombre: 'Euro' }
    ];

    //utilizar el hook personalizado
    const [ moneda, SelectMoneda ] = useMoneda( 'Selecciona tu moneda', '', MONEDAS ); //se puede extraer tambien
    //el actualizador de state pero no se va a usar en este componente, sino en el hook propio

    //utilizar useCripto
    const [ criptomoneda, SelectCripto ] = useCripto( 'Selecciona tu cripto', '', criptos );

    //ejecutar llamado a la API
    useEffect( () => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await Axios.get(url);
            
            updateCriptos(resultado.data.Data);
            
        }
        consultarApi();
    }, [] )

    const handleSubmit = e => {
        e.preventDefault();

        //validar si ambos campos están llenos
        if( moneda === '' || criptomoneda === '' ) {
            updateError(true);
            return;
        }

        //pasar los datos al componente principal
        updateError(false);

        //pasar valores al componente principal
        updateCripto(criptomoneda);
        updateMoneda(moneda);

    };

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            { error
            ? <Error 
                mensaje='Por favor, ingrese los datos correctamente'
            />
            : null }
            <SelectMoneda />

            <SelectCripto />

            <Boton
                type='submit'
            >¡ Dame el precio !</Boton>
        </form>
     );
}

const Boton= styled.button`
    margin-top: 20px;
    font-weight: 300;
    font-size: 20px;
    padding: 10px;
    background: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: .3s ease-in-out;

    &:hover{
        background: #326ac0;
        box-shadow: 1px 1px 3px 1px black;
        cursor: pointer;
    }
`;


Formulario.propTypes = {
    updateCripto: PropTypes.func.isRequired,
    updateMoneda: PropTypes.func.isRequired
}


export default Formulario;