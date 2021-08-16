import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import listClients from '../features/clients/clients'

export default configureStore({
  reducer: {
    listClients: listClients
  },
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})