import './style.css'
import logoImg from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { FiPower} from 'react-icons/fi'


export default function Profile(){
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo. Ong</span>

                <Link className='button' to={'/incidents/new'}>
                    Cadastrar novo Caso
                </Link>
                <button type='button'>
                    <FiPower width={18} color='E02041' />
                </button>
            </header>
        </div>
    )
}