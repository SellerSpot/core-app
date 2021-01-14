const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const port = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, "0.0.0.0", () => {
    console.info('server started on port', port);
});