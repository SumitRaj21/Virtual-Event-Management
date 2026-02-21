const express = require('express');
const cors = require('cors');
const routes = require('./routes/index.route');
const errorHandler = require('./middlewares/error.middleware');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', routes);

/* ---------- 404 Handler ---------- */
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Route not found"
    });
});

app.use(errorHandler);
module.exports = app;