const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 5000;

async function start() {
  try {
    console.log('try');

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App STARTED at ${PORT}!`));
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
}
start();
