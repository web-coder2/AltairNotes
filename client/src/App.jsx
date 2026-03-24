import { useState } from 'react'
import './App.css'

import axios from 'axios'
import dayjs from 'dayjs'

import Notes from './Notes/Notes'

function App() {

  return (

    <>

      <div class='main-container'>
        <div class="notes-container">
          <button class="button-dark">Создать новое воспоминание</button>
          <Notes date={ new Date } title={ "I крестовый поход" } content={ "тогда крестоносцы пришли в масиаф ..." } ></Notes>
          <Notes date={ new Date } title={ "Джубаир" } content={ "тогда я опправился в Дамаск убить джубаира ..." } ></Notes>
        </div>

        <div class="main-root-div">
          <h2>Заметки Альтаира</h2>
        </div>
      </div>
    
    </>

  )

}

export default App
