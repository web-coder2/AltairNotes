import { useState } from 'react'
import './App.css'

import axios from 'axios'
import dayjs from 'dayjs'

import Notes from './Notes/Notes'

function App() {

  // TODO: в div с класом main-root-div выводить в 
  // 1)заисимсоти от булевого значения либо фомру для создания новой записи
  // 2)либо полный контенет с тайтлом и датой записи выбраной карточки (через onClick сделать)
  // 3)выше сделать типа div в котором будет типа логотипа красиов чтобы был

  const [showNote, setShowNote] = useState(false)
  const [formData, setFormData] = useState({
    date: dayjs(new Date()).format('YYYY-MM-DD'),
    title: '',
    content: ''
  })

  const [visibleNote, setVisibleNote] = useState(null)

  const staticArray = [
    { date: new Date, title: "I крестовый поход", content: 'тогда крестоносцы пришли в масиаф ...' },
    { date: new Date, title: "Джубаир", content: 'тогда я опправился в Дамаск убить джубаира ...' },
    { date: new Date, title: "Робер де Сабле", content: 'я пошел в арсуф убить робера я смог' },
  ]

  const [arrayNotes, setArrayNotes] = useState(staticArray)


  const changeShowNoteState = (e) => {
    setShowNote(false)
  }

  const setVisibleNotes = (e) => {
    setVisibleNote(e)
    setShowNote(true)
  }

  const handleFormSubmit = (e) => {

    e.preventDefault()
    let formTarget = e.target

    let newItem = {
      date: formTarget[0].value,
      title: formTarget[1].value,
      content: formTarget[2].value,
    }

    staticArray.push(newItem)
    setArrayNotes(staticArray)
  }

  return (

    <>

      <div class='main-container'>
        <div class="notes-container">
          <button class="button-dark" onClick={changeShowNoteState}>Создать новое воспоминание</button>

          {// TODO: позже когда будет готов бэкенд получать данные с апишки и рендерить с респонса вместо статики
            arrayNotes.map((item) => {
              return (
                <div onClick={() => setVisibleNotes(item)}>
                  <Notes date={item.date} title={item.title} content={item.content} />
                </div>
              )
            })
          }

        </div>

        <div class="main-root-div">
          <h2>Заметки Альтаира</h2>

          {showNote ? (
            <Notes date={visibleNote.date} title={visibleNote.title} content={visibleNote.content} />
            // TODO для просмотра полной версии заметки исопльзовать другйо компонент с другим дизайном (более шире)
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
