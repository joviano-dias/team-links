const express = require('express')
const path = require('path')
const reqYml = require('require-yml')
const fs = require('fs');

const app = express()
const port = 8080

app.set('view engine', 'pug')

app.get('/', function (req, res) {
    app.use(express.static(path.join(__dirname, 'html')))
    app.use(express.static(path.join(__dirname, 'config')))
    app.use(express.static(path.join(__dirname, 'html','themes')))

    try {
        const linksYaml = reqYml('./config/my-links.yaml')

        const themesFolder = (path.join(__dirname, 'html','themes'))
        let themes = []
        fs.readdirSync(themesFolder).forEach(file => {
            themes.push(path.parse(file).name)
        });

        res.render('index', { apps: linksYaml.applications, title: linksYaml.title, maintainer: linksYaml.maintainer, config_file: linksYaml.config_file, themes: themes })
    } catch (err) {
        res.render('error', { error: err })
    }


})


app.listen(process.env.PORT || 8080, () => {
    console.log(`Team links app started on ` + (process.env.PORT || 8080))
})
