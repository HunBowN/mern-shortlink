const {Router} = require('express')
const Link = require('../models/link')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try { 
        const baseURL = config.get('baseURL')
        const {from} = req.body

        const code = shortid.generate()
        const existing = await Link.findOne({from})
        if(existing) {
            return  res.json({link: existing })
        }

        const to = baseURL + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
          })

        //   console.log(link, 'наша ссылка (links.routes)');
      
          await link.save()
      
          res.status(201).json({ link })
        
        

    } catch (error) {
        res.status(500).json({message: error.message + 'Что-то пошло не так, попробуйте снова! (links.routes)'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId}) 
        res.json(links)
    } catch (error) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id) 
        res.json(link)
    } catch (error) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router
