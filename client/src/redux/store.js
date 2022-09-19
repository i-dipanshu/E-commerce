import {configureStore} from '@reduxjs/toolkit'
import { productReducer } from './reducers/product';

// configureStore takes different reducers
const store = configureStore({
    // and reducers combines those reducers
    reducer:{
        product: productReducer,
    }
})

export default store;