const express = require('express')
const User = require('../../models/User')
const Company = require('../../models/Company')

const router = express.Router()





// get certain amount of items or all  
// route PUT api/items
router.put('/', (req, res) => {
    if(req.body.isAll===true) {
        User.find()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => console.log(err))
    } else {
        User.find()
            .skip(((req.body.numberOfClients-req.body.n)<=0)?0:req.body.numberOfClients-req.body.n)
            .limit(20+req.body.n) //.limit((allPolicies) ? 0 : 20)
            .then((result) => {
                res.send(result)
            })
            .catch((err) => console.log(err))
    }
})


// get single specific client
// route POST api/items/specific
router.post('/specific', (req, res) => {
    let property = req.body.type
    let value = req.body.value

    let query = {}
    if (property == '_id' || 
        property == 'name' || 
        property == 'surname' || 
        property == 'pesel' || 
        property == 'clientCompany' || 
        property == 'nip' || 
        property == 'phoneNumber' || 
        property == 'address' || 
        property == 'email') {

        query[`${property}`] = value

        User.find(query)
            .then((result) => {
                res.send(result)
            })
            .catch((err) => console.log(err))
    } else if (property == 'policy._id') {
        query[`${property}`] = value

        User.find(query)
            .then((result) => {
                res.send(result)
            })
            .catch((err) => console.log(err))
    } else {
        query[`policy.${property}`] = value

        User.find(query)
            .then((result) => {
                res.send(result)
            })
            .catch((err) => console.log(err))
    }

    
})

// create a client    
// route POST api/items
router.post('/', (req, res) => {
    if (req.body.clientCompany) {
        if (req.body.policy[0]) {
            const newCompany = new Company({
                clientCompany: req.body.clientCompany,
                nip: req.body.nip,
                name: req.body.name, 
                surname: req.body.surname,
                pesel: req.body.pesel,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                email: req.body.email,
                conjugateName: req.body.conjugateName,
                policy: [
                    {
                        policyNumber: req.body.policy[0].policyNumber,
                        policyCompany: req.body.policy[0].policyCompany,
                        policyType: req.body.policy[0].policyType,
                        policyDetails: req.body.policy[0].policyDetails,
                        typeDetails: {
                            detail1: req.body.policy[0].typeDetails[0],
                            detail2: req.body.policy[0].typeDetails[1],
                            detail3: req.body.policy[0].typeDetails[2],
                            detail4: req.body.policy[0].typeDetails[3],
                            detail5: req.body.policy[0].typeDetails[4]
                        },
                        policyVariant: req.body.policy[0].policyVariant,
                        policyConfirmDate: req.body.policy[0].policyConfirmDate,
                        policyDateSet: req.body.policy[0].policyDateSet,
                        policyDateEnd: req.body.policy[0].policyDateEnd,
                        payment: req.body.policy[0].payment,
                        amount: req.body.policy[0].amount,
                        installments: req.body.policy[0].installments,
                        written: req.body.written
                    }   
                ]
            })

            newCompany.save().then(company => res.json(company))
        } else {
            const newCompany = new Company({
                clientCompany: req.body.clientCompany,
                nip: req.body.nip,
                name: req.body.name, 
                surname: req.body.surname,
                pesel: req.body.pesel,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                email: req.body.email,
                conjugateName: req.body.conjugateName,
                policy: []
            })    
            newCompany.save().then(company => res.json(company))   
        }




    } else {
        if (req.body.policy[0]) {
            const newUser = new User({
                name: req.body.name, 
                surname: req.body.surname,
                pesel: req.body.pesel,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                email: req.body.email,
                conjugateName: req.body.conjugateName,
                policy: [
                    {
                        policyNumber: req.body.policy[0].policyNumber,
                        policyCompany: req.body.policy[0].policyCompany,
                        policyType: req.body.policy[0].policyType,
                        policyDetails: req.body.policy[0].policyDetails,
                        typeDetails: {
                            detail1: req.body.policy[0].typeDetails[0],
                            detail2: req.body.policy[0].typeDetails[1],
                            detail3: req.body.policy[0].typeDetails[2],
                            detail4: req.body.policy[0].typeDetails[3],
                            detail5: req.body.policy[0].typeDetails[4]
                        },
                        policyVariant: req.body.policy[0].policyVariant,
                        policyConfirmDate: req.body.policy[0].policyConfirmDate,
                        policyDateSet: req.body.policy[0].policyDateSet,
                        policyDateEnd: req.body.policy[0].policyDateEnd,
                        payment: req.body.policy[0].payment,
                        amount: req.body.policy[0].amount,
                        installments: req.body.policy[0].installments,
                        written: req.body.written
                    }   
                ]
            })

            newUser.save().then(user => res.json(user))
        } else {
            const newUser = new User({
                name: req.body.name, 
                surname: req.body.surname,
                pesel: req.body.pesel,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                email: req.body.email,
                conjugateName: req.body.conjugateName,
                policy: []
            })    
            newUser.save().then(user => res.json(user))    
        }
    }
    
})

