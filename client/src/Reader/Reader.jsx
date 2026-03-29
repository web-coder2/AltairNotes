import './Reader.css'
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from 'axios'


function Reader({noteId, onNoteDelete}) {

    const [noteInfo, setNoteInfo] = useState({
        title: "",
        content: "",
        date: ""
    })

    async function deleteNote() {
        try {
            let path = 'http://localhost:3000/api/note/delete'
            let response = await axios.post(path, {
                noteId: noteId
            })

            // здесь можно в виде аргумента передать функцию типа emit как в vue.js
            if (onNoteDelete) {
                onNoteDelete()
            }

        } catch (e) {
            console.log(e.message)
        }
    }
   
    async function getNoteInfo() {
        try {
          const response = await axios.get('http://localhost:3000/api/note/read', {
            params: {
                noteId: noteId
            }
          })
          
          let noteInfo = response.data.fullNote

          setNoteInfo(noteInfo)

        } catch (e) {
          console.log(e.message)
        }
    }

    useEffect(() => {
        getNoteInfo()
      }, [])

    return (
        <div className="reader-container">
            <h3 className="reader-title">{noteInfo.title}</h3>
            <div className="reader-content">
                <p className="reader-text">{noteInfo.content}</p>
            </div>
            <div className="reader-date">
                <button class="reader-btn" onClick={deleteNote}>удалить запись</button>
                <p>{dayjs(noteInfo.date).format('YYYY-MM-DD')}</p>
            </div>
        </div>
    )

}

export default Reader