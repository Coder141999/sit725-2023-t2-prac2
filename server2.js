const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json()); // This line is new!

app.get('/add', (req, res) => {
    const num1 = parseInt(req.query.num1);
    const num2 = parseInt(req.query.num2);
    const sum = num1 + num2;
    res.send(`The sum of ${num1} and ${num2} is ${sum}.`);
});

app.post('/calculate', (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);
    const operation = req.body.operation;

    let result;
    switch(operation) {
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if(num2 !== 0){
                result = num1 / num2;
            } else {
                return res.status(400).send('Division by zero is not allowed.');
            }
            break;
        default:
            return res.status(400).send('The operation is not supported.');
    }

    res.send(`The result of ${operation} ${num1} and ${num2} is ${result}.`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
