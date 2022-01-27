import cartReducer from './CartReducer'
import loginReducer from './LoginReducer'
import searchReducer from './SearchReducer'
import { combineReducers } from 'redux'

const allReducers=combineReducers({
    cart:cartReducer,
    Login:loginReducer,
    searchitem:searchReducer,
    
})
export default allReducers