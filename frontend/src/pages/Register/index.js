import { Link } from 'react-router-dom'
import './style.css'
import {FiArrowLeft} from 'react-icons/fi'


export default function Register(){
    return(
        <section>
            <h2>Register</h2>
            <Link to={'/'}>
                <FiArrowLeft/>
                Voltar a tela de Logon
            </Link>
        </section>
    )
}