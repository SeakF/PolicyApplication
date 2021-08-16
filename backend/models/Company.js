const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TypeDetailsSchema = new Schema({
    detail1: {
        type: String,
        required: false
    },
    detail2: {
        type: String,
        required: false
    },
    detail3: {
        type: String,
        required: false
    },
    detail4: {
        type: String,
        required: false
    },
    detail5: {
        type: String,
        required: false
    }
})

//create schema
const PolicySchema = new Schema({
    policyNumber: {
        type: String,
        required: true
    },
    policyCompany: {
        type: String,
        required: false
    },
    policyType: {
        type: String,
        required: false
    },
    typeDetails: TypeDetailsSchema,
    policyVariant: {
        type: String,
        required: false
    },
    policyConfirmDate: {
        type: String,
        required: false
    },
    policyDateSet: {
        type: String,
        required: false
    },
    policyDateEnd: {
        type: String,
        required: false
    },
    payment: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        required: false
    },
    installments: {
        type: String,
        required: false
    },
    policyNote: {
        type: String,
        required: false
    },
    written: {
        type: Boolean,
        required: false
    }
})



const clientCompanySchema = new Schema({
    clientCompany: {
        type: String,
        required: true
    },
    nip: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    surname: {
        type: String,
        required: false
    },
    pesel: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    conjugateName: {
        type: String,
        required: false
    },
    clientNote: {
        type: String,
        required: false
    },
    policy: [PolicySchema]
})



module.exports = Company = mongoose.model('CompanyModel', clientCompanySchema, "Clients")