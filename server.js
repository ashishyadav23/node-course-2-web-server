const express = require('express');
var port = process.env.PORT || 3000;
const hbs = require('hbs');
const fs = require('fs');
var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(`Unable to append to server log`);
        }
    })

    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })
app.get('/', (request, response) => {
    // response.send({
    //     'name': 'Ashish yadav',
    //     age: 25,
    //     likes: ['Movies', 'ignoring', 'faltugiri karna']
    // });

    response.render('home.hbs', {
        title: 'Home',
        data: JSON.stringify({
            'name': 'Ashish yadav',
            age: 25,
            likes: ['Movies', 'ignoring', 'faltugiri karna']
        })
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        title: 'Project',
        list: JSON.stringify([
            "project1", "project2", "project3"
        ])
    })
})
app.get('/about', (reg, res) => {
    res.render('about.hbs', {
        title: 'About'
    });
    // res.send('About Page');
})
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
})
app.listen(port, () => {
    console.log(`server is up ${port}`);
});