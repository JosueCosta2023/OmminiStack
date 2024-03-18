import './style.css'

import logoImg from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useState } from 'react'
import api from '../../services/api'

export default function NewIncient() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId')

    const navigate = useNavigate()

    async function handleNewIncident(e){
        e.preventDefault()
        
        const data = {
            title,
            description,
            value
        };
        try {
            
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId
                }
            })

            navigate('/profile')

        } catch (error) {
            console.log("Erro ao cadastrar um novo caso:", error)
        }
    }

    return (
        <div className='new-incident-container'>

            <div className='content'>
                <section>
                    <img src={logoImg} />
                    <h1>Cadastrar novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>
                    <Link className='back-link' to={'/profile'}>
                        <FiArrowLeft size={16} color='#E02041' />
                        Voltar lista de casos
                    </Link>
                </section>
                <form>
                    <input 
                        placeholder='Titulo do Caso'
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <textarea 
                        placeholder='Descrição' 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />
                    <input 
                        placeholder='Valor em Reais'
                        value={value}
                        onChange={e => setValue(e.target.value)} />

                    <button className='button' type='submit' onClick={handleNewIncident}>Cadastrar</button>
                </form>
            </div>

        </div>
    )
}