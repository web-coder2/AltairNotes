import { useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import './Notes.css'

function Notes({ date, title, content }) {

    return (
        <div className="notes-card">
            <h6 className="notes-title">{title}</h6>
            <div className="notes-date">{dayjs(date).format('YYYY-MM-DD')}</div>
        </div>
      )

}

export default Notes
