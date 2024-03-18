import './style.css'
import logoImg from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { FiPower, FiTrash2} from 'react-icons/fi'


export default function Profile(){
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, Ong</span>

                <Link className='button' to={'/incidents/new'}>
                    Cadastrar novo Caso
                </Link>
                <button type='button'>
                    <FiPower width={18} color='E02041' />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                <li>
                    <strong>Caso: </strong>
                    <p>Detalhes do caso</p>

                    <strong>Descrição: </strong>
                    <p>Detalhes da descrição</p>

                    <strong>Valor: </strong>
                    <p>Valos em Reais</p>

                    <button type='button'>
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>

                <li>
                    <strong>Caso: </strong>
                    <p>Detalhes do caso</p>

                    <strong>Descrição: </strong>
                    <p>Detalhes da descrição</p>

                    <strong>Valor: </strong>
                    <p>Valos em Reais</p>

                    <button type='button'>
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>

                <li>
                    <strong>Caso: </strong>
                    <p>Detalhes do caso</p>

                    <strong>Descrição: </strong>
                    <p>Detalhes da descrição</p>

                    <strong>Valor: </strong>
                    <p>Valos em Reais</p>

                    <button type='button'>
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                
                <li>
                    <strong>Caso: </strong>
                    <p>Detalhes do caso</p>

                    <strong>Descrição: </strong>
                    <p>Detalhes da descrição</p>

                    <strong>Valor: </strong>
                    <p>Valos em Reais</p>

                    <button type='button'>
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
            </ul>
        </div>
    )
}