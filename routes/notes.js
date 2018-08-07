const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Note = require("../models/Note")

//get notes
router.get('/', (req,res) => {
    Note.find().then(notes => {
        return res.status(200).json(notes)
    }).catch(e => {
        return res.status(400).json(e)
    })
})

//post new note
router.post('/', (req, res, next) => {
    req.body['author'] = req.user._id
    Note.create(req.body).then(note => {
        User.findByIdAndUpdate(req.user._id, { $push: { notes: note._id } })
        .then(n => {
            return res.status(201).json(note)
        })
    }).catch(err => {
        console.log(err)
        return res.status(500).json(err)
    })
})

//get one note
router.get('/:id', (req, res) => {
    User.find({author: req.params.user})
    Note.findById(req.params.id)
    .populate('author')    
    .then(note => {
        
        if (!note) return res.status(404)
            return res.status(200).json(note)
    }).catch(err => {
        return res.status(500).json(err)
    })
})

//edit a note
/* this route make an update to the model note but 
respect the filed even when they don't come in the update */
router.put('/:id', (req, res, next) => {
    Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(note => {
            return res.status(202).json(note)
        }).catch(err => {
            return res.status(404).json(err)
        })
})

//delete a note
router.delete('/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(note => {
            res.status(200).json(note)
        }).catch(e=>{
            return res.status(500).json(err)
        })
})
module.exports = router;