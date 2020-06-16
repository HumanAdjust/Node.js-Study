const express = require('express');
const app = express();
const cors = require('cors');
const api = require('./routes/index');
const usersRouter = require('./routes/user');

app.use(cors());
app.use('/users',usersRouter);
app.use('/api', api);

const port = 3002;
app.listen(port, ()=>console.log(`Listening on port ${port}`));