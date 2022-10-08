import {configureStore} from '@reduxjs/toolkit'
import { productReducer } from './reducers/product';

// configureStore takes different reducers
const store = configureStore({
    // and reducer combines those reducers
    reducer:{
        products: productReducer,
    }
})

export default store;