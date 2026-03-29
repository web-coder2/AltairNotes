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

router.post('/api/note/edit', async (req, res) => {
    try {

        const { noteId, newContent } = req.body

        const resultOfUpdate = await NoteModel.findOneAndUpdate(
                { _id: noteId },
                { 
                    $set: {
                        content: newContent
                    }
                }
            )

        res.status(200).json({
            msg: 'note edited'
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            msg: e.message
        })
    }
})

router.post('/api/note/delete', async (req, res) => {
    try {

        const { noteId } = req.body

        const resultOfDelte = await NoteModel.findOneAndDelete({ _id: noteId })

        res.status(200).json({
            msg: 'note deleted'
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            msg: e.message
        })
    }
})

router.get('/api/note/getList', async (req, res) => {

    try {

        let notesList = await NoteModel.find()

         notesList = notesList.map((item) => {
            if (item.content.length > 50) {
                return {
                    _id: item._id,
                    date: item.date,
                    title: item.title,
                    content: item.content.slice(0, 50) + '...'
                };
            } else {
                return {
                    _id: item._id,
                    date: item.date,
                    title: item.title,
                    content: item.content
                };
            }
        });

        res.status(200).json({
            notes: notesList
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

        const { noteId } = req.query

        const fullNote = await NoteModel.findOne({
            _id: noteId
        })

        res.status(200).json({
            fullNote: fullNote
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            msg: e.message
        })
    }

})

module.exports = router