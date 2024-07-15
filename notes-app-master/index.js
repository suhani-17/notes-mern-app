const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/notes');
const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api/notes', noteRoutes);

mongoose.connect(MONGO_URI, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log('Database connected successfully!')
);

  
  app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
  });