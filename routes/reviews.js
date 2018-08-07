const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Review = require("../models/Review")

// router.get('/own', (req,res)=>{
//     Review.find({author:req.user._id})
// })

//get reviews
router.get('/', (req,res) => {
    Review.find()
    .then(reviews => {
        console.log(reviews)
        return res.status(200).json(reviews)
    }).catch(e => {
        return res.status(400).json(e)
    })
})

//post new review
router.post('/', (req, res, next) => {
    req.body['author'] = req.user._id
    Review.create(req.body).then(review => {
        User.findByIdAndUpdate(req.user._id, { $push: { reviews: review._id } })
            .then(r=>{
                return res.status(201).json(review)
            })
    }).catch(err => {
        console.log(err)
        return res.status(500).json(err)
    })
})

//get one review
router.get('/:id', (req, res) => {
    User.find({author: req.params.user})
    Review.findById(req.params.id).then(review => {
        if (!review) return res.status(404)
            return res.status(200).json(review)
    }).catch(err => {
        return res.status(500).json(err)
    })
})

//edit a review
/* this route make an update to the model review but 
respect the filed even when they don't come in the update */
router.put('/:id', (req, res, next) => {
    Review.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(review => {
            return res.status(202).json(review)
        }).catch(err => {
            return res.status(404).json(err)
        })
})

//delete a review
router.delete('/:id', (req, res, next) => {
    Review.findByIdAndRemove(req.params.id)
        .then(review => {
            res.status(200).json(review)
        }).catch(e=>{
            return res.status(500).json(err)
        })
})

//get reviews by author
router.get('/mine/:id', (req, res) => {
    Review.find({author: req.params.id})
    .then(reviews=>{
        console.log(reviews)
        res.json({reviews})
    })
    .then(e=>res.json({message:'error', e}))
})

module.exports = router;