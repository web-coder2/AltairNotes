import { useState, useEffect } from 'react'
import './App.css'

import axios from 'axios'
import Notes from './Notes/Notes'
import Reader from './Reader/Reader'

function App() {
  const [showNote, setShowNote] = useState(false)
  const [visibleNote, setVisibleNote] = useState(null)
  const [allNotes, setAllNotes] = useState([])
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    content: ''
  })

  useEffect(() => {
    getAllNotes()
    // вызвать функцию и отрендеритьсрзу что нужно
  }, [])

  const changeShowNoteState = () => {
    setShowNote(false)
  }

  const setVisibleNotes = (note) => {

    let newNoteInfo = note

    setVisibleNote(newNoteInfo)
    setShowNote(true)
  }

  const handleFormChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    createNewNote()
  }

  async function getAllNotes() {
    try {
      const response = await axios.get('http://localhost:3000/api/note/getList')
      setAllNotes(response.data.notes)
      console.log(response.data.notes)

      setVisibleNote(false)

    } catch (e) {
      console.log(e.message)
    }
  }

  async function createNewNote() {
    try {
      const path = 'http://localhost:3000/api/note/create'
      await axios.post(path, {
        date: formData.date,
        title: formData.title,
        content: formData.content
      })

      await getAllNotes()

      setFormData({ date: '', title: '', content: '' })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      <div className="main-header">
        <img src="/assets/altair.webp" className='header-img' />
        <h3 className="header-title">Altair Notes</h3>
      </div>

      <div className="main-container">
        <div className="notes-container">
          <button className="button-dark" onClick={changeShowNoteState}>
            Создать новое воспоминание
          </button>

          {allNotes.map((item, index) => (
            <div key={index} onClick={() => setVisibleNotes(item)}>
              <Notes date={item.date} title={item.title} content={item.content} />
            </div>
          ))}
        </div>

        <div className="main-root-div">
          <h2 className="root-title">Заметки Альтаира</h2>

          {showNote && visibleNote ? (
            <Reader key={visibleNote._id} noteId={visibleNote._id} onNoteDelete={getAllNotes} />
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input name="date" type="date" value={formData.date} onChange={handleFormChange} placeholder="Дата" />
              <input name="title" placeholder="Тайтл" value={formData.title} onChange={handleFormChange} />
              <input name="content" placeholder="Контент" value={formData.content} onChange={handleFormChange} />
              <button type="submit">Создать новое воспоминание</button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default App