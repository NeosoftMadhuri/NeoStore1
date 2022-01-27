const initialState={cart:''}

const cartReducer=(state=initialState,actions)=>
{   console.log("cart")
    switch (actions.type) {
  
        case 'cart':
          return {...state,cart:actions.payload}
        default:
          return state; 
      }
    
}
export default cartReducer

