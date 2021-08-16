const express = require('express')
const apiSMS = require('smsapi')
//import { SMSAPI, MessageResponse } from 'smsapi';

const router = express.Router()


router.get('/',  async (req, res) => {
    const smsToken = new apiSMS.SMSAPI(process.env.SMS_TOKEN)

    const response = async () => {
        try {
            return await smsToken.profile.get()
        } catch {
            console.log('error punkty')
        }
    }
    const a = await response()

    res.send(a)
})

router.post('/', (req, res) => {
    const {phoneNumber, message} = req.body
    const smsToken = new apiSMS.SMSAPI(process.env.SMS_TOKEN)

    const response = async (phoneNumber, message) => {
        try {
            return await smsToken.sms.sendSms(`+48${phoneNumber}`, `${message}`, 'A. Sawicka') //3 parametr to pole nadawcy chyba generalnie
        } catch {
            console.log('error')
        }
         
        // komentarzować jak testuje żeby nie zżerało kasy
    }
    response(phoneNumber, message)

    res.sendStatus(200)
})



module.exports = router