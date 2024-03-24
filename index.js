const express = require('express');
const methodOverride = require('method-override');
//const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, })); // This is important!
app.use(methodOverride('_method')); // So is this!
//app.use(bodyParser.urlencoded({ extended: true, })); // This is important!


app.get('/', async (req, res) => {
  try {
      res.render('home');
  } catch (error) {
      console.error(error);
      res.render('503');
  }
});

const addressRouter = require('./routes/address')
app.use('/addresses', addressRouter);

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`)
});

