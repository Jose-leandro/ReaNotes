import React, { type ChangeEvent, useState } from 'react'
import { NoteCard } from './note-card'
import { NewNoteCard } from './new-note-card'

interface Note {
  id: string
  data: Date
  content: string
}

export function Lista (): React.JSX.Element {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage: string | null = localStorage.getItem('notes')

    if (notesOnStorage !== null) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

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

  return (
        <>
            <form className='w-full'>
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
            </div>
        </>
  )
}
