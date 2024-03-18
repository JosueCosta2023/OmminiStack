import './style.css'
import logoImg from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { useEffect, useState } from 'react'

import api from '../../services/api'

export default function Profile() {

    const [incidents, setIncidents] = useState([])

    // Vamos buscar os dados atraves da localStorage
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')
    const navigate = useNavigate()

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            // Filtrando o array de caso e exibindo somente os que restaram no db
            setIncidents(incidents.filter(incident => incident.id != id))

        } catch (error) {
            console.error("Erro ao deletar caso:", error)
        }

    }

    async function handleLogOut(){
        localStorage.clear()
        navigate('/')
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className='button' to={'/incidents/new'}>
                    Cadastrar novo Caso
                </Link>
                <button type='button' onClick={handleLogOut}>
                    <FiPower width={18} color='E02041' />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso: </strong>
                        <p>{incident.title}</p>

                        <strong>Descrição: </strong>
                        <p>{incident.description}</p>

                        <strong>Valor: </strong>
                        <p>
                            {
                                Intl.NumberFormat(
                                    'pt-BR',
                                    {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }
                                ).format(incident.value)}
                        </p>

                        <button type='button' onClick={() => {
                            handleDeleteIncident(incident.id)
                        }}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}