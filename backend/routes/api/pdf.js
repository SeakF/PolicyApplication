const express = require('express')
const pdfTemplate = require('../../documents')
const pdf = require('html-pdf')
const path = require('path')
const fs = require('fs-extra');

const router = express.Router()
const dirPath = path.join(__dirname, '../../temp')

{

let name, surname, policyNumber
//route api/pdf
//post send data for pdf to server from client
router.post('/', (req, res) => {
    fs.emptyDir('./temp', (err) => {
        if (err) return console.log(err)
            pdf.create(pdfTemplate(req.body), {format: "A4"}).toFile(`./temp/${req.body.name}-${req.body.surname}-${req.body.policyNumber}-wypowiedzenie.pdf`, (err, file) => {
            if (err) {
                return res.sendStatus(500)
            }
            name = req.body.name
            surname = req.body.surname
            policyNumber = req.body.policyNumber
            return res.sendStatus(200)
        })
    })
})

//get send download ready pdf from server to client
router.get('/', (req, res) => {
    res.sendFile(`${dirPath}/${name}-${surname}-${policyNumber}-wypowiedzenie.pdf`)
})

}

module.exports = router