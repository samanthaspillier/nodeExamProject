const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('API test');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
