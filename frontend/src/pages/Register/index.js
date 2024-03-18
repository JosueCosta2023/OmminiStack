import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'
import { useState } from 'react'

export default function Register() {
    // Recebando os dados do inputs
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const navigate = useNavigate()

    async function handleRegister(e){
        // Previne o recarregamento da pagina pos cadastro
        e.preventDefault();

        const data = { name, email, whatsapp, city, uf };

        try {
            const response = await api.post('/ongs', data)
            alert(`Seu id de Acesso: ${response.data.id}`)

            navigate('/')

        } catch (error) {
            console.error("Erro ao cadastrar nova Ong: ", error)
        }

    }


    return (
        <div className='register-container'>

            <div className='content'>
                <section>
                    <img src={logoImg} />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className='back-link' to={'/'}>
                        <FiArrowLeft size={16} color='#E02041' />
                        Voltar a tela de Logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                            placeholder='Nome da ONG'
                            value={name}
                            onChange={e => setName(e.target.value)} 
                    />

                    <input 
                            placeholder='E-mail' 
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                            placeholder='WhatsApp' 
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className='input-group'>
                        <input 
                            placeholder='Cidade'
                            value={city} 
                            onChange={e => setCity(e.target.value)}
                        />

                        <input 
                            placeholder='UF' 
                            style={{width: 80}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>

        </div>
    )
}