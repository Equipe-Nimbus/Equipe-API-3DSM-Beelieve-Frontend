import React from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

function Button({texto, onClick, tipo, iconeOpcional, iconeCor, iconeTamanho, botaoClassname}){

    const ComponenteIcone = iconeOpcional;

    return (
        <button className={botaoClassname} onClick={onClick} type={tipo}>
            {texto}
            <IconContext.Provider value={{color: iconeCor, size: iconeTamanho}}>
                {iconeOpcional && <ComponenteIcone/>}
            </IconContext.Provider>
        </button>
    )
}

Button.propTypes = {
    texto: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    tipo: PropTypes.string.isRequired,
    iconeOpcional: PropTypes.elementType,
    iconeCor: PropTypes.string,
    iconeTamanho: PropTypes.string,
    botaoClassname: PropTypes.string.isRequired

}

export default Button