const express = require('express');
const app = express();

app.use(express.json()); 
app.use(express.static('public'));

const winston = require('winston');
const logger = winston.createLogger({
 level: 'info',
 format: winston.format.json(),
 defaultMeta: { service: 'calculator-microservice' },
 transports: [
 new winston.transports.Console({
 format: winston.format.simple(),
 }),
 new winston.transports.File({ filename: 'logs/error.log', level:
'error' }),
 new winston.transports.File({ filename: 'logs/combined.log' }),
 ],
});

// Addition
app.post('/add', (req, res) => {
    const { a, b, operation } = req.body;
    const result = a + b;
    res.json({ result });
    console.log(result);
    logger.log({
        level: 'info',
        message: `New ${operation} operation requested: ${a} ${operation} ${b}`,
       });
});

// Subtraction
app.post('/subtract', (req, res) => {
    const { a, b, operation } = req.body;
    const result = a - b;
    res.json({ result });
    console.log(result);
    logger.log({
        level: 'info',
        message: `New ${operation} operation requested: ${a} ${operation} ${b}`,
       });
});

// Multiplication
app.post('/multiply', (req, res) => {
    const { a, b, operation } = req.body;
    if(b === 0) {
        logger.error("Cannot multiply by zero")
        return res.status(400).json({ error: "Cannot multiply by zero" });
    };
    const result = a * b;
    res.json({ result });
    console.log(result);
    logger.log({
        level: 'info',
        message: `New ${operation} operation requested: ${a} ${operation} ${b}`,
       });
});

// Division
app.post('/divide', (req, res) => {
    const { a, b, operation } = req.body;
    if(b === 0) {
        logger.error("Cannot divide by zero")
        return res.status(400).json({ error: "Cannot divide by zero" });
    };
    const result = a / b;
    res.json({ result });
    console.log(result);
    logger.log({
        level: 'info',
        message: `New ${operation} operation requested: ${a} ${operation} ${b}`,
       });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

