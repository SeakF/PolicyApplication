import { saveAs } from 'file-saver'

// flatten clients for policy list
export const flattenedClients = (clients) => {
        let flattenedTemp = []

        clients.map((client) => {
            client.policy.map((policy) => {
                    const newElement = {
                        _id: client._id,
                        name: client.name, 
                        surname: client.surname, 
                        clientCompany: client.clientCompany,
                        nip: client.nip,
                        pesel: client.pesel, 
                        address: client.address, 
                        phoneNumber: client.phoneNumber,
                        conjugateName: client.conjugateName,
                        email: client.email,
                        clientNote: client.clientNote,
                        ...policy
                    }
                    if (flattenedTemp == 0) {
                        flattenedTemp = [newElement]
                    } else {
                        flattenedTemp.push(newElement)
                    }    
            })
        })
        return flattenedTemp
    }


// sort
export const sortResults = (property) => {
        const stringToDate = (date) => {
            if (date == null || date == '') return null
            const values = date.split('-')
            return new Date(values[2], values[1], values[0]).getTime()
        }

        if (property == 'clientCompany') {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (!a['clientCompany'] || !a['surname']) return 1
                    if (!b['clientCompany'] || !b['surname']) return -1
                    let result = ((a['clientCompany'] || a['surname']) < (b['clientCompany'] || b['surname'])) ? -1 : ((a['clientCompany'] || a['surname']) > (b['clientCompany'] || b['surname'])) ? 1 : 0
                    
                    return result * sortOrder
                }
        } else if (property == 'nip') {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (!a['nip'] || !a['pesel']) return 1
                    if (!b['nip'] || !b['pesel']) return -1
                    let result = ((a['nip'] || a['pesel']) < (b['nip'] || b['pesel'])) ? -1 : ((a['nip'] || a['pesel']) > (b['nip'] || b['pesel'])) ? 1 : 0
                    
                    return result * sortOrder
                }
        } else if (property == 'policyDateSet') {
            if (property) {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {

                    let dateForA = stringToDate(a['policyDateSet'])
                    let dateForB = stringToDate(b['policyDateSet'])

                    //---------------------------------
                    let result = (dateForA < dateForB) ? -1 : (dateForA > dateForB) ? 1 : 0
                    
                    return result * sortOrder
                }
            }
        } else if (property == 'policyDateEnd') {
            if (property) {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {

                    let dateForA = convertDate(a['policyDateSet'], a['policyDateEnd'], a['installments'])
                    let dateForB = convertDate(b['policyDateSet'], b['policyDateEnd'], b['installments'])

                    let dateForSortA = stringToDate(a['policyDateEnd'])
                    let dateForSortB = stringToDate(b['policyDateEnd'])

                    // te z dzisiaj daje na początek
                    if (dateForA == 'dziś') return -1
                    if (dateForB == 'dziś') return 1

                    // te po terminie wyrzuca na koniec
                    if (dateForA == 'po terminie') return 1
                    if (dateForB == 'po terminie') return -1

                    //---------------------------------
                    let result = (dateForSortA < dateForSortB) ? -1 : (dateForSortA > dateForSortB) ? 1 : 0
                    
                    return result * sortOrder
                }
            }
        } else {
            if (property) {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (!a[property]) return 1
                    if (!b[property]) return -1
                    let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
                    
                    return result * sortOrder
                }
            }
        }
    }

export const sortResultsClients = (property) => {
        if (property == 'clientCompany') {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (!a['clientCompany'] || !a['surname']) return 1
                    if (!b['clientCompany'] || !b['surname']) return -1
                    let result = ((a['clientCompany'] || a['surname']) < (b['clientCompany'] || b['surname'])) ? -1 : ((a['clientCompany'] || a['surname']) > (b['clientCompany'] || b['surname'])) ? 1 : 0
                    
                    return result * sortOrder
                }
        } else if (property == 'nip') {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (!a['nip'] || !a['pesel']) return 1
                    if (!b['nip'] || !b['pesel']) return -1
                    let result = ((a['nip'] || a['pesel']) < (b['nip'] || b['pesel'])) ? -1 : ((a['nip'] || a['pesel']) > (b['nip'] || b['pesel'])) ? 1 : 0
                    
                    return result * sortOrder
                }
        } else {
            if (property) {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (!a[property]) return 1
                    if (!b[property]) return -1
                    let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
                    
                    return result * sortOrder
                }
            }
        }
    }


