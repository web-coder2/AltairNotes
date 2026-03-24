const dayjs = require('dayjs')
const axios = require('axios')
const mongoose = require('mongoose')
const { Router } = require('express');

const NoteModel = require('../models/Note.js')

const router = Router()


router.post('/api/note/create', async (req, res) => {

    try {

        const { date, title, content } = req.body

        const newNote = NoteModel({
            date: new Date(date),
            title: title,
            content: content
        })

        const createResult = await newNote.save()

        res.status(200).json({
            msg: 'Note successfuly created'
        })

    } catch (e) {   
        console.log(e.message)
        res.status(500).json({
            msg: e.message
        })
    }

})


router.get('/api/note/read', async (req, res) => {

    try {

        const allNotes = await NoteModel.find()

        res.status(200).json({
            notes: allNotes
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            msg: e.message
        })
    }

})

module.exports = router