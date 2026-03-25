import './Reader.css'
import { useState } from "react";
import dayjs from "dayjs";
import axios from 'axios'


function Reader({date, title, content, noteId, onNoteDelete}) {

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


    return (
        <div className="reader-container">
            <h3 className="reader-title">{title}</h3>
            <div className="reader-content">
                <p className="reader-text">{content}</p>
            </div>
            <div className="reader-date">
                <button class="reader-btn" onClick={deleteNote}>удалить запись</button>
                <p>{dayjs(date).format('YYYY-MM-DD')}</p>
            </div>
        </div>
    )

}

export default Reader