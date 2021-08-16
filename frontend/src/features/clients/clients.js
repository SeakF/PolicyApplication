import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//======sprawdzaniePolis=======
const isPolicyExist = (allClientsAndPolicies, policyForCheck) => {// sprawdzenie czy istnieje taka polisa już, jeśli tak to zwraca true, wpisuje sie numerPolisy
  let checkValue = false
    if (allClientsAndPolicies != 0) {
      allClientsAndPolicies.forEach((client) => {
        if (client.policy && client.policy.find((policy) => policy.policyNumber == policyForCheck)) {
          checkValue = true
        }
      })
    }
  return checkValue
}

//==========Ładowanie==========
export const getClients = createAsyncThunk(
  'editClientList/getClients',
  async ({numberOfClients, n, isAll}) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
      },
      body: JSON.stringify({numberOfClients: numberOfClients, n: n, isAll: isAll})
    }
    const response = await fetch(process.env.REACT_APP_ITEMSLINK, options)
    const dataBack = await response.json()
    
    return dataBack
  }
)
//====Ładowanie pojedyncze====
export const getSpecificClient = createAsyncThunk(
  'editClientList/getClients',
  async ({type, value}) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
      },
      body: JSON.stringify({type: type, value: value})
    }
    const response = await fetch(process.env.REACT_APP_ITEMSSPECIFIVLINK, options)
    const dataBack = await response.json()

    return dataBack
  }
)


//=========dodawanie klientów /i polis==========
const uploadClient = async (data) => {
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
    },
    body: JSON.stringify(data)
  }
  const response = await fetch(process.env.REACT_APP_ITEMSLINK, options)
  const infoBack = await response.json()
}

//=========dodawanie polis==========
const uploadPolicy = async (id, newPolicy) => {
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
    },
    body: JSON.stringify(newPolicy)
  }
  const response = await fetch(process.env.REACT_APP_ITEMSLINK + `/policy/${id}`, options)
}


//=========usuwanie klientów==========
const deleteClient = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
    }
  }
  const response = await fetch(process.env.REACT_APP_ITEMSLINK + `/${id}`, options)
}

//=========usuwanie polis==========
const deletePolicy = async (policyNumber, policyId) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
    }
  }
  const response = await fetch(process.env.REACT_APP_ITEMSLINK + `/policy/${policyId}`, options)
}


//=========edytowanie klientów==========
const editClient = async (editedClient) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
    },
    body: JSON.stringify(editedClient)
  }
  const response = await fetch(process.env.REACT_APP_ITEMSLINK + `/${editedClient.id}`, options)
}

//=========edytowanie polis==========
const editPolicy = async (editedPolicy, id) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
    },
    body: JSON.stringify(editedPolicy)
  }
  const response = await fetch(process.env.REACT_APP_ITEMSLINK + `/policy/${id}`, options)
}


