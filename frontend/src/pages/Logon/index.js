import './style.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'

import { Link, useNavigate } from 'react-router-dom'
import React, {useState} from 'react'
import api from '../../services/api'

export default function Logon() {

    const [id, setId] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()
        try {
            const response = await api.post('sessions', { id })

            console.log(response.data.name)

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            navigate('/profile')

        } catch (error) {
            console.error("Erro ao efetuar login:", error)
        }
    }

    return (
        <div className="logon-container">
            <section className='form'>
                <img src={logoImg} alt='Be The Hero' />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input 
                        placeholder='Sua Id'
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className='button' type='submit'>Entrar</button>

                    <Link className='back-link' to={'/register'}>
                        <FiLogIn size={16} color='#E02041' />
                        Não tenho Cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt='heroes' />
        </div>
    )
}