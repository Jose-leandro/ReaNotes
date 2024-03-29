import React from 'react'
import logo from '../img/icons8-write-66.png'
import './../styles/components/header.sass'

export function Header (): React.JSX.Element {
  return (
        <div className='div__header'>
            <div className='div__header__logo'>
            <img src={logo} className='contener__img' alt="Logo do site" />
                <h1 className=''>Estrelar</h1>
            </div>
            <div>
                <input placeholder='Encontre sua anotação ou sua lista' />
            </div>
            <div>
                <ul className='div__ul'>
                    <li className=''>
                        Home
                    </li>
                    <li className='' >Configurações</li>
                    <li className='' >Sobre</li>
                    <li className='' >Contato</li>
                </ul>
            </div>
            
            <button className=''>
                Login
            </button>

            <button className=''>
                Criar conta
            </button>
        </div >
  )
}
 
