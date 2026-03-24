import './Reader.css'
import { useState } from "react";
import dayjs from "dayjs";


function Reader({date, title, content}) {

    return (
        <div className="reader-container">
            <h3 className="reader-title">{title}</h3>
            <div className="reader-content">
                <p className="reader-text">{content}</p>
            </div>
            <div className="reader-date">
                <p>{dayjs(date).format('YYYY-MM-DD')}</p>
            </div>
        </div>
    )

}

export default Reader