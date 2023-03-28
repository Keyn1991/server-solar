const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sendEmailRouter = require('./src/sendEmail');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', sendEmailRouter);


app.get('/', (req, res) => {
    res.send('<h1>Server started on port 5100</h1>');
});

const PORT = process.env.PORT ||   5100;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
