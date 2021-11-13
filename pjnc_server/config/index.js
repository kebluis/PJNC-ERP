const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

app.get('/', (req, res, next) => {
	res.json({
		name: 'Kevin',
		desc: 'pogi',
	});
});

app.listen(port, console.log(`Server is running at port ${port}`));
