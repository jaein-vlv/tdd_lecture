const express = require('express');

const PORT = 9898;
const app = express();
app.use(express.json());
const productRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://jaein:sniper1234@cluster0.fufqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log('mongodb connect..'))
.catch(err => console.log(err));

app.use('/api/product/', productRoutes);
app.get('/', (req, res) => {
  res.send('hello')
});

app.use((error, req, res, next) => {
  res.status(500).json({message: error.message})
});

app.listen(PORT);
console.log('Running..');

module.exports = app;