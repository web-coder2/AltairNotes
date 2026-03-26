import './Reader.css'
import { useState } from "react";
import dayjs from "dayjs";
import axios from 'axios'


function Reader({date, title, content, noteId, onNoteDelete}) {

    const [isEditMode, setIsEditMode] = useState(false)
    const [newContent, setNewContent] = useState('')

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

    async function saveEdit() {
        try {
            let path = 'http://localhost:3000/api/note/edit'

            let response = await axios.post(path, {
                noteId: noteId,
                newContent: newContent
            })

            setIsEditMode(false)

            if (onNoteDelete) {
                onNoteDelete()
            }

        } catch (e) {
            console.log(e.message)
        }
    }

    function startEdit() {
        setIsEditMode(!isEditMode)
    }

    const changeNewContent = (e) => {
        setNewContent(e.target.value)
    }


    return (
        <div className="reader-container">
            <h3 className="reader-title">{title}</h3>
            { isEditMode === false ? 

                (
                    <div className="reader-content">
                        <p className="reader-text">{content}</p>
                    </div>
                ) : (
                    <div class="edit-container">
                        <input class="edit-input" onChange={changeNewContent} value={newContent}></input>
                        <h5 class="edit-title">Новый контент</h5>
                        <p class="edit-content">{newContent}</p>
                        <button class="edit-success" onClick={saveEdit}>сохранить изменения</button>
                    </div>
                )
                
            }
            <div className="reader-date">
                <div>
                    <button class="reader-btn" onClick={deleteNote}>удалить запись</button>
                    <button class="edit-btn" onClick={startEdit}>{ isEditMode ? 'отменить' : 'редактировать' }</button>
                </div>
                <p>{dayjs(date).format('YYYY-MM-DD')}</p>
            </div>
        </div>
    )

}

export default Reader