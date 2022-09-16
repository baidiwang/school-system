const port = process.env.PORT || 3000;
const app = require('./app');
// const { conn } = require('../db');

app.listen(port, ()=> console.log(`listening on port ${port}`));