// generate pdf file 
export const generatePdf = async (policyData) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
            },
            body: JSON.stringify(policyData)
        }

        const readyPdf = await fetch(process.env.REACT_APP_PDFLINK, options)
            .then(async () => {
                const options2 = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
                    }
                }
                const resolve = await fetch(process.env.REACT_APP_PDFLINK, options2)
                    .then(res => res.blob())
                    .then(res => {return res}) //tu będzie powrotny pdf
                    .catch((err) => console.error(err))
                return resolve
            })
            .then(res => {return res}) //tu musi być return powrotnego pdf
            .catch((err) => console.error(err))

        const pdfBlob = new Blob([readyPdf], {type: 'application/pdf'})
        saveAs(pdfBlob, `${policyData.name}-${policyData.surname}-wypowiedzenie`)
    }






// date stuff


// change date to ok form
export const convertDate = (dateSet, dateEnd, installments) => {
        const stringToDate = (date) => {
            if (date == null || date == '') return null
            const values = date.split('-')
            return new Date(values[2], values[1], values[0])
        }
        switch (installments) {
            case 'Jednorazowo':
                installments = 1
                break;
            case 'Pół roku':
                installments = 2   
                break;
            case 'Kwartał':
                installments = 4
                break;

            default:
                break;
        }
        let date1 = stringToDate(dateSet)
        let date2 = stringToDate(dateEnd)
        let today = new Date()

            let timeLeft = date2.getTime() - today.getTime()
            let daysLeft = timeLeft / (1000 * 3600 * 24)

            if (installments == 1) {
                if ((date2.getDate() == today.getDate()) && (date2.getMonth() == today.getMonth()) && (date2.getFullYear() == today.getFullYear())) return 'dziś'
                else if ((date2 > today.getTime()) && (daysLeft <= 45)) return Math.ceil(daysLeft)
                    else return false
            } else {
                let policyPeriodPlain = date2.getTime() - date1.getTime()

                let onePeriod = policyPeriodPlain/installments
                let periodStack = onePeriod

                let installmentsCounter = 0
                while (((date1.getTime() + periodStack) < today.getTime()) && (installmentsCounter < installments-1)) {
                    periodStack += onePeriod
                    installmentsCounter++
                }

                let periodExactDay = new Date((date1.getTime() + periodStack))

                if ((periodExactDay.getDate() == today.getDate()) && (periodExactDay.getMonth() == today.getMonth()) && (periodExactDay.getFullYear() == today.getFullYear())) return 'dziś'
                else if ((periodExactDay.getTime() > today.getTime()) && (((periodExactDay.getTime() - today.getTime()) / (1000 * 3600 * 24)) <= 45)) return Math.ceil(((periodExactDay - today.getTime()) / (1000 * 3600 * 24)))
                    return false
            }
    }

export const computeDateToString = (pickedDate, plusOneYear) => { 
        if (pickedDate == null) return ''
        try {
            let preDate = new Date(pickedDate)
            let date = new Date(preDate.getFullYear(), preDate.getMonth(), preDate.getDate())

            let day = date.getDate()
            let month = date.getMonth()
            let year = date.getFullYear()

            if (plusOneYear === true) {
                day-=1
                year+=1
                if (day < 10) {
                    day = '0' + day
                }
                if (month < 10) {
                    month = '0' + month
                }
                return `${day}-${month}-${year}`
            } else {
                if (day < 10) {
                    day = '0' + day
                }
                if (month < 10) {
                    month = '0' + month
                }
                return `${day}-${month}-${year}`
            }
        } catch (err) {
            console.error(err)
        }
    }

export const computeStringToDate = (date) => {
        if (date == null || date == '') return null
        const values = date.split('-')
        return new Date(values[2], values[1], values[0])
    }

export const addMonth = (date) => {
        if (date == null || date == '') return null
        const values = date.split('-')
        values[1] = parseInt(values[1])
        values[1] = values[1]+1
        if (values[1] < 10) values[1] = '0' + values[1]
        return `${values[0]}-${values[1]}-${values[2]}`
    }