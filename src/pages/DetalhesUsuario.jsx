/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../services/axios"

function DetalhesUsuario() {
    const [atualizar, setAtualizar] = useState(false)
    const [usuario, setUsuario] = useState({})

    const { id } = useParams()

    const getUsuario = async () => {
        try {
            await axios.get(`/usuario/listar/${id}`).then((response) => {
                const dados = response.data
                // console.log("projeto resgatado: ", dados)
                setUsuario(dados)
            })
        } catch (error) { }
    }

    useEffect(() => {
        getUsuario()

        if (atualizar) {
            getUsuario()
            setAtualizar(false)
        }
    }, [atualizar])

    return (
        <>
            Teste
        </>
    )
}

export default DetalhesUsuario