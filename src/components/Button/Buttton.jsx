import React from 'react';

const Buttton = (props) => {
    return (
        <button {...props} className={'button ' + props.className} />
    );
};

export default Buttton;