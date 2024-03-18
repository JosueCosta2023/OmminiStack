import './style.css'

import logoImg from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export default function NewIncient() {
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
                    <input placeholder='Titulo do Caso' />
                    <textarea placeholder='Descrição' />
                    <input placeholder='Valor em Reais' />
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>

        </div>
    )
}