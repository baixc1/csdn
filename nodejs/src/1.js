const express = require('express')
const app = express()
const fs = require('fs')

app.get('*', (req, res) => {
    fs.readFile('./index.html', (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send('read index error')
        }
        res.set('Content-Type', 'text/html');
        res.send(data)
    })
})
app.listen(3000, () => console.log('server run'))