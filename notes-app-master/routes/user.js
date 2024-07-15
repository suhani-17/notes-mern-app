const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {

    try {

      const { username, email, password } = req.body;
      const user = new User({ username, email, password });

      await user.save();

      res.status(201).send({ message: 'User created successfully!' });
    } 
    
    catch (error) {
      res.status(400).send({ error: error.message });
    }


  });

  router.post('/login', async (req, res) => {

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).send({ error: 'Credentials are Invalid!' });
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1h' });

      res.send({ token });
    } 

    catch (error) {
      res.status(500).send({ error: error.message });
    }

  });

  module.exports = router;