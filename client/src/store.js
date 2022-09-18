import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({

});

let intialState = {};

const middleware = [thunk];

const store = createStore(reducer, intialState)