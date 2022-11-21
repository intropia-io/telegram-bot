import React from 'react';
import './Button.css';

const Buttton = (props) => {
    return (
        <button {...props} className={'button ' + props.className} />
    );
};

export default Buttton;