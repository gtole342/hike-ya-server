const dotenv = require('dotenv');
const express = require('express');
const app = express();
const rowdyResults = require('rowdy-logger').begin(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }))

app.use('/trail', require('./controllers/trail'))
app.use('/animal', require('./controllers/animal'))

app.get('*', (req,res) => {
    res.status(404).send({
      message: 'Not Found'
    })
  })
  

app.listen(process.env.PORT || 3001, () => {
    rowdyResults.print()
})