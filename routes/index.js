const express = require('express');
const router = express.Router();
const Url = require('../models/urlModule');
   
router.get('/', async (req, res, next) => {
    try {
      const urls = await Url.find();  
      res.render('index', { urls });  
    } catch (err) { 
      res.status(500).send('Server Error');  
    }
  });
  

 
router.post('/', async (req, res) => {
  try {
    const { longUrl, alias } = req.body;
    await Url.create({ longUrl, alias });
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

 
router.get('/:alias', async (req, res) => {
  try {
    const { alias } = req.params;
    const url = await Url.findOne({ alias });
    if (url) {
      res.redirect(url.longUrl);
    } else {
      res.status(404).render('error', { message: 'URL not found' });
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
