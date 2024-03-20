import {combineReducers} from 'redux'

import AuthRedu from './Auth'
import profileReducer from './Profile'
import modal from './modal'

export default combineReducers({
    AuthRedu,profileReducer,modal
})