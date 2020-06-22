import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Cotizacion = ({result}) => {
    if( Object.keys(result).length === 0 ) return null;
    return ( 
        <Div>
            <DIV>El precio es: <Span>{result.PRICE}</Span></DIV>
            <Parrafo>El precio más alto del día: <Span>{result.HIGHDAY}</Span></Parrafo>
            <Parrafo>El precio más bajo del día: <Span>{result.LOWDAY}</Span></Parrafo>
            <Parrafo>La variación de las últimas 24hr: <Span>{result.CHANGEPCT24HOUR}</Span></Parrafo>
            <Parrafo>Última actualización: <Span>{result.LASTUPDATE}</Span></Parrafo>
        </Div> 
    );
}

const Div = styled.div`
    text-align: center;
    background: #fff;
    padding: .7rem;
    margin: 1rem auto;
    border: 1px solid grey;
    border-radius: .7rem;
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.5);;
`;

const DIV = styled.div`
font-size: 30px
`;

const Parrafo = styled.p`
    font-size: 18px;
`;

const Span = styled.span`
    font-weight: bold;
`;

Cotizacion.propTypes = {
    result: PropTypes.object.isRequired
}

export default Cotizacion;