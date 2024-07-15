const express = require('express');
const Note = require('../models/Note');
const auth = require('../auth/auth');

const router = express.Router();

router.post('/create', auth, async (req, res) => {
    try {
      const { title, content } = req.body;

      const note = new Note({
        title,
        content,
        owner: req.user._id,
      });

      await note.save();
      res.status(201).send(note);
    } 
    
    catch (error) {
      res.status(400).send({ error: error.message });
    }

  });

  router.get('/:id', auth, async (req, res) => {

    try {
      const note = await Note.findById(req.params.id);

      if (!note || (!note.owner.equals(req.user._id) && !note.sharedWith.includes(req.user._id))) {
        return res.status(404).send({ error: 'Note not found' });
      }

      res.send(note);
    } 
    
    catch (error) {
      res.status(500).send({ error: error.message });
    }

  });

  router.put('/:id', auth, async (req, res) => {

    try {
      const { content } = req.body;
      const note = await Note.findById(req.params.id);

      if (!note || (!note.owner.equals(req.user._id) && !note.sharedWith.includes(req.user._id))) {
        return res.status(404).send({ error: 'Note not found or permission denied!' });
      }

      note.content += `\n${content}`;

      note.versionHistory.push({
        user: req.user._id,
        changes: content,
      });

      await note.save();
      res.send(note);
    } 
    catch (error) {
      res.status(500).send({ error: error.message });
    }

  });

  router.get('/version-history/:id', auth, async (req, res) => {

    try {
      const note = await Note.findById(req.params.id).populate('versionHistory.user', 'username');

      if (!note || (!note.owner.equals(req.user._id) && !note.sharedWith.includes(req.user._id))) {
        return res.status(404).send({ error: 'Note not found or Permission denied!' });
      }

      res.send(note.versionHistory);
    } 
    
    catch (error) {
      res.status(500).send({ error: error.message });
    }

  });

  module.exports = router;