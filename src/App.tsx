import React, { useState, useRef } from 'react'
import './styles/reset.sass'
import './styles/gobal.sass'
import './styles/app.sass'
import { Anotacoes } from './components/anotacoes'
import { Lista } from './components/listas'

export function App (): JSX.Element {
  const linha = useRef<HTMLHeadingElement>(null)
  const anotacoes = useRef<HTMLButtonElement>(null)
  const lista = useRef<HTMLButtonElement>(null)

  const [estaSelecionadoLista, setEstaSelecionadoLista] = useState<boolean>(false)

  const [estaAlternadoLista, setEstaAlternadoLista] = useState(true)

  const posicionadoSelecaoTipo = (tipoSelecao): void => {
    console.log(tipoSelecao)
    if (tipoSelecao === 'anotacoes') {
      console.log(tipoSelecao)
      const widthAnotacoes = anotacoes.current!.offsetWidth
      console.log(widthAnotacoes)
      const leftAnotacoes = anotacoes.current!.offsetLeft
      console.log(leftAnotacoes)
      const currentLinha = linha.current
      if (currentLinha != null) {
        currentLinha.style.width = (widthAnotacoes - 20) + 'px'

        currentLinha.style.left = (leftAnotacoes + 10) + 'px'
        console.log(currentLinha.style.left)
      }
    }

    if (tipoSelecao === 'lista') {
      console.log(tipoSelecao)
      const widthLista = lista.current!.offsetWidth
      console.log(widthLista)
      const leftLista = lista.current!.offsetLeft
      console.log(leftLista)
      const currentLinha = linha.current
      if (currentLinha != null) {
        currentLinha.style.width = (widthLista - 20) + 'px'

        currentLinha.style.left = (leftLista + 10) + 'px'
        console.log(currentLinha.style.left)
      }
    }
  }

  const toggleVisualization = (): void => {
    setEstaAlternadoLista(true)
  }

  return (

    <div className="contener">
      <div className='contener__selecao'>
        <div className='contener__selecao__tipo'>
          <button ref={anotacoes} onClick={() => {
            posicionadoSelecaoTipo('anotacoes')
            toggleVisualization()
          }}>Anotações</button>

          <button className={`contener__selecao__tipo__visivel ${estaAlternadoLista ? '' : 'contener__selecao__tipo__oculto'}`}
          ref={lista}
          onClick={() => { posicionadoSelecaoTipo('lista'), setEstaSelecionadoLista(true) }}>Listas</button>
        </div>
        <div className='div__linha'>
          <h3 className='div__linha__h3' ref={linha}></h3>
        </div>
      </div>

      {estaSelecionadoLista ? <Lista /> : <Anotacoes /> }

    </div>
  )
}
