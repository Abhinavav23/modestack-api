const express = require('express')

const Article = require('../model/articles')
const router = new express.Router()

router.post('/articles', async (req, res) => {
    const article = new Article(req.body)
    try{
        await article.save()
        res.status(201).send({ 
            "message": "new article created"
            })
    } catch(e){
        res.status(400).send(e.message)
    }
})

router.get('/articles', async(req, res) => {
    try{
        await Article.updateMany({}, { $unset : { access_token : 1}})
        await Article.updateMany({}, { $unset : { __v : 1}})

        const articles = await Article.find({})
        if(!articles){
            res.status(404).send()
        }
        console.log(typeof(articles))
        delete articles.author
        res.status(201).send(articles)
    } catch(e){
        res.status(401).send(e.message)
    }
})

module.exports = router