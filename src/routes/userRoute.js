const express = require('express')

const User = require('../model/user')
const router = new express.Router()

router.post('/register', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        const token = user.generateAuthToken()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e.message)
    }
})

router.post('/login', async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        await user.save()

        res.status(200).send({message: "success", token})
        
    } catch(e){
        res.status(401).send('Authentication failed')
    }
})

module.exports = router