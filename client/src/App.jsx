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
