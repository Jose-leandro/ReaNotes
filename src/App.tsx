import React, { type ChangeEvent, useState, useEffect, useRef } from 'react'
import { NoteCard } from './components/note-card'
import { NewNoteCard } from './components/new-note-card'
import './styles/reset.sass'
import './styles/gobal.sass'
import './styles/app.sass'
import SeparatorDemo from './components/ui/separator'

interface Note {
  id: string
  data: Date
  content: string
}

export function App(): JSX.Element {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage: string | null = localStorage.getItem('notes')

    if (notesOnStorage !== null) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  const linha = useRef<HTMLHeadingElement>(null)
  const anotacoes = useRef<HTMLButtonElement>(null)
  const lista = useRef<HTMLButtonElement>(null)

  const onNoteCreated = (content: string): void => {
    const newNote = {
      id: crypto.randomUUID(),
      data: new Date(),
      content
    }

    const notesArry = [newNote, ...notes]

    setNotes(notesArry)

    localStorage.setItem('notes', JSON.stringify(notesArry))
  }

  const onNoteDeleted = (id: string): void => {
    const notesArray = notes.filter((note) => {
      return note.id !== id
    })

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value

    setSearch(query)
  }

  console.log(search)

  const filteredNotes =
    search !== ''
      ? notes.filter((note) =>
        note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      : notes

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

        currentLinha.style.left = (widthLista + 10) + 'px'
        console.log(currentLinha.style.left)
      }
    }
  }

  // useEffect(() => {
  //   posicionadoSelecaoTipo()
  // }, [])

  document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    console.log('Posição do mouse X:', mouseX);
    console.log('Posição do mouse Y:', mouseY);
});

  return (

    <div className="contener">
      <div className='contener__selecao'>
        <div className='contener__selecao__tipo'>
          <button ref={anotacoes} onClick={() => { posicionadoSelecaoTipo('anotacoes') }}>Anotações</button>
          <button ref={lista} onClick={() => { posicionadoSelecaoTipo('lista') }}>Listas</button>
        </div>
        <div className='div__linha'>
          <h3 className='div__linha__h3' ref={linha}></h3>
        </div>
      </div>

      {/* <form className='w-full'>
        <input type="text"
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-1 md:grid-cols-2 grid-cols-3 gap-6 auto-rows-[256px]'>
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map(note => {
          return (
            <NoteCard onNoteDeleted={onNoteDeleted} key={note.id} note={note} />
          )
        })}
      </div> */}
    </div>
  )
}