// create a policy
// route POST api/items/policy/id
router.post('/policy/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$push: {policy: {
                    policyNumber: req.body.policyNumber,
                    policyCompany: req.body.policyCompany,
                    policyType: req.body.policyType,
                    policyDetails: req.body.policyDetails,
                    typeDetails: {
                        detail1: req.body.typeDetails[0],
                        detail2: req.body.typeDetails[1],
                        detail3: req.body.typeDetails[2],
                        detail4: req.body.typeDetails[3],
                        detail5: req.body.typeDetails[4]
                    },
                    policyVariant: req.body.policyVariant,
                    policyConfirmDate: req.body.policyConfirmDate,
                    policyDateSet: req.body.policyDateSet,
                    policyDateEnd: req.body.policyDateEnd,
                    payment: req.body.payment,
                    amount: req.body.amount,
                    installments: req.body.installments,
                    written: req.body.written        
    }}})
        .catch(err => res.status(404).send({error: 'user not found'}))
})




// delete an User
// route api/items/id
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove())
        .catch(err => res.status(404).send({error: 'user not found'}))
})

// delete a policy
// route api/items/policy/id
router.delete('/policy/:id', (req, res) => {
    User.findOne({'policy._id': `${req.params.id}`})
        .then(user => user.updateOne({$pull: {policy: {_id: req.params.id}}}))
        .catch(err => res.status(404).send({error: 'policy not found'}))
})




// edit an user
// route api/items/id
router.put('/:id', (req, res) => {
    if (req.body.clientCompany) {
        User.findById(req.params.id)
            .then(user => user.updateOne({
                clientCompany: req.body.clientCompany, 
                nip: req.body.nip, 
                name: req.body.name, 
                surname: req.body.surname, 
                pesel: req.body.pesel,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                email: req.body.email,
                conjugateName: req.body.conjugateName,
                clientNote: req.body.note
            }))
            .catch(err => res.status(404).send({error: 'user not found by id'}))
    } else {
        User.findById(req.params.id)
            .then(user => user.updateOne({
                name: req.body.name, 
                surname: req.body.surname, 
                pesel: req.body.pesel,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                email: req.body.email,
                conjugateName: req.body.conjugateName,
                clientNote: req.body.note
            }))
            .catch(err => res.status(404).send({error: 'user not found by id'}))    
    }
    
})

// edit a policy
// route api/items/policy/id
router.put('/policy/:id', (req, res) => {
    if (req.body.policyType && req.body.policyType == 'komunikacyjna') {
        User.findOneAndUpdate({'policy._id': req.params.id},
        {
            $set: {
                'policy.$.policyNumber': req.body.policyNumber,
                'policy.$.policyCompany': req.body.policyCompany,
                'policy.$.policyType': req.body.policyType,
                'policy.$.typeDetails.detail1': req.body.typeDetails[0],
                'policy.$.typeDetails.detail2': req.body.typeDetails[1],
                'policy.$.typeDetails.detail3': req.body.typeDetails[2],
                'policy.$.typeDetails.detail4': req.body.typeDetails[3],
                'policy.$.typeDetails.detail5': req.body.typeDetails[4],
                'policy.$.policyVariant': req.body.policyVariant,
                'policy.$.policyDateSet': req.body.policyDateSet,
                'policy.$.policyDateEnd': req.body.policyDateEnd,
                'policy.$.payment': req.body.payment,
                'policy.$.amount': req.body.amount,
                'policy.$.installments': req.body.installments,
                'policy.$.policyNote': req.body.note,
                'policy.$.written': req.body.written
            }
        }, (err) => {
            if (err) console.log(err)
        })
    } else if (req.body.policyType && req.body.policyType != 'komunikacyjna') {
        User.findOneAndUpdate({'policy._id': req.params.id},
        {
            $set: {
                'policy.$.policyNumber': req.body.policyNumber,
                'policy.$.policyCompany': req.body.policyCompany,
                'policy.$.policyType': req.body.policyType,
                'policy.$.typeDetails.detail1': req.body.typeDetails[0],
                'policy.$.policyVariant': req.body.policyVariant,
                'policy.$.policyDateSet': req.body.policyDateSet,
                'policy.$.policyDateEnd': req.body.policyDateEnd,
                'policy.$.payment': req.body.payment,
                'policy.$.amount': req.body.amount,
                'policy.$.installments': req.body.installments,
                'policy.$.policyNote': req.body.note,
                'policy.$.written': req.body.written
            }
        }, (err) => {
            if (err) console.log(err)
        })
    } else {
       User.findOneAndUpdate({'policy._id': req.params.id},
        {
            $set: {
                'policy.$.policyNumber': req.body.policyNumber,
                'policy.$.policyCompany': req.body.policyCompany,
                'policy.$.policyType': req.body.policyType,
                'policy.$.typeDetails.detail1': req.body.typeDetails[0],
                'policy.$.policyVariant': req.body.policyVariant,
                'policy.$.policyDateSet': req.body.policyDateSet,
                'policy.$.policyDateEnd': req.body.policyDateEnd,
                'policy.$.payment': req.body.payment,
                'policy.$.amount': req.body.amount,
                'policy.$.installments': req.body.installments,
                'policy.$.policyNote': req.body.note,
                'policy.$.written': req.body.written
            }
        }, (err) => {
            if (err) console.log(err)
        }) 
    }


})
//policyCompany, policyType, typeDetails, 
//policyVariant, policyConfirmDate, policyDateSet, 
//policyDateEnd, payment, amount, installments

module.exports = router