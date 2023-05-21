const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Create an instance of the express-handlebars with the default layout
const hbs = exphbs.create({
    defaultLayout: path.join(__dirname, 'views', 'partials', 'main'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
});

app.use(express.static(path.join(__dirname, 'public')));


// Register the handlebars view engine
app.engine('handlebars', hbs.engine);

// Set the view engine to handlebars
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});


app.listen(port, () => {
    console.log('Now listening on', port);
});