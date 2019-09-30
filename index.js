const path = require('path');
const express = require('express');
const app = express();
const port = 1000;

app.use('/res', express.static('ui/res'));
app.use('/app', express.static('ui/app'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'ui/views'));

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(port, () => {
	console.log(`App started on port ${port}`);
});
