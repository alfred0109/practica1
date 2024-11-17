import React, { useState } from 'react';
import './navegador.css';
import logo from '../IMG/niño.jpeg';
import { Link } from 'react-router-dom';

const Navegador = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className='navegador'>
            <div className='logoimg'>
                <img src={logo} alt="Logo" />
            </div>
            
            <nav className='menu'>
                <button onClick={toggleMenu} className='link-nav'>
                    DSI
                </button>
                {showMenu && (
                    <div className='dropdown-menu'>
                        <Link to='/video' className='link-nav'>INICIO</Link>
                        <Link to='/studentform' className='link-nav'>FORMULARIO</Link>
                        <Link to='/studenList' className='link-nav'>LISTA</Link>
                        <Link to='/userform' className='link-nav'>FORMULARIO USER</Link>
                        <Link to='/userlist' className='link-nav'>LISTA USUARIO</Link>
                        
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Navegador;