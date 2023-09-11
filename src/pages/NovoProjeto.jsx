import React from 'react';
import Button from '../components/Button';
import FormCadastroProjeto from '../components/FormCadastroProjeto/FormCadastroProjeto';

function NovoProjeto() {

    return (
        <>
            <div>
                <Button texto='Subir um arquivo' tipo='button'/>
                <hr/>
                <FormCadastroProjeto/>
            </div>
        </>
    )
}

export default NovoProjeto