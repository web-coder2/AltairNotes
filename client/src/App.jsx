import { useState, useRef } from 'react'
import './App.css'

import axios from 'axios'
import dayjs from 'dayjs'

import Notes from './Notes/Notes'
import Reader from './Reader/Reader'

function App() {

  const [showNote, setShowNote] = useState(false)
  const [visibleNote, setVisibleNote] = useState(null)


  const formData = useRef({ date: '', title: '', content: '' })
  const allNotes = useRef([])



  const changeShowNoteState = (e) => {
    setShowNote(false)
  }

  const setVisibleNotes = (note) => {
    setVisibleNote(note)
    setShowNote(true)
  }

  const handleFormSubmit = (e) => {

    e.preventDefault()
    let formTarget = e.target

    formData.current = {
      date: formTarget[0].value,
      title: formTarget[1].value,
      content: formTarget[2].value,
    }

    createNewNote()
  }

  async function getAllNotes() {
    try {

      let path = 'http://localhost:3000/api/note/read'

      const response = await axios.get(path, {
        date: formData['date'],
        title: formData['title'],
        content: formData['content']
      })

      allNotes.current = response.data.notes

      console.log(allNotes)

    } catch (e) {
      console.log(e.message)
    }
  }


  getAllNotes();


  async function createNewNote() {

    try {

      let path = 'http://localhost:3000/api/note/create'

      console.log(formData)

      let date = formData.current.date
      let title = formData.current.title
      let content = formData.current.content

      const response = await axios.post(path, {
        date: date,
        title: title,
        content: content
      })

      await getAllNotes()

    } catch (e) {
      console.log(e.message)
    }

  }

  return (

    <>

      <div class="main-header">
        <h3 class="header-title">Altair Notes</h3>
      </div>

      <div class='main-container'>

        <div class="notes-container">
          <button class="button-dark" onClick={changeShowNoteState}>Создать новое воспоминание</button>

          {
            allNotes.current.map((item, index) => {
              return (
                <div key={index} onClick={() => setVisibleNotes(item)}>
                  <Notes date={item.date} title={item.title} />
                </div>
              )
            })
          }

        </div>

        <div class="main-root-div">
          <h2 class="root-title">Заметки Альтаира</h2>

          {showNote ? (
            <Reader date={visibleNote.date} title={visibleNote.title} content={visibleNote.content} noteId={visibleNote._id}/>
        ) : (
            <form onSubmit={handleFormSubmit}>
              <input name='date' type='date' />
              <input name='title' placeholder='Тайтл' />
              <input name='content' placeholder='Контент' />
              <button type='submit'>Создать новое воспоминание</button>
            </form>
        )}

        </div>
      </div>
    
    </>

  )

}

export default App
