import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';


const Error = ({mensaje}) => (
    <Paragraph>{mensaje}</Paragraph>
    );
    

const Paragraph = styled.p`
background: #b7322c;
padding: 1rem;
color: #fff;
font-size: 20px;
font-weight: 300;
text-align: center;
`;

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}

export default Error;