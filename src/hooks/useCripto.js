import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const useCripto = ( label, stateInit, opciones ) => {

    //state de nuestro custom hook
    const [ state, updateState ] = useState(stateInit);

    const SelectCripto = () => (

        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={ e => updateState( e.target.value ) }//cambia el state segun el valor seleccionado
                value={ state }//para que muestre el nombre en el DOMselect
            >
                <option value=''> -- Seleccione -- </option>
                {opciones.map( opcion => (
                <option key={ opcion.CoinInfo.Id } value={ opcion.CoinInfo.Name }> {opcion.CoinInfo.FullName} </option>
                ))}
            </Select>
        </Fragment>
    );

        //retornar state, interfaz y función que modifica el state
        return [ state, SelectCripto, updateState ];
};


const Label = styled.label`
    color: #fff;
    font-weight: 100;
    font-size: 2rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: .7rem;
    border: none;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 15px;
`;

export default useCripto;