// dodać state odpowiadający za błąd
//===========redux============
export const listClients = createSlice({
  name: 'editClientList',
  initialState: {
    clients: [],
    special: 0,
    loading: true,
    status: null
  },
  reducers: {
    ADD_POLICY_AND_CLIENT: (state, action) => { //done
      if (!isPolicyExist(state.clients, action.payload.policy[0].policyNumber)) {
        state.clients = [...state.clients, action.payload]
        uploadClient(action.payload)
        state.status = 'success'
      } else {
        console.log('taka polisa istnieje już')
        state.status = 'failed'
      }
    },


    ADD_POLICY: (state, action) => { //done // tu może być jakiś problem bo usunąłem dopiero dodawanie customowego id to zobaczymy
      const clientId = action.payload.predefinedId || action.payload.existingClientId
      const newPolicy = action.payload.onlyNewPolicy

      if (newPolicy && !isPolicyExist(state.clients, newPolicy.policyNumber)) {
        const editedClient = state.clients.find((client) => client._id === clientId)
        if (!editedClient.policy) {
          editedClient.policy = [newPolicy]
        } else {
          editedClient.policy.push(newPolicy)
        }
        const editedList = state.clients.filter((client) => client._id !== clientId)
        state.clients = [...editedList, editedClient]

        uploadPolicy(clientId, newPolicy)
        state.status = 'success'
      } else {
        console.log('istnieje już taka polisa')
        state.status = 'failed'
      }
    },


    ADD_CLIENT: (state, action) => { //done
      state.clients = [...state.clients, action.payload]
      uploadClient(action.payload)
    },


    DELETE_POLICY: (state, action) => { //done
      const policyForDelete = action.payload.policyNumber
      const clientWithPolicyForDelete = action.payload.id
      const policyId = action.payload.policyId

      if (isPolicyExist(state.clients, policyForDelete)) {               
        const updatedPolicyList = state.clients.find((client) => client._id === clientWithPolicyForDelete).policy.filter((policy) => policy.policyNumber !== policyForDelete)
        const updatedClient = state.clients.find((client) => client._id === clientWithPolicyForDelete)
        updatedClient.policy = updatedPolicyList         
        const updatedClientList = state.clients.filter((client) => client._id !== clientWithPolicyForDelete)

        state.clients = [...updatedClientList, updatedClient]
        deletePolicy(policyForDelete, policyId)
      } else {
        console.error('jakiś błąd, "nie ma takiego klienta"')
      }
    },


    DELETE_CLIENT: (state, action) => { //done
      const clientForDelete = action.payload
      if (state.clients.find((client) => client._id === clientForDelete)) {
        const filtered = state.clients.filter((client) => client._id !== clientForDelete) 
        state.clients = [...filtered]
        deleteClient(clientForDelete)
      } else {
        console.error('jakiś błąd, "nie ma takiego klienta"')
      }
    },

    EDIT_POLICY: (state, action) => { //done ;-;
        const editedPolicy = action.payload.editedPolicy
        const oldPolicyNumber = action.payload.policyNumber
        const clientWithPolicyToEdit = action.payload.id
        const policyId = action.payload.policyId
        const {policyNumber, policyCompany, policyType, typeDetails, policyVariant, policyConfirmDate, policyDateSet, policyDateEnd, payment, amount, installments} = editedPolicy
        if (state.clients.find((client) => client._id === clientWithPolicyToEdit) && (oldPolicyNumber === editedPolicy.policyNumber || !isPolicyExist(state.clients, editedPolicy.policyNumber))) {
          let foundClient = state.clients.find((client) => client._id === clientWithPolicyToEdit)
          let foundPolicy = foundClient.policy.find((policy) => policy._id === policyId)
          foundPolicy = {...foundPolicy, policyNumber, policyCompany, policyType, typeDetails: [typeDetails[0], typeDetails[1], typeDetails[2], typeDetails[3], typeDetails[4]], policyVariant, policyConfirmDate, policyDateSet, policyDateEnd, payment, amount, installments, policyNote: editedPolicy.note, written: editedPolicy.written}
          
          let filteredClient = foundClient.policy.filter((policy) => policy._id !== policyId)
          foundClient.policy = [...filteredClient, foundPolicy]
          
          const filteredList = state.clients.filter((client) => client._id !== clientWithPolicyToEdit)
          
          state.clients = [...filteredList, foundClient]
          
          editPolicy(editedPolicy, policyId)
          state.status = 'success'
        } else if (isPolicyExist(state.clients, editedPolicy.policyNumber)){
          console.error('taki numer polisy już istnieje')
          state.status = 'failed'
        } else {
          console.error('jakiś błąd, "nie ma takiego klienta"')
          state.status = 'failed'
        }
    }, 

    EDIT_CLIENT: (state, action) => { //done
      const editedClient = action.payload
      const {id, clientCompany, nip, name, surname, pesel, phoneNumber, address, email, conjugateName} = editedClient
      if (state.clients.find((client) => client._id === id)) {
        let found = state.clients.find((client) => client._id === id)
        if (found.clientCompany) {
          found = {...found, clientCompany, nip, name, surname, pesel, phoneNumber, address, email, clientNote: editedClient.note}
          const filtered = state.clients.filter((client) => client._id !== id)
          state.clients = [...filtered, found]
          editClient(editedClient)

        } else {
          found = {...found, name, surname, pesel, phoneNumber, address, email, conjugateName, clientNote: editedClient.note}
          const filtered = state.clients.filter((client) => client._id !== id)
          state.clients = [...filtered, found]
          editClient(editedClient)
        }
        
      } else {
        console.error('jakiś błąd, "nie ma takiego klienta"')
      }
    },

    CHANGE_STATUS: (state) => { //done
      state.status = null
    }
  },
  extraReducers: {
    [getClients.pending]: (state, action) => {
      state.loading = true
    },
    [getClients.fulfilled]: (state, action) => {
      let tempArray = state.clients.filter((client) => {
        return action.payload.every((action) => {
          return action._id !== client._id
        })
      })

      state.clients = [...tempArray, ...action.payload]
      state.loading = false
    },
    [getClients.reject]: (state, action) => {
      state.loading = 'error'
    },


    [getSpecificClient.pending]: (state, action) => {
      state.loading = true
    },
    [getSpecificClient.fulfilled]: (state, action) => {
      let tempArray = state.clients.filter((client) => {
        return action.payload.every((action) => {
          return action._id !== client._id
        })
      })
      let check = action.payload.filter((client) => {
        return state.clients.every((action) => {
          return action._id === client._id
        })
      })
      state.special += check.length
      state.clients = [...tempArray, ...action.payload]
      state.loading = false
    },
    [getSpecificClient.reject]: (state, action) => {
      state.loading = 'error'
    }
  }
})


export const { ADD_POLICY_AND_CLIENT, ADD_POLICY, ADD_CLIENT, DELETE_POLICY, DELETE_CLIENT, EDIT_POLICY, EDIT_CLIENT, CHANGE_STATUS } = listClients.actions
// to do używania w plikach jako dekonstruktor

export const selectClient = state => state.listClients.clients
export const numberOfSpecific = state => state.listClients.special
export const statusState = state => state.listClients.status

export default listClients.reducer
// to do używania w plikach jako object.type