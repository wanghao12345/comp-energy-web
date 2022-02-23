import { combineReducers } from 'redux'
import { SET_USER } from './actions'

/**
 * 用户信息
 * @param {*} state 
 * @param {*} action 
 */
function user (state = {}, action) {
    switch (action.type) {
        case SET_USER: {
            return action.user
        }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user
})

export default rootReducer 